import { Scene, GameObjects, Tilemaps, Time, Geom } from "phaser";
import { store } from "../../..";
import { CardType, Direction, IconIndex, Layers, LayerStack, Maps, Modal, Permanents, SceneNames } from "../../../enum";
import { defaultCursor, FONT_DEFAULT } from "../../assets/Assets";
import { onInspectCreature, onSelectCreature, onSetScene, onShowModal, onUpdateActivePlayer, onUpdateBoard, onUpdateBoardCreature, onUpdatePlayer, onUpdateSave } from "../../common/Thunks";
import CreatureSprite from "../sprites/CreatureSprite";
import { canAfford, drawRectSegment, emptyMana, isPassableTile, payCost, transitionIn, transitionOut } from "../../common/Utils";
import { getCardData } from "../../common/CardUtils";

const TILE_DIM=32
const FIELD_WIDTH=6
const FIELD_HEIGHT=3

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
    northLands:Tilemaps.Tile[]
    northCreatures:Tilemaps.Tile[]
    southLands:Tilemaps.Tile[]
    southCreatures:Tilemaps.Tile[]
    
    constructor(config){
        super(config)
        this.creatures = []
        this.sounds = {}
        onSetScene(this)
    }

    create = () =>
    {
        this.g = this.add.graphics().setDefaultStyles({ lineStyle: { width:1, color:0xffffff, alpha:1 }}).setDepth(7)
        this.add.tileSprite(0,0,this.cameras.main.displayWidth,this.cameras.main.displayHeight*2, 'bg').setOrigin(0,0).setScale(1)
        this.createSelectIcon()
        this.input.mouse.disableContextMenu()
        this.setCursor(defaultCursor);
        this.enableInputEvents()
        this.initMap()
    }

    quit = () => transitionOut(this, SceneNames.Intro, ()=>transitionIn(this.scene.get(SceneNames.Intro)as any))

    initMap = () => {
        
        const mySave= store.getState().saveFile.currentMatch
        this.myDir = mySave.players.find(p=>p.id === store.getState().saveFile.myId).dir
        this.map?.destroy()
        this.map = this.add.tilemap(Maps.Tutorial)
        let grass = this.map.addTilesetImage('tiles', 'tiles', TILE_DIM,TILE_DIM)
        LayerStack.forEach(l=>this.map.createLayer(l, grass))

        const midTile = this.map.getTileAt(Math.round(this.map.width/2), Math.round(this.map.height/2), false, Layers.Earth)
        this.northLands = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y-FIELD_HEIGHT-1, FIELD_WIDTH*2, 1)
        this.northCreatures = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y-(FIELD_HEIGHT), FIELD_WIDTH*2, 1)
        this.southLands = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y+FIELD_HEIGHT, FIELD_WIDTH*2, 1)
        this.southCreatures = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y+(FIELD_HEIGHT-1), FIELD_WIDTH*2, 1)
        
        const g = this.add.graphics().setDefaultStyles({ lineStyle: { width:2, color:0xffffff, alpha:0.5 }}).setDepth(7)
        const rect = new Geom.Rectangle(midTile.pixelX-(FIELD_WIDTH*TILE_DIM), midTile.pixelY-(FIELD_HEIGHT*TILE_DIM), FIELD_WIDTH*2*TILE_DIM, FIELD_HEIGHT*2*TILE_DIM)
        this.drawMarchingDashedRect(g, rect)


        this.creatures.forEach(e=>e.destroy())
        this.creatures = []
        mySave.board.forEach(c=>{
            const player = mySave.players.find(p=>p.id === c.ownerId)
            this.creatures.push(new CreatureSprite(this, this.map.tileToWorldX(c.tileX), this.map.tileToWorldY(c.tileY), getCardData(c.kind).sprite, c.id, player.dir))
        })
        
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.cameras.main.worldView.height)
        this.cameras.main.centerToBounds()
    }

    drawMarchingDashedRect(
        g:GameObjects.Graphics,
        rect:Geom.Rectangle,
        offset = 0,
    ) {
        let {x, y, width, height} = rect
        width-=2
        height-=2
        const dashLength = 5, gapLength = 2
        const perimeter = 2 * (width + height);
        const step = dashLength + gapLength;
    
        let dist = offset % step;
        if (dist < 0) dist += step;
    
        while (dist < perimeter) {
            const start = dist;
            const end = Math.min(dist + dashLength, perimeter);
    
            drawRectSegment(g, x, y, width, height, start, end);
            dist += step;
        }
    }
    
    endTurn = async () => {
        let match = store.getState().saveFile.currentMatch
        const currentI = match.players.findIndex(p=>p.id === match.activePlayerId)
        const current = match.players[currentI]
        
        //1. move creatures / resolve combats
        const mine = this.creatures.filter(c=>match.board.find(cr=>cr.id===c.id && cr.ownerId === current.id))
        for(let i=0;i<mine.length;i++){
            await mine[i].tryMoveNext()
        }
        match = store.getState().saveFile.currentMatch
        //2. set next player
        const nextI = (currentI+1)%match.players.length
        const nextPlayer = match.players[nextI]
        onUpdateActivePlayer(nextPlayer.id)

        //3.reset player resources
        match.board.forEach(c=>{
            if(c.ownerId === nextPlayer.id){
                c.tapped = false
                c.newSummon = false
                //TODO: add/remove timed effects
            }
        })
        onUpdateBoard(Array.from(match.board))
        onUpdatePlayer({...nextPlayer,
            drawAllowed:1,
            hasPlayedLand:false,
            manaPool:{...emptyMana}
        })

        if(nextPlayer.isAI){
            this.runAITurn()
        }

    }

    playLand = () => {
        let state=store.getState().saveFile.currentMatch
        const p = state.players.find(p=>p.id === state.activePlayerId)
        state.board.filter(c=>getCardData(c.kind).kind === Permanents.Land && c.ownerId === p.id && !c.tapped).forEach(l=>{
            const meta = getCardData(l.kind)
            p.manaPool[meta.color]=p.manaPool[meta.color]-meta.ability.cost[0].amount
            l.tapped = true
        })
        onUpdateBoard(Array.from(state.board))
        const land = p.hand.find(c=>getCardData(c.kind).kind === Permanents.Land)
        const lTile = p.dir === Direction.NORTH ? 
            this.northLands.find(t=>!state.board.find(c=>c.tileX === t.x && c.tileY === t.y)):
            this.southLands.find(t=>!state.board.find(c=>c.tileX === t.x && c.tileY === t.y))
        if(land && lTile){
            this.addCard(land.id, lTile.pixelX, lTile.pixelY)
        }
    }

    runAITurn = async () => {
        this.playLand()
        const state = store.getState().saveFile.currentMatch
        let p = state.players.find(p=>p.id === state.activePlayerId)
        const next = p.deck.cards.shift()
        if(next) p.hand = p.hand.concat(next)
        //TODO: choose high priority target to destroy/block
        const enemies = state.board.filter(c=>c.ownerId !== p.id && getCardData(c.kind).kind === Permanents.Creature).map(c=>this.creatures.find(s=>s.id === c.id))
        if(enemies.length > 0){
            const creatureSorceries = p.hand.find(c=>
                getCardData(c.kind).kind === Permanents.Sorcery &&
                canAfford(p.manaPool,c) &&
                getCardData(c.kind).ability.targets === Permanents.Creature && 
                (getCardData(c.kind).ability.effect.dmg || getCardData(c.kind).ability.effect.removal))
            if(creatureSorceries){
                this.applySorcery(enemies[0], creatureSorceries)
                p.manaPool = payCost(p.manaPool, getCardData(creatureSorceries.kind).cost)
            }
        }
        onUpdatePlayer({...p})
        const creature = p.hand.find(c=>getCardData(c.kind).kind === Permanents.Creature && canAfford(p.manaPool,c))
        if(creature){
            if(enemies[0]){
                const enemyTile = this.map.getTileAtWorldXY(enemies[0].x, enemies[0].y, false, undefined, Layers.Earth)
                const spawnTile = this.map.getTileAt(enemyTile.x, p.dir === Direction.NORTH ? this.northCreatures[0].y : this.southCreatures[0].y)
                this.addCard(creature.id, spawnTile.pixelX, spawnTile.pixelY)
            }
            else {
                const spawnTile = this.map.getTileAt(this.getEmptyStartTile(p).x, p.dir === Direction.NORTH ? this.northCreatures[0].y : this.southCreatures[0].y)
                this.addCard(creature.id, spawnTile.pixelX, spawnTile.pixelY)
            }
        }
        //TODO: use owned creature abilities if possible
        
        this.endTurn()
    }

    getEmptyStartTile (p:PlayerState) {
        const mine = store.getState().saveFile.currentMatch.board.filter(c=>c.ownerId === p.id)
        if(p.dir === Direction.NORTH){
            return this.northCreatures.find(t=>!mine.find(c=>c.tileX === t.x && c.tileY === t.y))
        }
        else {
            return this.southCreatures.find(t=>!mine.find(c=>c.tileX === t.x && c.tileY === t.y))
        }
    }

    showCardTargets = (show:boolean) => {
        this.g.clear()
        if(!show) return
        this.time.addEvent({
            delay:250,
            callback: () => {
                const state = store.getState()
                const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId)
                const card = me.hand.find(c=>c.id === state.selectedCardId)
                if(getCardData(card.kind).kind === Permanents.Land){
                    if(me.dir === Direction.NORTH){
                        this.northLands.forEach(t=>{
                            this.drawMarchingDashedRect(this.g, t.getBounds() as Geom.Rectangle)
                        })
                    }
                    else this.southLands.forEach(t=>{
                        this.drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                    })
                }
                else if(getCardData(card.kind).kind === Permanents.Creature){
                    if(me.dir === Direction.NORTH){
                        this.northCreatures.forEach(t=>{
                            this.drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                        })
                    }
                    else this.southCreatures.forEach(t=>{
                        this.drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                    })
                }
                else if(getCardData(card.kind).kind === Permanents.Enchantment){
                    //TODO: get all creatures tiles and highlight
                }
                else if(getCardData(card.kind).kind === Permanents.Sorcery){
                    //TODO: get all creatures & land tiles and highlight
                }
            }
        })
    }

    createSelectIcon = () => {
        this.selectIcon = this.add.image(0, 0, 'selected').setDepth(3).setVisible(false)
    }

    startPreview = (b:CardType) => {
        this.creaturePreview = this.add.image(0, 0, 'creatures', getCardData(b).sprite).setAlpha(0.5).setDepth(4)
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
            // if (this.game.input.activePointer.isDown) {
            //     if (this.origDragPoint) {
            //         // move the camera by the amount the mouse has moved since last update
            //         this.cameras.main.scrollX +=
            //             (this.origDragPoint.x - this.game.input.activePointer.position.x);
            //         this.cameras.main.scrollY +=
            //             (this.origDragPoint.y - this.game.input.activePointer.position.y);
            //     } // set new drag origin to current position
            //     this.origDragPoint = this.game.input.activePointer.position.clone();
            // } 
            // else {
            //     this.origDragPoint = null;
            // }
            if(tile && this.creaturePreview){
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
                const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId)
                if(GameObjects.length > 0){
                    const sprite = GameObjects[0] as CreatureSprite
                    //determine card action
                    if(state.selectedCardId){
                        const card = me.hand.find(c=>c.id === state.selectedCardId)
                        if(getCardData(card.kind).kind === Permanents.Enchantment){
                            return this.applyEnchantment(sprite, card)
                        }
                        if(getCardData(card.kind).kind === Permanents.Sorcery){
                            return this.applySorcery(sprite, card)
                        }
                    }
                    else {
                        const card = state.saveFile.currentMatch.board.find(c=>c.id === sprite.id)
                        const meta = getCardData(card.kind)
                        if(meta.kind === Permanents.Land && !card.tapped){
                            //tap and add to pool
                            this.tapLand(card, me)
                            this.floatResource(sprite.x, sprite.y, IconIndex.Mana, '#ff0000')
                            //TODO add exausted icon to card
                        }
                    }
                }
                else if(GameObjects.length === 0 && state.selectedCardId){
                    const card = me.hand.find(c=>c.id === state.selectedCardId)
                    const d = getCardData(card.kind)
                    if(d.kind===Permanents.Land && me.hasPlayedLand) return
                    if(this.validStartTile(tile, this.myDir, d.kind === Permanents.Land)){
                        this.addCard(state.selectedCardId, tile.pixelX, tile.pixelY)
                    }
                }
            }
        })
    }

    tapLand = (card:Card, me:PlayerState) => {
        const meta = getCardData(card.kind)
        onUpdatePlayer({...me, manaPool: {...me.manaPool, 
            [meta.color]: me.manaPool[meta.color]-meta.ability.cost[0].amount
        }})
        onUpdateBoardCreature({...card, tapped: true})
    }

    validStartTile = (t:Tilemaps.Tile, dir:Direction, land:boolean) => {
        if(dir === Direction.SOUTH){
            if(land) return this.southLands.find(l=>l.x===t.x&&l.y===t.y)
            return this.southCreatures.find(l=>l.x===t.x&&l.y===t.y)
        }
        else{
            if(land) return this.northLands.find(l=>l.x===t.x&&l.y===t.y)
            return this.northCreatures.find(l=>l.x===t.x&&l.y===t.y)
        } 
    }

    validEndTile = (t:Tilemaps.Tile, dir:Direction, land:boolean) => {
        if(dir === Direction.NORTH){
            if(land) return this.southLands.find(l=>l.x===t.x&&l.y===t.y)
            return this.southCreatures.find(l=>l.x===t.x&&l.y===t.y)
        }
        else{
            if(land) return this.northLands.find(l=>l.x===t.x&&l.y===t.y)
            return this.northCreatures.find(l=>l.x===t.x&&l.y===t.y)
        } 
    }

    applySorcery = (s:CreatureSprite, card:Card) => {
        //TODO
    }

    applyEnchantment = (s:CreatureSprite, card:Card) => {
        //TODO
    }

    addCard = (cardId:string, worldX:number,worldY:number) => {
        this.creaturePreview.destroy()
        onSelectCreature('',null)
        const state = store.getState()
        const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.currentMatch.activePlayerId)
        const card = me.hand.find(c=>c.id === cardId)
        const data = getCardData(card.kind)
        if(data.kind === Permanents.Land) me.hasPlayedLand = true
        this.creatures.push(new CreatureSprite(this, worldX,worldY, data.sprite, card.id, me.dir))
        const t = this.map.getTileAtWorldXY(worldX,worldY,false, undefined, Layers.Earth)
        onUpdateBoard(state.saveFile.currentMatch.board.concat({...card, tileX:t.x, tileY:t.y}))
        onUpdatePlayer({...me, 
            hand: me.hand.filter(c=>c.id !== cardId), 
            manaPool: payCost(me.manaPool, data.cost)
        })
    }

    setCursor = (assetUrl:string) => {
        this.input.setDefaultCursor('url('+assetUrl+'), pointer');
    }

    floatResource = (x:number, y:number, index:IconIndex, color:string, text?:string) => {
        let icon = this.add.image(x, y, 'creatures', index).setDepth(4)
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

    flashIcon = (x:number, y:number, index:IconIndex) => {
        let icon = this.add.image(x, y, 'creatures', index).setDepth(4)
        this.time.addEvent({
            delay:1000,
            callback: ()=>icon.destroy()
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