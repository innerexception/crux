import { Scene, GameObjects, Tilemaps, Time, Geom } from "phaser";
import { store } from "../../..";
import { CardType, Color, Direction, IconIndex, Layers, LayerStack, Log, Maps, Modal, Modifier, Permanents, SceneNames, Target, Triggers } from "../../../enum";
import { defaultCursor, FONT_DEFAULT } from "../../assets/Assets";
import { addLogEntry, onInspectCreature, onSelectBoardCard, onSelectCard, onSetScene, onShowAbilityPreview, onShowModal, onUpdateBoard, onUpdateBoardCreature, onUpdateLands, onUpdatePlayer, onUpdateSave } from "../../common/Thunks";
import CreatureSprite from "../sprites/CreatureSprite";
import { canAct, canAfford, checkWinConditions, drawMarchingDashedRect, getColorlessRemain, payCost, shuffle, transitionIn, transitionOut } from "../../common/Utils";
import { getCardData, getLoot, getValidCreatureTargets, resetCard, validStartTile } from "../../common/CardUtils";
import{ v4 } from 'uuid'
import { net_addCard, net_cancelPendingAction, net_damageCard, net_endTurn, net_moveCard, net_tapLand, net_triggerCardAbility, sendAddCardEffect, sendDamageCard, sendLandTappedEffect, sendMoveCard, sendTriggerCardAbility } from "../../common/Network";

export const TILE_DIM=32
const FIELD_WIDTH=3
const FIELD_HEIGHT=3

export default class BattleScene extends Scene {

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
        this.map.setLayer(Layers.Earth)
        const midTile = this.map.findByIndex(1005)
        this.northLands = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y-FIELD_HEIGHT-1, FIELD_WIDTH*2, 1)
        this.northCreatures = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y-FIELD_HEIGHT, FIELD_WIDTH*2, 1)
        this.southLands = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y+FIELD_HEIGHT-1, FIELD_WIDTH*2, 1)
        this.southCreatures = this.map.getTilesWithin(midTile.x-FIELD_WIDTH, midTile.y+(FIELD_HEIGHT-2), FIELD_WIDTH*2, 1)
        
        const g = this.add.graphics().setDefaultStyles({ lineStyle: { width:2, color:0xffffff, alpha:0.5 }}).setDepth(7)
        const rect = new Geom.Rectangle(midTile.pixelX-(FIELD_WIDTH*TILE_DIM), midTile.pixelY-(FIELD_HEIGHT*TILE_DIM), FIELD_WIDTH*2*TILE_DIM, 5*TILE_DIM)
        //drawMarchingDashedRect(g, rect)
        this.grid = this.map.getTilesWithinShape(rect)
        const pn = match.players.find(p=>p.dir === Direction.NORTH)
        this.playerNorth?.destroy()
        this.playerNorth = new CreatureSprite(this, rect.centerX, rect.top-64, pn.playerSprite, pn.id, Direction.NORTH)
        const ps = match.players.find(p=>p.dir === Direction.SOUTH)
        this.playerSouth?.destroy()
        this.playerSouth = new CreatureSprite(this, rect.centerX, rect.bottom+32, ps.playerSprite, ps.id, Direction.SOUTH)

        this.creatures.forEach(e=>e.destroy())
        this.creatures = []
        match.board.forEach(c=>{
            const player = match.players.find(p=>p.id === c.ownerId)
            this.creatures.push(new CreatureSprite(this, this.map.tileToWorldX(c.tileX), this.map.tileToWorldY(c.tileY), getCardData(c).sprite, c.id, player.dir))
        })
        
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.centerOn(midTile.pixelX, midTile.pixelY)
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
            net_addCard({cardId: land.id, worldX:lTile.pixelX, worldY:lTile.pixelY})
        }
        state=store.getState().saveFile.currentMatch
        state.board.filter(c=>getCardData(c).kind === Permanents.Land && c.ownerId === p.id && !c.tapped).forEach(l=>{
            const meta = getCardData(l)
            const color = meta.ability.effect.addMana
            p.manaPool[color]=p.manaPool[color]+1
            l.tapped = true
        })
        onUpdatePlayer({...p})
        onUpdateBoard(Array.from(state.board))
    }

    aiPlayCreatureSorcery = () => {
        let state = store.getState().saveFile.currentMatch
        let p = state.players.find(p=>p.id === state.activePlayerId)
        const enemies = state.board.filter(c=>c.ownerId !== p.id && getCardData(c).kind === Permanents.Creature)
        if(enemies.length > 0){
            const sorcery = p.hand.find(c=>
                getCardData(c).kind === Permanents.Sorcery &&
                canAfford(p.manaPool,c) &&
                (getCardData(c).ability.effect.dmg || getCardData(c).ability.effect.destroy)) //TODO: include other debilitating effects
            if(sorcery){
                const target = enemies.find(e=>{
                        const targets = getValidCreatureTargets(getCardData(sorcery).ability, sorcery, e.id) 
                        return targets.find(t=>t.id === e.id)
                    })
                if(target) 
                    net_triggerCardAbility({card: sorcery, entityId: target.id, discard: true})
            }
        }
    }

    getEnemyCreatures = () => {
        let state = store.getState().saveFile.currentMatch
        let p = state.players.find(p=>p.id === state.activePlayerId)
        const enemies = state.board.filter(c=>c.ownerId !== p.id && getCardData(c).kind === Permanents.Creature)
        return enemies
    }

    aiPlayNewCreatures = () => {
        //play new creatures
        const enemies = this.getEnemyCreatures()
        const activePlayerId = store.getState().saveFile.currentMatch.activePlayerId
        let activePlayer = store.getState().saveFile.currentMatch.players.find(p=>p.id === activePlayerId)
        const dir = activePlayer.dir
        let creature = activePlayer.hand.find(c=>getCardData(c).kind === Permanents.Creature && canAfford(activePlayer.manaPool,c))
        let i=0
        while(creature && i<5){
            if(enemies[0] && creature.atk >= enemies[0].def){
                const enemyTile = this.map.getTileAt(enemies[0].tileX, enemies[0].tileY, false, Layers.Earth)
                const spawnTile = this.map.getTileAt(enemyTile.x, dir === Direction.NORTH ? this.northCreatures[0].y : this.southCreatures[0].y)
                if(this.canPlaceCreatureHere(creature, spawnTile))
                    net_addCard({cardId: creature.id, worldX: spawnTile.pixelX, worldY: spawnTile.pixelY})
                else {
                    const tile = this.getEmptyStartTile({dir, creature})
                    if(tile){
                        const spawnTile = this.map.getTileAt(tile.x, dir === Direction.NORTH ? this.northCreatures[0].y : this.southCreatures[0].y)
                        net_addCard({cardId: creature.id, worldX: spawnTile.pixelX, worldY: spawnTile.pixelY})
                    }
                }
            }
            else {
                const tile = this.getEmptyStartTile({dir, creature}) //TODO: prioritize lanes with enemy land
                if(tile){
                    const spawnTile = this.map.getTileAt(tile.x, dir === Direction.NORTH ? this.northCreatures[0].y : this.southCreatures[0].y)
                    net_addCard({cardId: creature.id, worldX: spawnTile.pixelX, worldY: spawnTile.pixelY})
                }
            }
            let p = store.getState().saveFile.currentMatch.players.find(p=>p.id === activePlayerId)
            creature = p.hand.find(c=>getCardData(c).kind === Permanents.Creature && canAfford(p.manaPool,c) && c.id !== creature.id)
            i++
        }
    }

    aiPlayCreatureAbilities = () => {
        //use owned creature abilities if possible
        const state = store.getState().saveFile.currentMatch
        const p = state.players.find(p=>p.id === state.activePlayerId)
        const creatures = state.board.filter(c=>c.ownerId === p.id && !c.tapped && getCardData(c).kind === Permanents.Creature && getCardData(c).ability)
        creatures.forEach(c=>{
            const abil = getCardData(c).ability
            const targets = getValidCreatureTargets(abil, c, '')
            if(targets[0]){
                net_triggerCardAbility({card: c, entityId: targets[0].id, discard:false})
            }
        })
    }

    runAITurn = async () => {
        this.playAILand()
        let state = store.getState().saveFile.currentMatch
        let p = state.players.find(p=>p.id === state.activePlayerId)
        const next = p.deck.cards.shift()
        if(next) p.hand = p.hand.concat(next)
        onUpdatePlayer({...p})
        this.aiPlayCreatureSorcery()
        this.aiPlayNewCreatures()
        this.aiPlayCreatureAbilities()
        //TODO: use player-targeting sorcery
        net_endTurn(store.getState().saveFile.currentMatch)
    }

    getEmptyStartTile (props:{dir:Direction, land?:boolean, creature?:Card}) {
        if(props.land){
            if(props.dir === Direction.NORTH){
                return shuffle(this.northLands).find(t=>this.isEmptyTile(t.x, t.y))
            }
            else {
                return shuffle(this.southLands).find(t=>this.isEmptyTile(t.x, t.y))
            }
        }
        else {
            if(props.dir === Direction.NORTH){
                return shuffle(this.northCreatures).find(t=>this.canPlaceCreatureHere(props.creature, t))
            }
            else {
                return shuffle(this.southCreatures).find(t=>this.canPlaceCreatureHere(props.creature, t))
            }
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
                    if(this.canPlaceCreatureHere(card, t))
                        drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                })
            }
            else this.southCreatures.forEach(t=>{
                    if(this.canPlaceCreatureHere(card, t))
                        drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle)
                })
        }
        else if(dat.kind === Permanents.Enchantment){
            let creatureTiles = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature)
                    .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
            if(dat.ability.targets === Target.CreatureYouControl){
                creatureTiles = state.saveFile.currentMatch.board.filter(c=>c.ownerId === me.id && getCardData(c).kind === Permanents.Creature)
                    .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
            }
            creatureTiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
        }
        else if(dat.kind === Permanents.Sorcery){
            this.showSorceryAbilityTargets(card)
        }
    }

    canPlaceCreatureHere(card:Card, t:Tilemaps.Tile) {
        const creatures = store.getState().saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature)
        if(creatures.find(c=>c.tileX === t.x && c.tileY === t.y)) return false
        if(card.attributes.includes(Modifier.Timid)){
            if(creatures.find(c=>c.tileX === t.x))
                return false
        }
        if(creatures.find(c=>c.tileX === t.x && c.attributes.includes(Modifier.Fearsome))){
            return false
        }
        const laneLands = store.getState().saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Land && c.tileX === t.x)
        if(card.attributes.includes(Modifier.TowerAffinity) && !laneLands.find(l=>l.kind === CardType.Tower)){
            return false
        }
        if(card.attributes.includes(Modifier.CityAffinity) && !laneLands.find(l=>l.kind === CardType.City)){
            return false
        }
        if(card.attributes.includes(Modifier.DesertAffinity) && !laneLands.find(l=>l.kind === CardType.Desert)){
            return false
        }
        if(card.attributes.includes(Modifier.ForestAffinity) && !laneLands.find(l=>l.kind === CardType.Forest)){
            return false
        }
        if(card.attributes.includes(Modifier.SanctuaryAffinity) && !laneLands.find(l=>l.kind === CardType.Temple)){
            return false
        }
        return true
    }

    createSelectIcon = () => {
        this.selectIcon = this.add.image(0, 0, 'selected').setDepth(3).setVisible(false)
    }

    startPreview = (b:Card) => {
        this.creaturePreview = this.add.image(0, 0, 'creatures', getCardData(b).sprite).setAlpha(0.5).setDepth(4)
    }

    enableInputEvents = () => {
        this.input.on('pointermove', (event, gameObjects:Array<Phaser.GameObjects.GameObject>) => {
            if(!store.getState().saveFile.currentMatch) return
            let tile = this.map?.getTileAtWorldXY(this.input.activePointer.worldX, this.input.activePointer.worldY, false, undefined, Layers.Earth)
            if(tile && gameObjects.length > 0){
                const bld = gameObjects[0] as CreatureSprite
                const ctr = bld.getCenter()
                this.selectIcon.setPosition(ctr.x, ctr.y)
                this.selectIcon.setVisible(true)
                if(store.getState().saveFile.currentMatch.players.find(p=>p.id === bld.id)) return
                onInspectCreature(store.getState().saveFile.currentMatch.board.find(c=>c.id ===bld.id))
            }
            else if(tile) {
                if(!this.selectedTile) this.selectedTile = tile
                else if(this.selectedTile.x !== tile.x || this.selectedTile.y !== tile.y){
                    this.selectedTile = tile
                    if(store.getState().inspectCard) onInspectCreature(null)
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

            if(!canAct()) return
            
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
                                else net_triggerCardAbility(props)
                            }
                            return
                        }
                        //card activation from board
                        card = state.saveFile.currentMatch.board.find(c=>c.id === state.selectedCardId)
                        if(card){
                            if(card.attributes.includes(Modifier.Ranged)){
                                const target = this.map.getTileAt(card.tileX, card.tileY+(2*me.dir), false, Layers.Earth)
                                const targetCreature = state.saveFile.currentMatch.board.find(c=>c.tileX === target.x && c.tileY === target.y)
                                if(targetCreature){
                                    const props = {target:targetCreature, attacker:card}
                                    if(networkActive) sendDamageCard(props)
                                    else net_damageCard(props)
                                    onShowAbilityPreview(null)
                                    onSelectCard(null)
                                }
                                return
                            }
                            if(card.attributes.includes(Modifier.BeeSting)){
                                const targetCreature = state.saveFile.currentMatch.board.find(c=>c.id === sprite.id)
                                if(targetCreature.tileX === card.tileX){
                                    const props = {target:targetCreature, attacker:{...card, atk: 1}}
                                    if(networkActive) sendDamageCard(props)
                                    else net_damageCard(props)
                                    onShowAbilityPreview(null)
                                    onSelectCard(null)
                                }
                                return
                            }
                            const props = {card, entityId:sprite.id, discard:false}
                            if(networkActive) sendTriggerCardAbility(props)
                            else net_triggerCardAbility(props) //card on board are not discarded when triggered
                            return
                        }
                        //replacing existing land
                        card = state.saveFile.currentMatch.lands.find(l=>l.id === state.selectedCardId)
                        if(card){
                            if(me.hasPlayedLand) return //land cutoff
                            if(validStartTile(tile, me.dir, true)){
                                const props = {cardId:state.selectedCardId, worldX:tile.pixelX, worldY: tile.pixelY}
                                if(networkActive) sendAddCardEffect(props)
                                else net_addCard(props)
                            }
                            return
                        }
                    }
                    else {
                        //prepare card on board for activation
                        const card = state.saveFile.currentMatch.board.find(c=>c.id === sprite.id)
                        if(card){
                            if(card.tapped) return //tapped cards can't be activated
                            const meta = getCardData(card)
                            if(meta.ability?.effect.addMana && card.ownerId === me.id){
                                if(networkActive) sendLandTappedEffect(card)
                                else net_tapLand(card)
                            }
                            if(meta.ability?.trigger === Triggers.AtWill || 
                                card.attributes.includes(Modifier.Nimble) || 
                                card.attributes.includes(Modifier.Ranged) || 
                                card.attributes.includes(Modifier.BeeSting)){
                                onSelectBoardCard(card)
                                if(card.attributes.includes(Modifier.Nimble)){
                                    const tauntingCreature = state.saveFile.currentMatch.board.find(c=>c.id !== card.id && c.tileX === card.tileX && c.attributes.includes(Modifier.Taunt))
                                    if(tauntingCreature) return onSelectCard(null)
                                    let tiles = []
                                    if(this.isEmptyTile(card.tileX-1, card.tileY))
                                        tiles.push(this.map.getTileAt(card.tileX-1, card.tileY, false, Layers.Earth))
                                    if(this.isEmptyTile(card.tileX+1, card.tileY))
                                        tiles.push(this.map.getTileAt(card.tileX+1, card.tileY, false, Layers.Earth))
                                    tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
                                }
                                else if(card.attributes.includes(Modifier.Ranged)){
                                    let tiles = []
                                    tiles.push(this.map.getTileAt(card.tileX, card.tileY+(2*me.dir), false, Layers.Earth))
                                    tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
                                }
                                else if(card.attributes.includes(Modifier.BeeSting)){
                                    const landCreatures = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && c.tileX === card.tileX)
                                    let tiles = landCreatures.map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
                                    tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
                                }
                                else this.showSorceryAbilityTargets(card)
                            }
                        }
                    }
                }
                else if(GameObjects.length === 0 && state.selectedCardId){
                    //Empty space case, placing creature or land in valid empty space
                    let card = me.hand.find(c=>c.id === state.selectedCardId)
                    if(card){
                        //handle placing CREATURE from hand in open space
                        const d = getCardData(card)
                        if(d.kind !== Permanents.Creature) return //Cannot place other types in open spaces
                        if(!this.canPlaceCreatureHere(card, tile)) return
            
                        if(validStartTile(tile, me.dir, false)){
                            const props = {cardId:state.selectedCardId, worldX:tile.pixelX, worldY: tile.pixelY}
                            if(networkActive) sendAddCardEffect(props)
                            else net_addCard(props)
                        }
                        return
                    }
                    if(!card) card = state.saveFile.currentMatch.lands.find(l=>l.id === state.selectedCardId)
                    if(card){
                        //handle fresh LAND placement case
                        if(me.hasPlayedLand) return //land cutoff
                        if(validStartTile(tile, me.dir, true)){
                            const props = {cardId:state.selectedCardId, worldX:tile.pixelX, worldY: tile.pixelY}
                            if(networkActive) sendAddCardEffect(props)
                            else net_addCard(props)
                        }
                        return
                    }
                    if(!card) card = state.saveFile.currentMatch.board.find(l=>l.id === state.selectedCardId)
                    if(card){
                        const d = getCardData(card)
                        //handle NIMBLE board CREATURE case
                        if(d.kind !== Permanents.Creature) return //Cannot displace other types
                        if(card.attributes.includes(Modifier.Nimble)){
                            if(tile.y===card.tileY && (tile.x === card.tileX-1||tile.x===card.tileX+1)){
                                if(this.isEmptyTile(tile.x, tile.y)){
                                    //If valid target proceed
                                    const props = { card, tileX:tile.x, tileY:tile.y }
                                    if(networkActive) sendMoveCard(props)
                                    else net_moveCard(props)
                                    onShowAbilityPreview(null)
                                    onSelectCard(null)
                                }
                                return
                            }
                        }
                    }
                    if(!card){
                        const owner = state.saveFile.currentMatch.players.find(p=>p.discard.find(c=>c.id === state.selectedCardId))
                        card = owner.discard.find(c=>c.id === state.selectedCardId)
                        if(card){
                            //placing card from GY
                            this.creaturePreview?.destroy()
                            if(!this.canPlaceCreatureHere(card, tile)) return
                            if(validStartTile(tile, me.dir, false)){
                                const props = {cardId:state.selectedCardId, worldX:tile.pixelX, worldY: tile.pixelY, fromGY: true}
                                if(networkActive) sendAddCardEffect(props)
                                else net_addCard(props)
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

    showSorceryAbilityTargets = (boardCard:Card) => {
        const ability = getCardData(boardCard).ability
        onShowAbilityPreview(ability)
        this.g.clear()
        let tiles = []
        const state = store.getState()
        const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId)

        if(ability.targets === Target.CreaturesYourGraveyard || ability.targets === Target.YourGraveyard){
            
            let modalProps:ModalData = { cards: me.discard, chooseType: ability.targets === Target.CreaturesYourGraveyard ? Permanents.Creature : null, targetPlayerId: me.id}
            if(ability.effect.returnToHand) modalProps.keep = 1
            if(ability.effect.returnToBattle) modalProps.play = true
            return onShowModal(Modal.ViewCards, modalProps)
        }

        let lands = state.saveFile.currentMatch.board.filter(l=>getCardData(l).kind === Permanents.Land)
        if(ability.withColor){
            lands = lands.filter(l=>getCardData(l).color === ability.withColor)
        }

        if(ability.targets === Target.Land || ability.targets === Target.AllLands){
            
            tiles = lands.map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
            return tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
        }
        if(ability.targets === Target.LandYouControl){
            tiles = lands.filter(c=>c.ownerId === me.id)
                .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
            return tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
        }
        if(ability.targets === Target.OpponentLand){
            tiles = lands.filter(c=>c.ownerId !== me.id)
                .map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
            return tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
        }
        
        if(ability.targets === Target.Self){
            if(me.dir === Direction.NORTH)
                tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerNorth.x, this.playerNorth.y, false, undefined, Layers.Earth))
            else
                tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerSouth.x, this.playerSouth.y, false, undefined, Layers.Earth))
            return tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
        }

        if(ability.targets === Target.Players || ability.targets === Target.AllPlayers){
            tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerNorth.x, this.playerNorth.y, false, undefined, Layers.Earth))
            tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerSouth.x, this.playerSouth.y, false, undefined, Layers.Earth))
            return tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
        }
        
        let creatures = getValidCreatureTargets(ability, boardCard, boardCard.id)
        tiles = creatures.map(c=>this.map.getTileAt(c.tileX, c.tileY, false, Layers.Earth))
        if(ability.targets === Target.CreatureOrPlayer || ability.targets === Target.AllCreaturesAndPlayers){
            tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerNorth.x, this.playerNorth.y, false, undefined, Layers.Earth))
            tiles = tiles.concat(this.map.getTileAtWorldXY(this.playerSouth.x, this.playerSouth.y, false, undefined, Layers.Earth))
        }
        tiles.forEach(t=>drawMarchingDashedRect(this.g,t.getBounds() as Geom.Rectangle))
    }

    targetAllPlayers(card:Card) {
        const players = store.getState().saveFile.currentMatch.players
        players.forEach(player=>this.applyPlayerEffect(player, card))
    }

    applyMultiLandEffect = (card:Card, lands:Card[]) => {
        lands.forEach(l=>this.applyLandEffect(card, l))
    }

    applyLandEffect = (card:Card, land:Card) => {
        const dat = getCardData(card).ability
        if(dat.effect.transformInto){
            this.tryRemoveCreature(land)
            const t = this.map.getTileAt(land.tileX, land.tileY, false, Layers.Earth)
            const owner = store.getState().saveFile.currentMatch.players.find(p=>p.id === land.ownerId)
            const sprite = getCardData({...land, kind: dat.effect.transformInto}).sprite
            this.creatures.push(new CreatureSprite(this, t.pixelX,t.pixelY, sprite, land.id, owner.dir))
            onUpdateBoard(store.getState().saveFile.currentMatch.board.concat({...land, tapped:true, kind: dat.effect.transformInto, ownerId: land.ownerId, tileX:land.tileX, tileY:land.tileY}))
        }
        if(dat.effect.destroy){
            this.tryRemoveCreature(land)
        }
        if(dat.effect.addAttributes){
            onUpdateBoardCreature({...land, attributes: land.attributes.concat(dat.effect.addAttributes)})
        }
    }

    applySingleTargetCreatureEffect = (props:{creature:Card, sorcery:Card}) => {
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
        
        this.applyCreatureEffect(props.creature, props.sorcery)
        this.hideCardTargets()
    }

    applyMultiCreatureEffect(props:{card:Card, creatures:Card[]}) {
        props.creatures.forEach(creature=>this.applySingleTargetCreatureEffect({creature, sorcery: props.card}))
    }

    applyGlobalEffect(card:Card, creatures:Card[]) {
        const players = store.getState().saveFile.currentMatch.players
        players.forEach(player=>this.applyPlayerEffect(player, card))
        creatures.forEach(creature=>this.applySingleTargetCreatureEffect({creature, sorcery: card}))
    }

    payAndDiscard(card:Card){
        if(!store.getState().repeatCount){
            net_cancelPendingAction()
        }
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
        this.flashIcon(s.x, s.y, IconIndex.Debuff)
        creature.status = creature.status.filter(s=>s.id!==effect.id)
        if(effect.status.atkUp){
            creature.atk-=effect.status.atkUp
        }
        if(effect.status.defUp){
            creature.def-=effect.status.defUp
            creature.def=Math.max(creature.def, getCardData(creature).defaultDef)
        }
        if(effect.status.addAttributes){
            creature.attributes=creature.attributes.filter(a=>!effect.status.addAttributes.includes(a))
        }
        if(effect.status.removeAttribute){
            creature.attributes.push(effect.status.removeAttribute)
        }
        if(effect.status.pacifism){
            creature.tapped = false
        }
        addLogEntry({kind: Log.ExpiredEffect, card:creature, effect})
        onUpdateBoardCreature({...creature})
    }

    applyPlayerEffect(targetPlayer:PlayerState, card:Card) {
        
        const effect = getCardData(card).ability.effect
        let state = store.getState().saveFile
        let caster = state.currentMatch.players.find(p=>p.id === card.ownerId)

        if(effect.discardToDraw){
            onShowModal(Modal.DiscardAndDraw)
            return
        }
        //SOME Modal actions only happen on caster's client
        if(caster.id === state.myId){
            if(effect.discard){
                onShowModal(Modal.ViewCards, {cards: targetPlayer.hand.filter(c=>c.id !== card.id), discard: effect.discard, targetPlayerId:targetPlayer.id})
            }
            if(effect.lookAtTop3){
                onShowModal(Modal.ViewCards, {cards: targetPlayer.deck.cards.slice(0,3), targetPlayerId:targetPlayer.id})
            }
            if(effect.arrangeTop5Remove1){
                onShowModal(Modal.ViewCards, {cards: targetPlayer.deck.cards.slice(0,5), discard: 1, targetPlayerId:targetPlayer.id})
            }
            if(effect.lookAtTop3Choose1){
                onShowModal(Modal.ViewCards, {cards: targetPlayer.deck.cards.slice(0,3), keep: 1, targetPlayerId:targetPlayer.id})
            }
            if(effect.lookAtHand){
                onShowModal(Modal.ViewCards, {cards: targetPlayer.hand, targetPlayerId:targetPlayer.id})
            }
            if(effect.searchSorceryForTop){
                onShowModal(Modal.PickNextCard, {cards: targetPlayer.deck.cards, chooseType: Permanents.Sorcery, targetPlayerId:targetPlayer.id })
            }
            if(effect.searchCardForTop){
                onShowModal(Modal.PickNextCard, {cards: targetPlayer.deck.cards, targetPlayerId:targetPlayer.id })
            }
            if(effect.searchCreatureForTop){
                onShowModal(Modal.PickNextCard, {cards: targetPlayer.deck.cards, chooseType: Permanents.Creature, targetPlayerId:targetPlayer.id })
            }
            if(effect.cardToHandFromGY){
                onShowModal(Modal.ViewGY, {cards: targetPlayer.discard, targetPlayerId:targetPlayer.id})
            }
            if(effect.creatureToHandFromGY){
                onShowModal(Modal.ViewGY, {cards: targetPlayer.discard, chooseType: Permanents.Creature, targetPlayerId:targetPlayer.id})
            }
            if(effect.creatureToHandFromCodex){
                onShowModal(Modal.ViewCards, {cards: targetPlayer.deck.cards, chooseType: Permanents.Creature, keep: 1, targetPlayerId:targetPlayer.id})
            }
            if(effect.sorceryToHandFromGY){
                onShowModal(Modal.ViewGY, {cards: targetPlayer.discard, chooseType: Permanents.Sorcery, targetPlayerId:targetPlayer.id })
            }
        }
        if(effect.drawForTappedOpponent){
            const tapped = state.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && c.tapped && c.ownerId !== targetPlayer.id)
            for(let i=0;i<tapped.length;i++){
                if(caster.deck.cards.length > 0) 
                    caster = {...caster, hand: caster.hand.concat(caster.deck.cards.shift()),deck:caster.deck}
            }
            onUpdatePlayer({...caster})
            return
        }
        if(effect.drawForDeserts){
            const deserts = state.currentMatch.board.filter(c=>c.kind === CardType.Desert)
            for(let i=0;i<deserts.length;i++){
                if(caster.deck.cards.length > 0) 
                    caster = {...caster, hand: caster.hand.concat(caster.deck.cards.shift()),deck:caster.deck}
            }
            onUpdatePlayer({...caster})
            return
        }
        if(effect.casterHpUp){
            caster.hp=Math.min(20,caster.hp+effect.casterHpUp)
            onUpdatePlayer({...caster})
        }
        if(effect.damageReflect){
            targetPlayer.damageReflect=0
         }
 
         if(effect.draw){
             for(let i=0;i<effect.draw;i++){
                 if(targetPlayer.deck.cards.length > 0) 
                     targetPlayer = {...targetPlayer, hand: targetPlayer.hand.concat(targetPlayer.deck.cards.shift()),deck:targetPlayer.deck}
             }
         } 
        if(effect.hp3perBlackCreature){
            const blacks = state.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && getCardData(c).color === Color.Black)
            targetPlayer.hp=Math.min(20,targetPlayer.hp+(blacks.length*3))
        }
        if(effect.playExtraLand){
            targetPlayer.hasPlayedLand = false
        }
        if(effect.discardAllAndDraw){
            const handSize = targetPlayer.hand.length
            targetPlayer.discard = targetPlayer.discard.concat(targetPlayer.hand.filter(c=>card.id !== c.id))
            targetPlayer.hand = targetPlayer.deck.cards.splice(0,handSize)
        }
        if(effect.dmg){
            targetPlayer.hp-=effect.dmg
        }
        if(effect.dmgX){
            const x = getColorlessRemain(caster.manaPool, card)
            targetPlayer.hp-=x
        }
        if(effect.dmgAsDeserts){
            const deserts = state.currentMatch.board.filter(c=>c.kind === CardType.Desert)
            targetPlayer.hp-=deserts.length
        }
        if(effect.hpUp){
            targetPlayer.hp=Math.min(20,targetPlayer.hp+effect.hpUp)
        }
        if(effect.drawX){
            const x = getColorlessRemain(caster.manaPool, card)
            for(let i=0;i<x;i++){
                if(targetPlayer.deck.cards.length > 0) 
                    targetPlayer = {...targetPlayer, hand: targetPlayer.hand.concat(targetPlayer.deck.cards.shift()),deck:targetPlayer.deck}
            }
        }
        if(effect.hpPerLand){
            const forests = state.currentMatch.board.filter(c=>c.kind === effect.hpPerLand)
            targetPlayer.hp=Math.min(20,targetPlayer.hp+(forests.length*effect.hpUp))
        }
        if(effect.hpPerAttacker){
            const enemies = state.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && c.ownerId !== targetPlayer.id)
            targetPlayer.hp=Math.min(20,targetPlayer.hp+enemies.length)
        }
        if(targetPlayer.hp <= 0){
            checkWinConditions(targetPlayer)
            return
        }
        if(effect.addMana){
            targetPlayer.manaPool[effect.addMana]++
        }
        if(effect.drawLandIfLess){
            const mylands = state.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Land && c.ownerId === caster.id).length
            const yourlands = state.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Land && c.ownerId !== caster.id).length
            if(mylands<yourlands) targetPlayer.hasPlayedLand = false
        }
        if(effect.drawIfFewerCards){
            if(caster.hand.length < targetPlayer.hand.length){
                for(let i=0;i<targetPlayer.hand.length-caster.hand.length;i++){
                    if(caster.deck.cards.length > 0) 
                        caster = {...caster, hand: caster.hand.concat(caster.deck.cards.shift()),deck:caster.deck}
                }
                onUpdatePlayer({...caster})
            }
        }
        if(effect.discardAtRandom){
            for(let i=0; i<effect.discardAtRandom;i++){
                if(targetPlayer.hand.length > 0) 
                    targetPlayer.discard.unshift(targetPlayer.hand.splice(Phaser.Math.Between(0,targetPlayer.hand.length-1), 1)[0])
            }
        }
        if(effect.searchForLand){
            const forest = state.currentMatch.lands.find(f=>f.kind === effect.searchForLand)
            if(forest){
                const t = this.getEmptyStartTile({dir: targetPlayer.dir, land:true})
                if(t){
                    this.creatures.push(new CreatureSprite(this, t.pixelX,t.pixelY, getCardData(forest).sprite, forest.id, targetPlayer.dir))
                    onUpdateBoard(state.currentMatch.board.concat({...forest, ownerId: targetPlayer.id, tileX:t.x, tileY:t.y}))
                }
            }
        }
        onUpdatePlayer({...targetPlayer})
    }

    applyCreatureEffect(creature:Card, sorcery:Card) {
        const state = store.getState()
        let activePlayer = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.currentMatch.activePlayerId)
        let caster = state.saveFile.currentMatch.players.find(p=>p.id === sorcery.ownerId)
        const effect = getCardData(sorcery).ability.effect
        
        if(effect.resetMovement){
            const spr = this.creatures.find(c=>c.id === creature.id)
            spr.resetPosition()
            return
        }
        if(caster.id === state.saveFile.myId){
            if(effect.creatureToHandFromCodex){
                onShowModal(Modal.ViewCards, {cards: caster.deck.cards, chooseType: Permanents.Creature, keep: 1, targetPlayerId:caster.id})
            }
        }
        if(effect.emptyGraveyard){
            state.saveFile.currentMatch.players.forEach(p=>{
                if(p.discard.length > 0){
                    onUpdatePlayer({...p, deck: {...p.deck, cards: p.deck.cards.concat(p.discard)}, discard: []})
                }
            })
        }
        if(effect.tauntPlayer){
            //If creature has an enemy creature in lane
            const enemy = state.saveFile.currentMatch.board.find(c=>c.tileX === creature.tileX && creature.ownerId !== c.ownerId)
            if(enemy){
                //Check for adjacent lane with no enemy creature
                const open = [-1,+1].find(i=>{
                    if(this.isEmptyTile(creature.tileX+i, creature.tileY)){
                        return state.saveFile.currentMatch.board.find(c=>c.tileX === creature.tileX+i && creature.ownerId !== c.ownerId)
                    }
                })
                if(open){
                    //If exists, move creature there and tap
                    net_moveCard({card:creature, tileX:creature.tileX+open, tileY:creature.tileY})
                }
                else {
                    //Otherwise, return this creature to owners hand
                    this.creatures.find(c=>c.id === creature.id).returnToHand()
                }
            }
            return
        }

        if(effect.dmgAsCreaturePower){
            creature.def = 0
            let target = state.saveFile.currentMatch.players.find(p=>p.id !== creature.ownerId)
            onUpdatePlayer({...target, hp: target.hp-creature.atk})
        }

        if(effect.returnToHand){
            return this.creatures.find(c=>c.id === creature.id).returnToHand()
        }

        if(effect.hpToOwner){
            let owner = state.saveFile.currentMatch.players.find(p=>p.id === creature.ownerId)
            onUpdatePlayer({...owner, hp: Math.min(20,owner.hp+effect.hpToOwner)})
        }

        if(effect.returnToBattle){
            let owner = state.saveFile.currentMatch.players.find(p=>p.id === creature.ownerId)
            const t = this.getEmptyStartTile({dir:owner.dir, creature})
            if(!t){
                onUpdatePlayer({...owner, discard: owner.discard.filter(c=>c.id !== creature.id), hand: owner.hand.concat(resetCard(creature))})
            }
            else {
                this.creatures.push(new CreatureSprite(this, t.pixelX,t.pixelY, getCardData(creature).sprite, creature.id, owner.dir))
                onUpdateBoard(state.saveFile.currentMatch.board.concat({...resetCard(creature), tileX:t.x, tileY:t.y}))
                onUpdatePlayer({...owner, discard: owner.discard.filter(c=>c.id !== creature.id)})
            }
        }

        if(effect.addAttributes){
            creature.attributes = creature.attributes.concat(effect.addAttributes)
        }
        if(effect.removeAttribute){
            creature.attributes = creature.attributes.filter(a=>a !== effect.removeAttribute)
        }
        if(effect.atkUp){
            creature.atk+=effect.atkUp
        }
        if(effect.defUp){
            creature.def+=effect.defUp
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
        if(effect.dmgAsDeserts){
            const deserts = state.saveFile.currentMatch.board.filter(c=>c.kind === CardType.Desert)
            creature.def-=deserts.length
        }
        if(effect.playerDamage){
            caster.hp-=effect.playerDamage
            onUpdatePlayer(caster)
            const other = state.saveFile.currentMatch.players.find(p=>p.id !== caster.id)
            other.hp-=effect.playerDamage
            onUpdatePlayer(other)
        }
        if(effect.draw){
            for(let i=0;i<effect.draw;i++){
                if(activePlayer.deck.cards.length > 0)
                    activePlayer = {...activePlayer, hand: activePlayer.hand.concat(activePlayer.deck.cards.shift()),deck:activePlayer.deck}
            }
            onUpdatePlayer(activePlayer)
        }
        if(effect.drawX){
            const x = getColorlessRemain(activePlayer.manaPool, creature)
            for(let i=0;i<x;i++){
                if(activePlayer.deck.cards.length > 0)
                    activePlayer = {...activePlayer, hand: activePlayer.hand.concat(activePlayer.deck.cards.shift()),deck:activePlayer.deck}
            }
            onUpdatePlayer(activePlayer)
        }
        if(effect.pacifism){
            creature.tapped = true
        }
        if(effect.tap){
            creature.tapped = true
        }
        if(effect.untap){
            creature.tapped = false
            this.creatures.find(s=>s.id === creature.id).untap()
        }

        if(effect.casterDmg){
            activePlayer.hp-=effect.casterDmg
            onUpdatePlayer(activePlayer)
        }

        if(effect.destroyAllInLane){
            const targets = state.saveFile.currentMatch.board.filter(c=>c.tileX === creature.tileX)
            targets.forEach(t=>this.tryRemoveCreature(t))
            return
        }

        if(creature.def <= 0) 
            this.tryRemoveCreature(creature)
        else onUpdateBoardCreature(creature)
    }

    tryRemoveCreature (card:Card) {
        const state = store.getState()
        if(card.id === state.selectedCardId) onSelectCard(null)
        if(card.id === state.inspectCard?.id) onInspectCreature(null)
        const spr = this.creatures.find(c=>c.id === card.id)
        spr.destroy()
        
        addLogEntry({card, kind: Log.Destroyed })

        const p = state.saveFile.currentMatch.players.find(p=>p.id === card.ownerId)
        //3. death effects
        if(card.attributes.includes(Modifier.Consecrate)){
            p.hp=Math.min(20,p.hp+3)
            if(p.dir === Direction.NORTH){
                this.floatResource(this.playerNorth.x, this.playerNorth.y, IconIndex.Buff)
            }
            else this.floatResource(this.playerSouth.x, this.playerSouth.y, IconIndex.Buff)
        }
        if(card.attributes.includes(Modifier.Undying)){
            spr.returnToHand()
            return
        }
        if(card.attributes.includes(Modifier.SlowReturn)){
            let board = state.saveFile.currentMatch.board
            onUpdateBoard(board.filter(c=>c.id !== card.id))
            onUpdatePlayer({...p, deck: {...p.deck, cards: p.deck.cards.concat(card)}})
            return
        }
        if(card.attributes.includes(Modifier.DementiaCloud)){
            state.saveFile.currentMatch.players.forEach(pp=>{
                pp.discard.unshift(pp.hand.splice(Phaser.Math.Between(0,pp.hand.length-1), 1)[0])
                onUpdatePlayer({...pp})
            })
            onUpdateBoard(store.getState().saveFile.currentMatch.board.filter(c=>c.id !== card.id))
            onUpdatePlayer({...state.saveFile.currentMatch.players.find(p=>p.id === card.ownerId), discard: p.discard.concat(card)})
            return
        }
        
        if(card.kind === CardType.SandElemental){
            const lland = state.saveFile.currentMatch.board.find(c=>c.ownerId !== p.id && c.tileX === card.tileX && getCardData(c).kind === Permanents.Land)
            if(lland){
                this.tryRemoveCreature(lland)
            }
            onUpdateBoard(store.getState().saveFile.currentMatch.board.filter(c=>c.id !== card.id))
            onUpdatePlayer({...state.saveFile.currentMatch.players.find(p=>p.id === card.ownerId), discard: p.discard.concat(card)})
            return
        }


        let board = state.saveFile.currentMatch.board
        onUpdateBoard(board.filter(c=>c.id !== card.id))
        
        const dat = getCardData(card)
        if(dat.kind === Permanents.Land){
            onUpdateLands(state.saveFile.currentMatch.lands.concat(card))
        }
        else {
            onUpdatePlayer({...p, discard: p.discard.concat(card)})
        }
    }

    setCursor = (assetUrl:string) => {
        this.input.setDefaultCursor('url('+assetUrl+'), pointer');
    }

    floatResource = (x:number, y:number, index:IconIndex, text?:string) => {
        let icon = this.add.image(x, y, 'creatures', index).setDepth(4)
        let targets = [icon]
        if(text) {
            let txt = this.add.text(x+7, y-8, text, {...FONT_DEFAULT}).setDepth(4).setStroke('0x000', 2)
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