import { Scene, GameObjects, Tilemaps, Time, Geom } from "phaser";
import { store } from "../../..";
import { Color, Direction, IconIndex, Layers, LayerStack, Maps, Modal, Modifier, Permanents, SceneNames, Target, Triggers } from "../../../enum";
import { defaultCursor, FONT_DEFAULT } from "../../assets/Assets";
import { onInspectCreature, onSelectBoardCard, onSelectCard, onSetScene, onShowAbilityPreview, onShowModal, onUpdateActivePlayer, onUpdateBoard, onUpdateBoardCreature, onUpdateLands, onUpdatePlayer } from "../../common/Thunks";
import CreatureSprite from "../sprites/CreatureSprite";
import { canAfford, drawMarchingDashedRect, emptyMana, getColorlessRemain, payCost, transitionIn, transitionOut } from "../../common/Utils";
import { getCardData, tapLand } from "../../common/CardUtils";
import{ v4 } from 'uuid'
import { sendAddCardEffect, sendLandTappedEffect, sendMoveCard, sendTriggerCardAbility } from "../../common/Network";

const TILE_DIM=32
const FIELD_WIDTH=3
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
    northLands:Tilemaps.Tile[]
    northCreatures:Tilemaps.Tile[]
    southLands:Tilemaps.Tile[]
    southCreatures:Tilemaps.Tile[]
    playerNorth:GameObjects.Image
    playerSouth:GameObjects.Image
    grid:Tilemaps.Tile[]
    
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
        
        const match= store.getState().saveFile.currentMatch
        this.map?.destroy()
        this.map = this.add.tilemap(Maps.Tutorial)
        let grass = this.map.addTilesetImage('tiles', 'tiles', TILE_DIM,TILE_DIM)
        LayerStack.forEach(l=>this.map.createLayer(l, grass))

        const midTile = this.map.getTileAt(Math.round(this.map.width/2), Math.round(this.map.height/2), false, Layers.Earth)
        this.northLands = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y-FIELD_HEIGHT-1, FIELD_WIDTH*2, 1)
        this.northCreatures = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y-FIELD_HEIGHT, FIELD_WIDTH*2, 1)
        this.southLands = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y+FIELD_HEIGHT-1, FIELD_WIDTH*2, 1)
        this.southCreatures = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y+(FIELD_HEIGHT-2), FIELD_WIDTH*2, 1)
        
        const g = this.add.graphics().setDefaultStyles({ lineStyle: { width:2, color:0xffffff, alpha:0.5 }}).setDepth(7)
        const rect = new Geom.Rectangle(midTile.pixelX-(FIELD_WIDTH*TILE_DIM), midTile.pixelY-(FIELD_HEIGHT*TILE_DIM), FIELD_WIDTH*2*TILE_DIM, 5*TILE_DIM)
        drawMarchingDashedRect(g, rect)
        this.grid = this.map.getTilesWithinShape(rect)
        const pn = match.players.find(p=>p.dir === Direction.NORTH)
        this.playerNorth?.destroy()
        this.playerNorth = new CreatureSprite(this, rect.centerX, rect.top-64, pn.playerSprite, pn.id, Direction.NORTH)
        const ps = match.players.find(p=>p.dir === Direction.SOUTH)
        this.playerSouth?.destroy()
        this.playerSouth = new CreatureSprite(this, rect.centerX, rect.bottom+32, ps.playerSprite, ps.id, Direction.SOUTH)


        this.refresh(match)
        
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.cameras.main.worldView.height)
        this.cameras.main.centerToBounds()
    }

    playAILand = () => {
        let state=store.getState().saveFile.currentMatch
        const p = state.players.find(p=>p.id === state.activePlayerId)
        const lTile = p.dir === Direction.NORTH ? 
            this.northLands.find(t=>!state.board.find(c=>c.tileX === t.x && c.tileY === t.y)):
            this.southLands.find(t=>!state.board.find(c=>c.tileX === t.x && c.tileY === t.y))
        let land = state.lands.slice(0,3).find(l=>p.hand.find(c=>getCardData(c).color === getCardData(l).color))
        if(!land) land = state.lands[0]
        if(lTile){
            this.net_addCard({cardId: land.id, worldX:lTile.pixelX, worldY:lTile.pixelY})
        }
        state=store.getState().saveFile.currentMatch
        state.board.filter(c=>getCardData(c).kind === Permanents.Land && c.ownerId === p.id && !c.tapped).forEach(l=>{
            const meta = getCardData(l)
            const color = meta.ability.effect.addMana
            p.manaPool[color]=p.manaPool[color]+1
            l.tapped = true
        })
        onUpdateBoard(Array.from(state.board))
    }

    runAITurn = async () => {
        this.playAILand()
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
                (getCardData(c).ability.effect.dmg || getCardData(c).ability.effect.destroy))
            if(creatureSorceries){
                this.applyCreatureSorcery({creature: enemies[0], sorcery: creatureSorceries})
            }
        }
        onUpdatePlayer({...p})
        const creature = p.hand.find(c=>getCardData(c).kind === Permanents.Creature && canAfford(p.manaPool,c))
        if(creature){
            if(enemies[0]){
                const enemyTile = this.map.getTileAt(enemies[0].tileX, enemies[0].tileY, false, Layers.Earth)
                const spawnTile = this.map.getTileAt(enemyTile.x, p.dir === Direction.NORTH ? this.northCreatures[0].y : this.southCreatures[0].y)
                this.net_addCard({cardId: creature.id, worldX: spawnTile.pixelX, worldY: spawnTile.pixelY})
            }
            else {
                const spawnTile = this.map.getTileAt(this.getEmptyStartTile(p).x, p.dir === Direction.NORTH ? this.northCreatures[0].y : this.southCreatures[0].y)
                this.net_addCard({cardId: creature.id, worldX: spawnTile.pixelX, worldY: spawnTile.pixelY})
            }
        }
        //TODO: use owned creature abilities if possible
        
        this.net_endTurn(store.getState().saveFile.currentMatch)
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

    hideCardTargets() {
        this.g.clear()
        onShowAbilityPreview(null)
    }

    showCardTargets = (card:Card) => {
        this.g.clear()
        const state = store.getState()
        const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId)
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
                    if(card.attributes.includes(Modifier.Timid)){
                        if(state.saveFile.currentMatch.board.find(c=>getCardData(c).kind === Permanents.Creature && c.tileX === t.x))
                            return
                    }
                    drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                })
            }
            else this.southCreatures.forEach(t=>{
                    if(card.attributes.includes(Modifier.Timid)){
                        if(state.saveFile.currentMatch.board.find(c=>getCardData(c).kind === Permanents.Creature && c.tileX === t.x))
                            return
                    }
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
            this.showAbilityTargets(dat.ability)
        }
    }

    showAbilityTargets = (ability:CardAbility) => {

        //TODO: show pending ability
        onShowAbilityPreview(ability)
        this.g.clear()
        let tiles = []
        const state = store.getState()
        const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId)
        if(ability.targets === Target.Lands){
            tiles = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Land)
                .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
        }
        if(ability.targets === Target.LandsYouControl){
            tiles = state.saveFile.currentMatch.board.filter(c=>c.ownerId === me.id && getCardData(c).kind === Permanents.Land)
                .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
        }
        if(ability.targets === Target.Creature){
            tiles = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature)
                .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
        }
        if(ability.targets === Target.CreaturesOrPlayers || ability.targets === Target.CreaturesAndPlayers){
            tiles = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature)
                .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
            tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerNorth.x, this.playerNorth.y, false, undefined, Layers.Earth))
            tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerSouth.x, this.playerSouth.y, false, undefined, Layers.Earth))
        }
        if(ability.targets === Target.CreaturesYouControl){
            tiles = state.saveFile.currentMatch.board.filter(c=>c.ownerId === me.id && getCardData(c).kind === Permanents.Creature)
                .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
        }
        if(ability.targets === Target.CreaturesYourGraveyard || ability.targets === Target.YourGraveyard){
            return onShowModal(Modal.Graveyard)
        }
        if(ability.targets === Target.CreaturesAnyGraveyard){
            return onShowModal(Modal.AnyGraveyard) //TODO
        }
        if(ability.targets === Target.Players || ability.targets === Target.AllPlayers){
            tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerNorth.x, this.playerNorth.y, false, undefined, Layers.Earth))
            tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerSouth.x, this.playerSouth.y, false, undefined, Layers.Earth))
        }
        if(ability.targets === Target.Self){
            if(me.dir === Direction.NORTH)
                tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerNorth.x, this.playerNorth.y, false, undefined, Layers.Earth))
            else
                tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerSouth.x, this.playerSouth.y, false, undefined, Layers.Earth))
        }
        tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
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
                if(store.getState().saveFile.currentMatch.players.find(p=>p.id === bld.id)) return
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
            const state = store.getState()
            let tile = this.map?.getTileAtWorldXY(this.input.activePointer.worldX, this.input.activePointer.worldY, false, undefined, Layers.Earth)
            if(tile){
                const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId)
                const networkActive = state.saveFile.currentMatch.players.find(p=>p.isAI) ? false : true
                if(GameObjects.length > 0){
                    const sprite = GameObjects[0] as CreatureSprite
                    if(state.selectedCardId){
                        //determine card action: Sorcery or Enchantment from hand
                        let card = me.hand.find(c=>c.id === state.selectedCardId)
                        if(card){
                            const dat = getCardData(card)
                            if(dat.kind === Permanents.Sorcery || dat.kind === Permanents.Enchantment){
                                const props = {card, entityId:sprite.id, discard:true}
                                if(networkActive) sendTriggerCardAbility(props)
                                else this.net_triggerCardAbility(props)
                            }
                            return
                        }
                        card = state.saveFile.currentMatch.board.find(c=>c.id === state.selectedCardId)
                        if(card){
                            const props = {card, entityId:sprite.id, discard:false}
                            if(networkActive) sendTriggerCardAbility(props)
                            else this.net_triggerCardAbility(props) //card on board are not discarded when triggered
                            return
                        }
                    }
                    else {
                        //card action: Mana producer
                        const card = state.saveFile.currentMatch.board.find(c=>c.id === sprite.id)
                        if(card){
                            if(card.tapped) return //tapped cards can't be activated
                            const meta = getCardData(card)
                            if(meta.ability?.effect.addMana && card.ownerId === me.id){
                                if(networkActive) sendLandTappedEffect(card)
                                else this.net_tapLand(card)
                            }
                            if(meta.ability?.trigger === Triggers.AtWill || card.attributes.includes(Modifier.Nimble)){
                                if(card.attributes.includes(Modifier.Nimble)){
                                    let tiles = []
                                    if(this.isEmptyTile(card.tileX-1, card.tileY))
                                        tiles.push(this.map.getTileAt(card.tileX-1, card.tileY, false, Layers.Earth)) //TODO: left/right tiles may be occupied, or Taunt may be in effect
                                    if(this.isEmptyTile(card.tileX+1, card.tileY))
                                        tiles.push(this.map.getTileAt(card.tileX+1, card.tileY, false, Layers.Earth))
                                    tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
                                }
                                else this.showAbilityTargets(meta.ability)
                                onSelectBoardCard(card)
                            }
                        }
                    }
                }
                else if(GameObjects.length === 0 && state.selectedCardId){
                    //Empty space case, place creature or land in valid space
                    let card = me.hand.find(c=>c.id === state.selectedCardId)
                    if(card){
                        //handle placing CREATURE from hand in open space
                        const d = getCardData(card)
                        if(d.kind !== Permanents.Creature) return //Cannot place other types in open spaces
                        if(card.attributes.includes(Modifier.Timid)){ //Exclude timids
                            if(state.saveFile.currentMatch.board.find(c=>getCardData(c).kind === Permanents.Creature && c.tileX === tile.x))
                                return
                        }
                        if(this.validStartTile(tile, me.dir, false)){
                            const props = {cardId:state.selectedCardId, worldX:tile.pixelX, worldY: tile.pixelY}
                            if(networkActive) sendAddCardEffect(props)
                            else this.net_addCard(props)
                        }
                        return
                    }
                    if(!card) card = state.saveFile.currentMatch.lands.find(l=>l.id === state.selectedCardId)
                    if(card){
                        //handle fresh LAND placement case
                        if(me.hasPlayedLand) return //land cutoff
                        if(this.validStartTile(tile, me.dir, true)){
                            const props = {cardId:state.selectedCardId, worldX:tile.pixelX, worldY: tile.pixelY}
                            if(networkActive) sendAddCardEffect(props)
                            else this.net_addCard(props)
                        }
                        return
                    }
                    if(!card) card = state.saveFile.currentMatch.board.find(l=>l.id === state.selectedCardId)
                    if(card){
                        const d = getCardData(card)
                        //handle MOVING a board CREATURE case
                        if(d.kind !== Permanents.Creature || !card.attributes.includes(Modifier.Nimble)) return //Cannot displace other types
                        if(tile.y===card.tileY && (tile.x === card.tileX-1||tile.x===card.tileX+1)){
                            if(this.isEmptyTile(tile.x, tile.y)){
                                //If valid target proceed
                                const props = { card, tileX:tile.x, tileY:tile.y }
                                if(networkActive) sendMoveCard(props)
                                else this.net_moveCard(props) //card on board are not discarded when triggered
                                onShowAbilityPreview(null)
                                onSelectCard(null)
                            }
                            return
                        }
                    }
                }
            }
        })
    }

    isEmptyTile(tileX:number, tileY:number){
        if(store.getState().saveFile.currentMatch.board.find(c=>c.tileX === tileX && c.tileY === tileY)) 
            return false
        return this.grid.find(t=>t.x === tileX && t.y===tileY)
    }

    //NET safe methods to perform side effects
    
    net_moveCard(props:{card:Card, tileX:number, tileY:number}) {
        const tile = this.map.getTileAt(props.tileX, props.tileY, false, Layers.Earth)
        const spr = this.creatures.find(c=>c.id === props.card.id)
        spr.setPosition(tile.pixelX, tile.pixelY)
        onUpdateBoardCreature({...props.card, tileX: props.tileX, tileY: props.tileY, tapped: true})
    }

    net_cancelPendingAction(){
        this.creaturePreview.destroy()
        onShowAbilityPreview(null)
        onSelectCard(null)
    }

    net_triggerCardAbility(props:{card:Card, entityId:string, discard:boolean}){
        const state = store.getState()
        const card = props.card
        const discard = props.discard
        const dat = getCardData(card)
        const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId)
        const targets = dat.ability.targets
        onShowAbilityPreview(null)
        
        if(targets === Target.CreaturesAndPlayers){
            this.applyGlobalEffect(card)
            if(discard) this.payAndDiscard(card)
            return 
        }
        else if(targets === Target.AllCreatures){
            const props = {creatures: state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature), card}
            this.applyMultiCreatureEffect(props)
            if(discard) this.payAndDiscard(props.card)
            return 
        }
        else if(targets === Target.AllCreaturesYouControl){
            const props = {creatures: state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && c.ownerId === me.id), card}
            this.applyMultiCreatureEffect(props)
            if(discard) this.payAndDiscard(props.card) 
            return 
        }
        else if(targets === Target.TappedCreatures){
            const props = {creatures: state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && c.tapped), card}
            this.applyMultiCreatureEffect(props)
            if(discard) this.payAndDiscard(props.card)
            return 
        }
        else if(targets === Target.CreaturesInLane){
            const props = {creatures: state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && c.tileX === card.tileX), card}
            this.applyMultiCreatureEffect(props)
            if(discard) this.payAndDiscard(props.card)
            return 
        }
        
        const player = state.saveFile.currentMatch.players.find(p=>p.id === props.entityId)
        if(player){
            if(targets === Target.CreaturesOrPlayers || targets === Target.Players){
                this.targetPlayer({player, card})
                if(discard) this.payAndDiscard(card)
                return
            }
            else if(targets === Target.Self && player.id === state.saveFile.myId){
                this.targetPlayer({player, card})
                if(discard) this.payAndDiscard(card)
                return
            }
            else if(targets === Target.AllPlayers){
                this.targetAllPlayers(card)
                if(discard) this.payAndDiscard(card)
                return
            }
        }
        
        if(this.validTarget(props.entityId, card)){ //All other single targets
            const creature = state.saveFile.currentMatch.board.find(c=>c.id === props.entityId)
            this.applyCreatureSorcery({creature, sorcery:card})
            if(discard) this.payAndDiscard(card)
            return
        }
    }

    net_endTurn = async (match:MatchState) => {
        const current = match.players.find(p=>p.id === match.activePlayerId)
        
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
        const nextPlayer = match.players.find(p=>p.id !== current.id)
        onUpdateActivePlayer(nextPlayer.id)

        //3.reset player resources
        match.board.forEach(c=>{
            if(c.ownerId === nextPlayer.id){
                c.tapped = false
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

    net_tapLand(card:Card){
        //tap and add to pool
        const me = store.getState().saveFile.currentMatch.players.find(p=>p.id === card.ownerId)
        tapLand(card, me)
        const sprite = this.creatures.find(c=>c.id === card.id)
        this.floatResource(sprite.x, sprite.y, IconIndex.Mana, '#ff0000')
        //TODO add exausted icon to card
    }

    net_addCard = (props:{cardId:string, worldX:number,worldY:number}) => {
        this.creaturePreview?.destroy()
        onSelectCard(null)
        let state = store.getState().saveFile
        const me = state.currentMatch.players.find(p=>p.id === state.currentMatch.activePlayerId)
        let card = me.hand.find(c=>c.id === props.cardId)
        if(!card) card = state.currentMatch.lands.find(l=>l.id === props.cardId)
        const data = getCardData(card)
        if(data.kind === Permanents.Land) me.hasPlayedLand = true
        this.creatures.push(new CreatureSprite(this, props.worldX,props.worldY, data.sprite, card.id, me.dir))
        const t = this.map.getTileAtWorldXY(props.worldX,props.worldY,false, undefined, Layers.Earth)
        onUpdateBoard(state.currentMatch.board.concat({...card, ownerId: me.id, tileX:t.x, tileY:t.y}))
        onUpdatePlayer({...me, 
            hand: me.hand.filter(c=>c.id !== props.cardId), 
            manaPool: payCost(me.manaPool, data.cost)
        })
        state = store.getState().saveFile
        if(data.kind === Permanents.Land){
            onUpdateLands(state.currentMatch.lands.filter(l=>l.id!==props.cardId))
        }
        else if(data.kind === Permanents.Creature && data.ability){
            if(!data.ability.trigger){
                //OnEnter effects
                if(data.ability.conditionalSpend){
                    if(!me.manaPool[data.ability.conditionalSpend]) return
                }
                this.showAbilityTargets(data.ability)
                onSelectBoardCard(card)
            }
        }
    }

    //end NET safe methods

    targetPlayer(props:{player:PlayerState, card:Card}) {
        this.applyPlayerEffect(props.player, props.card)
        onSelectCard(null)
    }

    targetAllPlayers(card:Card) {
        const players = store.getState().saveFile.currentMatch.players
        players.forEach(player=>this.applyPlayerEffect(player, card))
    }

    applyCreatureSorcery = (props:{creature:Card, sorcery:Card}) => {
        const dat = getCardData(props.sorcery)
        //play dmg/buff/debuff sprite
        const s = this.creatures.find(c=>c.id === props.creature.id)
        this.flashIcon(s.x, s.y, dat.ability.effect.sprite)
        if(dat.ability.effect.duration){
            props.creature.status.push({
                id: v4(),
                duration: dat.ability.effect.duration,
                status: dat.ability.effect
            })
            onUpdateBoardCreature({...props.creature})
        }
        
        this.applyCreatureEffect(props.creature, dat.ability.effect)
    }

    applyMultiCreatureEffect(props:{card:Card, creatures:Card[]}) {
        props.creatures.forEach(creature=>this.applyCreatureSorcery({creature, sorcery: props.card}))
    }

    applyGlobalEffect(card:Card) {
        const players = store.getState().saveFile.currentMatch.players
        players.forEach(player=>this.applyPlayerEffect(player, card))

        const creatures = store.getState().saveFile.currentMatch.board
        creatures.forEach(creature=>this.applyCreatureSorcery({creature, sorcery: card}))
        
    }

    validTarget(entityId:string, sorcery:Card):boolean {
        const sorceryData = getCardData(sorcery)
        const creature = store.getState().saveFile.currentMatch.board.find(c=>c.id === entityId)
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

    payAndDiscard(card:Card){
        this.creaturePreview?.destroy()
        onSelectCard(null)
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
        if(effect.status.pacifism){
            creature.moves=getCardData(creature).defaultMoves
        }
    }

    applyPlayerEffect(targetPlayer:PlayerState, c:Card) {
        
        const effect = getCardData(c).ability.effect
        const state = store.getState().saveFile
        const caster = state.currentMatch.players.find(p=>p.id === c.ownerId)
        //TODO
        // if(effect.damageReflect){
        //     const otherPlayer = store.getState().saveFile.currentMatch.players.find(p=>p.id !== c.ownerId)
        //     otherPlayer.hp-=targetPlayer.dmgRecieved
        //     onUpdatePlayer({...otherPlayer})
        // }
        // if(effect.creatureToHandFromGY){
        //     onShowModal(Modal.ChooseCreatureFromGY)
        // }
        // if(effect.creatureToHandFromLibrary){
        //     onShowModal(Modal.ChooseCreatureFromLibrary)
        // }
        // if(effect.arrangeTop5Remove1){
        //     onShowModal(Modal.EnemyTop5Remove1)
        // }
        //Modal actions only happen on caster's client
        if(caster.id === state.myId){
            if(effect.cardToHandFromGY){
                onShowModal(Modal.ChooseFromGY, {targetPlayer})
            }
            if(effect.discard){
                onShowModal(Modal.ChooseDiscard, {targetPlayer})
            }
            if(effect.lookAtTop3){
                onShowModal(Modal.ViewDeckTop3, {targetPlayer})
            }
            if(effect.searchSorceryForTop){
                onShowModal(Modal.PickNextSorcery, {targetPlayer})
            }
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
        if(targetPlayer.hp <= 0){
            if(targetPlayer.id === store.getState().saveFile.myId) onShowModal(Modal.GameOver)
            else onShowModal(Modal.Winner)
        }
        if(effect.addMana){
            targetPlayer.manaPool[effect.addMana]++
        }
        onUpdatePlayer({...targetPlayer})
    }

    applyCreatureEffect(creature:Card, effect:CardEffect) {
        const state = store.getState()
        let activePlayer = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.currentMatch.activePlayerId)
        let me = state.saveFile.currentMatch.activePlayerId === state.saveFile.myId
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
        if(effect.searchSorceryForTop){
            if(me) onShowModal(Modal.PickNextSorcery)
        }
        if(effect.cardToHandFromGY){
            if(me) onShowModal(Modal.ChooseFromGY)
        }
        if(effect.discard){
            if(me) onShowModal(Modal.ChooseDiscard)
        }
        if(effect.destroy){
            creature.def = 0
        }
        if(effect.dmg){
            creature.def-=effect.dmg
        }
        if(effect.dmgX){
            const x = getColorlessRemain(activePlayer.manaPool, creature)
            creature.def-=x
        }
        if(effect.draw){
            activePlayer = {...activePlayer, hand: activePlayer.hand.concat(activePlayer.deck.cards.shift()),deck:activePlayer.deck}
        }
        if(effect.drawX){
            const x = getColorlessRemain(activePlayer.manaPool, creature)
            for(let i=0;i<x;i++){
                activePlayer = {...activePlayer, hand: activePlayer.hand.concat(activePlayer.deck.cards.shift()),deck:activePlayer.deck}
            }
        }
        if(effect.pacifism){
            creature.moves = 0
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
        onUpdateBoard(board.filter(c=>c.id !== card.id))
        const p = store.getState().saveFile.currentMatch.players.find(p=>p.id === card.ownerId)
        onUpdatePlayer({...p, discard: p.discard.concat(card)})
    }

    refresh(match:MatchState) {
        this.creatures.forEach(e=>e.destroy())
        this.creatures = []
        match.board.forEach(c=>{
            const player = match.players.find(p=>p.id === c.ownerId)
            this.creatures.push(new CreatureSprite(this, this.map.tileToWorldX(c.tileX), this.map.tileToWorldY(c.tileY), getCardData(c).sprite, c.id, player.dir))
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