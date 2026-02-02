import { Scene, GameObjects, Tilemaps, Time } from "phaser";
import { store } from "../../..";
import { CardType, Direction, IconIndex, Layers, LayerStack, Maps, Modal, Permanents, SceneNames } from "../../../enum";
import { defaultCursor, FONT_DEFAULT } from "../../assets/Assets";
import { onInspectCreature, onSelectCreature, onSetScene, onShowModal, onUpdateActivePlayer, onUpdateBoard, onUpdateBoardCreature, onUpdatePlayer, onUpdateSave } from "../../common/Thunks";
import CreatureSprite from "../sprites/CreatureSprite";
import { emptyMana, isPassableTile, payCost, transitionIn, transitionOut } from "../../common/Utils";
import { CardData } from "../../common/Cards";

const TILE_DIM=16

export default class MapScene extends Scene {

    selectIcon: GameObjects.Image
    selectedTile: Tilemaps.Tile
    map: Tilemaps.Tilemap
    errorTimer: Time.TimerEvent
    origDragPoint: Phaser.Math.Vector2
    g:GameObjects.Graphics
    sounds: {[key:string]:Phaser.Sound.BaseSound}
    creatures: CreatureSprite[]
    creaturePreview:GameObjects.Image
    myDir:Direction

    constructor(config){
        super(config)
        this.creatures = []
        this.sounds = {}
        onSetScene(this)
    }

    create = () =>
    {
        this.g = this.add.graphics().setDefaultStyles({ lineStyle: { width:1, color:0xfff }}).setDepth(7)
        this.add.tileSprite(0,0,this.cameras.main.displayWidth,this.cameras.main.displayHeight*2, 'bg').setOrigin(0,0).setScale(1)
        this.createSelectIcon()
        this.input.mouse.disableContextMenu()
        this.setCursor(defaultCursor);
        this.enableInputEvents()
        this.initMap()
    }

    quit = () => transitionOut(this, SceneNames.Intro, ()=>transitionIn(this.scene.get(SceneNames.Intro)as any))

    initMap = () => {
        
        const mySave= store.getState().currentMatch
        this.myDir = mySave.players.find(p=>p.id === store.getState().saveFile.myId).dir
        this.map?.destroy()
        this.map = this.add.tilemap(Maps.Tutorial)
        let grass = this.map.addTilesetImage('terrain', 'tiles', TILE_DIM,TILE_DIM,1,2)
        LayerStack.forEach(l=>this.map.createLayer(l, grass))

        this.creatures.forEach(e=>e.destroy())
        this.creatures = []
        mySave.board.forEach(c=>{
            const player = mySave.players.find(p=>p.id === c.ownerId)
            this.creatures.push(new CreatureSprite(this, this.map.tileToWorldX(c.tileX), this.map.tileToWorldY(c.tileY), CardData[c.kind].sprite, c.id, player.dir))
        })
        
        this.cameras.main.setZoom(2)
        this.cameras.main.setScroll(0,0)
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    }

    endTurn = async () => {
        const match = store.getState().currentMatch
        const currentI = match.players.findIndex(p=>p.id === match.activePlayerId)
        const current = match.players[currentI]
        
        //1. move creatures / resolve combats
        const mine = this.creatures.filter(c=>match.board.find(cr=>cr.id===c.id && cr.ownerId === current.id))
        for(let i=0;i<mine.length;i++){
            await mine[i].tryMoveNext()
        }
        //2. set next player
        const nextI = (currentI+1)%match.players.length
        const nextPlayer = match.players[nextI]
        onUpdateActivePlayer(nextPlayer.id)

        //3.reset player resources
        nextPlayer.manaPool = {...emptyMana}
        match.board.forEach(c=>{
            if(c.ownerId === nextPlayer.id){
                c.tapped = false
                c.newSummon = false
                //TODO: add/remove timed effects
            }
        })
    }

    createSelectIcon = () => {
        this.selectIcon = this.add.image(0, 0, 'selected').setDepth(3).setVisible(false)
    }

    startPreview = (b:CardType) => {
        this.creaturePreview = this.add.image(0, 0, 'creatures', CardData[b].sprite).setAlpha(0.5).setDepth(4)
    }

    enableInputEvents = () => {
        this.input.on('pointermove', (event, gameObjects:Array<Phaser.GameObjects.GameObject>) => {
            let tile = this.map?.getTileAtWorldXY(this.input.activePointer.worldX, this.input.activePointer.worldY, false, undefined, Layers.Earth)
            if(tile && gameObjects.length > 0){
                const bld = gameObjects[0] as CreatureSprite
                const ctr = bld.getCenter()
                this.selectIcon.setPosition(ctr.x, ctr.y)
                this.selectIcon.setVisible(true)
                onInspectCreature(bld.id)
            }
            else if(tile) {
                if(!this.selectedTile) this.selectedTile = tile
                else if(this.selectedTile.x !== tile.x || this.selectedTile.y !== tile.y){
                    this.selectedTile = tile
                    onInspectCreature(null)
                    this.selectIcon.setVisible(false)
                }
            }
            if (this.game.input.activePointer.isDown) {
                if (this.origDragPoint) {
                    // move the camera by the amount the mouse has moved since last update
                    this.cameras.main.scrollX +=
                        (this.origDragPoint.x - this.game.input.activePointer.position.x);
                    this.cameras.main.scrollY +=
                        (this.origDragPoint.y - this.game.input.activePointer.position.y);
                } // set new drag origin to current position
                this.origDragPoint = this.game.input.activePointer.position.clone();
            } 
            else {
                this.origDragPoint = null;
            }
            if(this.creaturePreview && this.validStartTile(tile, this.myDir)){
                this.creaturePreview.x = tile.getCenterX()
                this.creaturePreview.y = tile.getCenterY()
                return
            }
        })

        this.input.on('pointerdown', (event, GameObjects:Array<Phaser.GameObjects.GameObject>) => {
            if (event.rightButtonDown()){
                this.creaturePreview.destroy()
                return onSelectCreature('',null)
            }
            const state = store.getState()
            let tile = this.map?.getTileAtWorldXY(this.input.activePointer.worldX, this.input.activePointer.worldY, false, undefined, Layers.Earth)
            if(tile){
                if(GameObjects.length > 0){
                    const me = state.currentMatch.players.find(p=>p.id === state.saveFile.myId)
                    const sprite = GameObjects[0] as CreatureSprite
                    //determine card action
                    if(state.selectedCardId){
                        const card = me.hand.find(c=>c.id === state.selectedCardId)
                        if(CardData[card.kind].kind === Permanents.Enchantment){
                            return this.applyEnchantment(sprite, card)
                        }
                        if(CardData[card.kind].kind === Permanents.Sorcery){
                            return this.applySorcery(sprite, card)
                        }
                    }
                    else {
                        const card = state.currentMatch.board.find(c=>c.id === sprite.id)
                        const meta = CardData[card.kind]
                        if(meta.kind === Permanents.Land && !card.tapped){
                            //tap and add to pool
                            onUpdatePlayer({...me, manaPool: {...me.manaPool, 
                                [meta.color]: me.manaPool[meta.color]-meta.ability.cost[0].amount
                            }})
                            onUpdateBoardCreature({...card, tapped: true})
                            this.floatResource(sprite.x, sprite.y, IconIndex.Mana, '#ff0000')
                            //TODO add exausted icon to card
                        }
                    }
                }
                else if(GameObjects.length === 0 && state.selectedCardId && this.validStartTile(tile, this.myDir))
                    this.addCreature(state.selectedCardId, tile.pixelX, tile.pixelY)
            }
        })
    }

    validStartTile = (t:Tilemaps.Tile, dir:Direction) => {
        if(dir === Direction.SOUTH){
            return t.y === this.map.height-2
        }
        else return t.y == 2
    }

    validEndTile = (t:Tilemaps.Tile, dir:Direction) => {
        if(dir === Direction.NORTH){
            return t.y === this.map.height-2
        }
        else return t.y == 2
    }

    applySorcery = (s:CreatureSprite, card:Card) => {
        //TODO
    }

    applyEnchantment = (s:CreatureSprite, card:Card) => {
        //TODO
    }

    addCreature = (cardId:string, worldX:number,worldY:number) => {
        this.creaturePreview.destroy()
        onSelectCreature('',null)
        const state = store.getState()
        const me = state.currentMatch.players.find(p=>p.id === state.saveFile.myId)
        const card = me.hand.find(c=>c.id === cardId)
        const data = CardData[card.kind]
        this.creatures.push(new CreatureSprite(this, worldX,worldY, data.sprite, card.id, me.dir))
        const t = this.map.getTileAtWorldXY(worldX,worldY,false, undefined, Layers.Earth)
        onUpdateBoard(state.currentMatch.board.concat({...card, tileX:t.x, tileY:t.y}))
        onUpdatePlayer({...me, hand: me.hand.filter(c=>c.id !== cardId), manaPool: payCost(me.manaPool, data.cost)})
    }

    setCursor = (assetUrl:string) => {
        this.input.setDefaultCursor('url('+assetUrl+'), pointer');
    }

    floatResource = (x:number, y:number, index:number, color:string, text?:string) => {
        let icon = this.add.image(x, y, 'items', index).setDepth(4)
        let targets = [icon]
        if(text) {
            let txt = this.add.text(x+7, y-8, text, {...FONT_DEFAULT, color}).setDepth(4).setStroke('0x000', 2)
            targets.push(txt as any)
        }
        this.tweens.add({
            targets,
            y: y-20,
            ease: 'Stepped',
            easeParams: [3],
            duration: 2000,
            onComplete: ()=>{
                targets.forEach(t=>t.destroy())
            }
        })
    }

    showErrorText = (message:string, cursor?:string) => {
        const t = this.add.text(this.input.activePointer.worldX+20, this.input.activePointer.worldY, message, FONT_DEFAULT).setStroke('0x000', 2).setDepth(3)
        //if(cursor) this.input.setDefaultCursor(invalidCursor)
        //this.sounds[SoundEffect.Error].play()
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                t.destroy()
                if(cursor) this.input.setDefaultCursor(cursor)
            }
        })
    }

    showTextAt = (x:number, y:number, text:string) => {
        const t = this.add.text(x, y, text, FONT_DEFAULT).setStroke('0x000', 2).setDepth(3)
        let blink = false
        this.time.addEvent({
            delay:500,
            repeat: 4,
            callback: ()=>{
                if(blink) t.alpha = 0
                else t.alpha = 1
                blink = !blink
            }
        })
        this.time.addEvent({
            delay:2000,
            callback: ()=>t.destroy()
        })
    }

    onTransitionIn = () => {
        this.time.addEvent({
            delay:1000,
            callback: this.initMap
        })
    }
}