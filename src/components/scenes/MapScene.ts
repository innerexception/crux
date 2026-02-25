import { Scene, GameObjects, Tilemaps, Time, Geom } from "phaser";
import { store } from "../../..";
import { CardType, Color, Direction, IconIndex, Layers, LayerStack, Maps, Modal, Modifier, Permanents, SceneNames, Target } from "../../../enum";
import { defaultCursor, FONT_DEFAULT } from "../../assets/Assets";
import { onInspectCreature, onSelectCreature, onSetScene, onShowModal, onUpdateActivePlayer, onUpdateBoard, onUpdateBoardCreature, onUpdatePlayer, onUpdateSave } from "../../common/Thunks";
import CreatureSprite from "../sprites/CreatureSprite";
import { canAfford, drawMarchingDashedRect, drawRectSegment, emptyMana, getColorlessRemain, isPassableTile, payCost, transitionIn, transitionOut } from "../../common/Utils";
import { getCardData, tapLand } from "../../common/CardUtils";
import{ v4 } from 'uuid'
import PlayerSprite from "../sprites/PlayerSprite";

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
    playerNorth:GameObjects.Image
    playerSouth:GameObjects.Image
    
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
        drawMarchingDashedRect(g, rect)
        const pn = mySave.players.find(p=>p.dir === Direction.NORTH)
        this.playerNorth?.destroy()
        this.playerNorth = new PlayerSprite(this, rect.centerX, rect.top-64, pn.sprite, pn.id)
        const ps = mySave.players.find(p=>p.dir === Direction.SOUTH)
        this.playerSouth?.destroy()
        this.playerSouth = new PlayerSprite(this, rect.centerX, rect.bottom+32, ps.sprite, ps.id)


        this.creatures.forEach(e=>e.destroy())
        this.creatures = []
        mySave.board.forEach(c=>{
            const player = mySave.players.find(p=>p.id === c.ownerId)
            this.creatures.push(new CreatureSprite(this, this.map.tileToWorldX(c.tileX), this.map.tileToWorldY(c.tileY), getCardData(c).sprite, c.id, player.dir))
        })
        
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.cameras.main.worldView.height)
        this.cameras.main.centerToBounds()
    }

    endTurn = async () => {
        let match = store.getState().saveFile.currentMatch
        const currentI = match.players.findIndex(p=>p.id === match.activePlayerId)
        const current = match.players[currentI]
        
        //0. clear dead creatures
        const rm = match.board.filter(c=>c.def <= 0)
        rm.forEach(c=>this.tryRemoveCreature(c))
        match = store.getState().saveFile.currentMatch

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
                //add/remove timed status effects
                c.status.forEach(s=>s.duration--)
                c.status.forEach(s=>{
                    if(s.duration <= 0){
                        this.expireEffect(c, s)
                    }
                })
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
        state.board.filter(c=>getCardData(c).kind === Permanents.Land && c.ownerId === p.id && !c.tapped).forEach(l=>{
            const meta = getCardData(l)
            p.manaPool[meta.color]=p.manaPool[meta.color]-meta.ability.cost[0].amount
            l.tapped = true
        })
        onUpdateBoard(Array.from(state.board))
        const land = p.hand.find(c=>getCardData(c).kind === Permanents.Land)
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
        const enemies = state.board.filter(c=>c.ownerId !== p.id && getCardData(c).kind === Permanents.Creature)
        if(enemies.length > 0){
            const creatureSorceries = p.hand.find(c=>
                getCardData(c).kind === Permanents.Sorcery &&
                canAfford(p.manaPool,c) &&
                getCardData(c).ability.targets === Target.Creature && 
                (getCardData(c).ability.effect.dmg || getCardData(c).ability.effect.removal))
            if(creatureSorceries){
                this.applyCreatureSorcery(enemies[0], creatureSorceries)
                p.manaPool = payCost(p.manaPool, getCardData(creatureSorceries).cost)
            }
        }
        onUpdatePlayer({...p})
        const creature = p.hand.find(c=>getCardData(c).kind === Permanents.Creature && canAfford(p.manaPool,c))
        if(creature){
            if(enemies[0]){
                const enemyTile = this.map.getTileAt(enemies[0].tileX, enemies[0].tileY, false, Layers.Earth)
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
                const dat = getCardData(card)
                if(dat.kind === Permanents.Land){
                    if(me.dir === Direction.NORTH){
                        this.northLands.forEach(t=>{
                            drawMarchingDashedRect(this.g, t.getBounds() as Geom.Rectangle)
                        })
                    }
                    else this.southLands.forEach(t=>{
                        drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                    })
                }
                else if(dat.kind === Permanents.Creature){
                    if(me.dir === Direction.NORTH){
                        this.northCreatures.forEach(t=>{
                            drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                        })
                    }
                    else this.southCreatures.forEach(t=>{
                        drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                    })
                }
                else if(dat.kind === Permanents.Enchantment){
                    let creatureTiles = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature)
                            .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
                    if(dat.ability.targets === Target.CreaturesYouControl){
                        creatureTiles = state.saveFile.currentMatch.board.filter(c=>c.ownerId === me.id && getCardData(c).kind === Permanents.Creature)
                            .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
                    }
                    creatureTiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
                }
                else if(dat.kind === Permanents.Sorcery){
                    let tiles = []
                    if(dat.ability.targets === Target.Lands){
                        tiles = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Land)
                            .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
                    }
                    if(dat.ability.targets === Target.Creature){
                        tiles = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature)
                            .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
                    }
                    if(dat.ability.targets === Target.CreaturesOrPlayers || dat.ability.targets === Target.CreaturesAndPlayers){
                        tiles = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature)
                            .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
                        tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerNorth.x, this.playerNorth.y, false, undefined, Layers.Earth))
                        tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerSouth.x, this.playerSouth.y, false, undefined, Layers.Earth))
                    }
                    if(dat.ability.targets === Target.CreaturesYouControl){
                        tiles = state.saveFile.currentMatch.board.filter(c=>c.ownerId === me.id && getCardData(c).kind === Permanents.Creature)
                            .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
                    }
                    if(dat.ability.targets === Target.CreaturesYourGraveyard){
                        return onShowModal(Modal.Graveyard)
                    }
                    if(dat.ability.targets === Target.CreaturesAnyGraveyard){
                        return onShowModal(Modal.AnyGraveyard) //TODO
                    }
                    tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
                }
            }
        })
    }

    createSelectIcon = () => {
        this.selectIcon = this.add.image(0, 0, 'selected').setDepth(3).setVisible(false)
    }

    startPreview = (b:Card) => {
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
                        const dat = getCardData(card)
                        const targets = dat.ability.targets
                        if(targets === Target.CreaturesAndPlayers){
                            this.applyGlobalEffect(card)
                            return this.payAndDiscard(card)
                        }
                        const pid = (GameObjects[0] as any).playerId
                        if(pid){
                            if(targets === Target.CreaturesOrPlayers || targets === Target.Players){
                                this.applyPlayerEffect(state.saveFile.currentMatch.players.find(p=>p.id === pid), card)
                            }
                            else if(targets === Target.Self && pid === state.saveFile.myId){
                                this.applyPlayerEffect(state.saveFile.currentMatch.players.find(p=>p.id === pid),card)
                            }
                            return
                        }
                        if(this.validTarget(sprite, card)){
                            this.applyCreatureSorcery(state.saveFile.currentMatch.board.find(c=>c.id === sprite.id), card)
                            return
                        }
                    }
                    else {
                        const card = state.saveFile.currentMatch.board.find(c=>c.id === sprite.id)
                        if(card){
                            const meta = getCardData(card)
                            if(meta.kind === Permanents.Land && !card.tapped){
                                //tap and add to pool
                                tapLand(card, me)
                                this.floatResource(sprite.x, sprite.y, IconIndex.Mana, '#ff0000')
                                //TODO add exausted icon to card
                            }
                        }
                    }
                }
                else if(GameObjects.length === 0 && state.selectedCardId){
                    const card = me.hand.find(c=>c.id === state.selectedCardId)
                    const d = getCardData(card)
                    if(d.kind===Permanents.Land && me.hasPlayedLand) return
                    if(this.validStartTile(tile, this.myDir, d.kind === Permanents.Land)){
                        this.addCard(state.selectedCardId, tile.pixelX, tile.pixelY)
                    }
                }
            }
        })
    }

    validTarget(sprite:CreatureSprite, sorcery:Card):boolean {
        const sorceryData = getCardData(sorcery)
        const creature = store.getState().saveFile.currentMatch.board.find(c=>c.id === sprite.id)
        const cdat = getCardData(creature)
        if(cdat.kind === Permanents.Land){
            return sorceryData.ability.targets === Target.Lands
        }
        if(cdat.kind === Permanents.Creature){
            if(sorceryData.ability.targets === Target.Creature || 
                sorceryData.ability.targets === Target.CreaturesAndPlayers ||
                sorceryData.ability.targets === Target.CreaturesOrPlayers){
                return true
            }
            if(sorceryData.ability.targets === Target.AttackingCreatures){
                const owner = store.getState().saveFile.currentMatch.players.find(p=>p.id === creature.ownerId)
                return !this.validStartTile(this.map.getTileAt(creature.tileX, creature.tileY, false, Layers.Earth), owner.dir, false)
            }
            if(sorceryData.ability.targets === Target.CreaturesYouControl){
                return creature.ownerId === sorcery.ownerId
            }
        }

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

    applyCreatureSorcery = (creature:Card, sorcery:Card) => {

        const dat = getCardData(sorcery)
        //play dmg/buff/debuff sprite
        const s = this.creatures.find(c=>c.id === creature.id)
        this.flashIcon(s.x, s.y, dat.ability.effect.sprite)

        if(dat.ability.effect.duration){
            creature.status.push({
                id: v4(),
                duration: dat.ability.effect.duration,
                status: dat.ability.effect
            })
            onUpdateBoardCreature({...creature})
        }
        
        this.applyCreatureEffect(creature, dat.ability.effect)
        this.payAndDiscard(creature)
    }

    payAndDiscard(card:Card){
        this.creaturePreview?.destroy()
        onSelectCreature('', null)
        const p = store.getState().saveFile.currentMatch.players.find(p=>p.id === card.ownerId)
        const data = getCardData(card)
        let colorless = null
        if(data.ability.effect.dmgX || data.ability.effect.drawX){
            colorless = { kind: Color.None, amount: getColorlessRemain(p.manaPool, card)}
        }
        onUpdatePlayer({...p, 
            discard: p.discard.concat(card), 
            hand: p.hand.filter(h=>h.id!==card.id),
            manaPool: payCost(p.manaPool, colorless ? data.cost.concat(colorless):data.cost)
        })
    }

    expireEffect = (creature:Card, effect:StatusEffect) => {
        //play dmg/buff/debuff sprite
        const s = this.creatures.find(c=>c.id === creature.id)
        this.flashIcon(s.x, s.y, effect.status.sprite)
        creature.status = creature.status.filter(s=>s.id!==effect.id)
        if(effect.status.atkUp){
            creature.atk-=effect.status.atkUp
        }
        if(effect.status.defUp){
            creature.def-=effect.status.defUp
        }
        if(effect.status.addAttributes){
            creature.attributes=creature.attributes.filter(a=>!effect.status.addAttributes.includes(a))
        }
    }

    applyGlobalEffect(card:Card) {
        const players = store.getState().saveFile.currentMatch.players
        players.forEach(player=>this.applyPlayerEffect(player, card))

        const creatures = store.getState().saveFile.currentMatch.board
        creatures.forEach(creature=>this.applyCreatureSorcery(creature, card))
    }

    applyPlayerEffect(targetPlayer:PlayerState, c:Card) {
        
        const effect = getCardData(c).ability.effect
        const caster = store.getState().saveFile.currentMatch.players.find(p=>p.id === c.ownerId)
        //TODO
        if(effect.damageReflect){
            const otherPlayer = store.getState().saveFile.currentMatch.players.find(p=>p.id !== c.ownerId)
            otherPlayer.hp-=targetPlayer.dmgRecieved
            onUpdatePlayer({...otherPlayer})
        }
        if(effect.creatureToHandFromGY){
            onShowModal(Modal.ChooseCreatureFromGY)
        }
        if(effect.creatureToHandFromLibrary){
            onShowModal(Modal.ChooseCreatureFromLibrary)
        }
        if(effect.arrangeTop5Remove1){
            onShowModal(Modal.EnemyTop5Remove1)
        }
        if(effect.cardToHandFromGY){
            onShowModal(Modal.ChooseFromGY)
        }
        if(effect.discard){
            onShowModal(Modal.ChooseDiscard)
        }
        if(effect.dmg){
            targetPlayer.hp-=effect.dmg
        }
        if(effect.dmgX){
            const x = getColorlessRemain(caster.manaPool, c)
            targetPlayer.hp-=x
        }
        if(effect.draw){
            targetPlayer = {...targetPlayer, hand: targetPlayer.hand.concat(targetPlayer.deck.cards.shift()),deck:targetPlayer.deck}
        }
        if(effect.drawX){
            const x = getColorlessRemain(caster.manaPool, c)
            for(let i=0;i<x;i++){
                targetPlayer = {...targetPlayer, hand: targetPlayer.hand.concat(targetPlayer.deck.cards.shift()),deck:targetPlayer.deck}
            }
        }
        if(effect.hpPerLand){
            const forests = store.getState().saveFile.currentMatch.board.filter(c=>c.kind === effect.hpPerLand)
            targetPlayer.hp+=forests.length*effect.hpUp
        }
        if(effect.searchSorceryForTop){
            onShowModal(Modal.PickNextSorcery)
        }
        if(targetPlayer.hp <= 0){
            if(targetPlayer.id === store.getState().saveFile.myId) onShowModal(Modal.GameOver)
            else onShowModal(Modal.Winner)
        }
        if(effect.addMana){
            targetPlayer.manaPool[effect.addMana]++
        }
        onUpdatePlayer({...targetPlayer})
        this.payAndDiscard(c)
    }

    applyCreatureEffect(creature:Card, effect:CardEffect) {
        const state = store.getState()
        let me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.currentMatch.activePlayerId)
        //TODO
        if(effect.creatureToLibrary){
            this.tryRemoveCreature(creature)
            const p = store.getState().saveFile.currentMatch.players.find(p=>p.id === creature.ownerId)
            onUpdatePlayer({...p, 
                deck: {...p.deck, cards: p.deck.cards.concat(creature)},
                discard: p.discard.filter(c=>c.id !== creature.id)
            })
        }
        if(effect.addAttributes){
            creature.attributes = creature.attributes.concat(effect.addAttributes)
        }
        if(effect.atkUp){
            creature.atk+=effect.atkUp
        }
        if(effect.defUp){
            creature.def+=effect.defUp
        }
        if(effect.cardToHandFromGY){
            onShowModal(Modal.ChooseFromGY)
        }
        if(effect.destroy){
            creature.def = 0
        }
        if(effect.discard){
            onShowModal(Modal.ChooseDiscard)
        }
        if(effect.dmg){
            creature.def-=effect.dmg
        }
        if(effect.dmgX){
            const x = getColorlessRemain(me.manaPool, creature)
            creature.def-=x
        }
        if(effect.draw){
            me = {...me, hand: me.hand.concat(me.deck.cards.shift()),deck:me.deck}
        }
        if(effect.drawX){
            const x = getColorlessRemain(me.manaPool, creature)
            for(let i=0;i<x;i++){
                me = {...me, hand: me.hand.concat(me.deck.cards.shift()),deck:me.deck}
            }
        }
        if(effect.pacifism){
            creature.tapped = true
        }
        if(effect.removal){
            this.tryRemoveCreature(creature)
        }
        if(effect.searchSorceryForTop){
            onShowModal(Modal.PickNextSorcery)
        }
        if(effect.untap){
            creature.tapped = false
        }
    }

    tryRemoveCreature (card:Card) {
        //TODO
        //3. death effects
        const spr = this.creatures.find(c=>c.id === card.id)
        spr.destroy()
        let board = store.getState().saveFile.currentMatch.board
        board.splice(board.findIndex(c=>c.id === card.id), 1)
        onUpdateBoard(Array.from(board))
        const p = store.getState().saveFile.currentMatch.players.find(p=>p.id === card.ownerId)
        onUpdatePlayer({...p, discard: p.discard.concat(card)})
    }

    addCard = (cardId:string, worldX:number,worldY:number) => {
        this.creaturePreview?.destroy()
        onSelectCreature('',null)
        const state = store.getState()
        const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.currentMatch.activePlayerId)
        const card = me.hand.find(c=>c.id === cardId)
        const data = getCardData(card)
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