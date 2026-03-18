import { createClient, RealtimeChannel } from '@supabase/supabase-js'
import { IconIndex, Layers, Modifier, NetworkEvent, Permanents, Target } from '../../enum'
import { onRecieveMessage, onRecievePlayer, onSelectBoardCard, onSelectCard, onSetActionAcknowledge, onSetLobby, onSetRepeatingCardAbility, onShowAbilityPreview, onStartMatch, onTurnProcessing, onUpdateActivePlayer, onUpdateBoard, onUpdateBoardCreature, onUpdateLands, onUpdatePlayer, onUpdateSave } from './Thunks'
import { store } from '../..'
import { emptyMana, payCost } from './Utils'
import{ v4 } from 'uuid'
import { getCardData, getValidCreatureTargets, tapLand, validSingleTarget } from './CardUtils'
import CreatureSprite from '../components/sprites/CreatureSprite'

const supabase = createClient('https://tcuyfzebridkroyzfobz.supabase.co', 'sb_publishable_ygcDc5PEiCwv9e5Tr0T96w_Nyu54ZsB')
let lobby:RealtimeChannel = null

export const createOrJoinLobby = async (id?:string) => {
    if(lobby){
        lobby.unsubscribe()
    }
    const host = id ? false : true
    if(!id) id = Phaser.Math.Between(100,999).toString()
    lobby = supabase.channel('crux_'+id, { config: {broadcast: {ack: true}}})
    lobby.on('broadcast' as any, { event: NetworkEvent.DamageCard }, (data)=>net_damageCard(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.MoveCard }, (data)=>net_moveCard(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.CancelAction }, ()=>net_cancelPendingAction())
    lobby.on('broadcast' as any, { event: NetworkEvent.TriggerAbility }, (data)=>net_triggerCardAbility(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.LandDeck }, (data)=>onUpdateLands(data.payload.lands))
    lobby.on('broadcast' as any, { event: NetworkEvent.TapLand }, (data)=>net_tapLand(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.AddCard }, (data)=>net_addCard(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.EndTurn }, (data)=>net_endTurn(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.Update }, (data)=>onRecieveMessage(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.Start }, ()=>onStartMatch(store.getState().saveFile, store.getState().joinedPlayer, host ? store.getState().saveFile.myId : store.getState().joinedPlayer.id))
    lobby.on('broadcast' as any, { event: NetworkEvent.Join }, async (data)=>{
        const player = data.payload as PlayerState
        if(player.id !== store.getState().saveFile.myId){
            onRecievePlayer(data.payload)
        }
    })
    .subscribe()
    onSetLobby(id)
}

export const sendJoin = () => {
    lobby?.httpSend(NetworkEvent.Join, getMyPlayer())
}

export const sendLandDeck = (lands:Card[]) => {
    sendMessage(NetworkEvent.LandDeck, {lands})
}

export const sendStartMatch = async () => {
    await sendMessage(NetworkEvent.Start, {})
}

export const sendEndTurn = (match:MatchState) => {
    sendMessage(NetworkEvent.EndTurn, match)
    onTurnProcessing(true)
}

export const sendAddCardEffect = (props:{cardId:string, worldX:number,worldY:number, fromGY?:boolean}) => {
    sendMessage(NetworkEvent.AddCard, props)
}

export const sendMoveCard = (props:{card:Card, tileX:number, tileY:number}) => {
    sendMessage(NetworkEvent.MoveCard, props)
}

export const sendDamageCard = (props:{target:Card, attacker:Card}) => {
    sendMessage(NetworkEvent.DamageCard, props)
}

export const sendCancelAction = () => {
    sendMessage(NetworkEvent.CancelAction, {})
}

export const sendLandTappedEffect = (land:Card) => {
    sendMessage(NetworkEvent.TapLand, land)
}

export const sendTriggerCardAbility = (props:{card:Card, entityId:string, discard:boolean}) => {
    sendMessage(NetworkEvent.TriggerAbility, props)
}

export const sendUpdate = (refresh?:boolean) => {
    sendMessage(NetworkEvent.Update, {match: store.getState().saveFile.currentMatch, refresh})
}

const sendMessage = async (event:NetworkEvent, data:any) => {
    try{
        onSetActionAcknowledge(false)
        const ack = await lobby.httpSend(event, data)
        if(!ack.success){
            debugger
            console.log('message failed to be sent: '+(ack as any).error)
            setTimeout(()=>{sendMessage(event, data)},1000)
        }
        else {
            onSetActionAcknowledge(true)
        }
    }
    catch(e){
        debugger
        console.log('message failed to be sent: '+e)
        setTimeout(()=>{sendMessage(event, data)},1000)
    }
}

const getMyPlayer = ():PlayerState => {
    const s = store.getState().saveFile
    const theDeck = s.decks.find(d=>d.id === s.currentDeckId)
    const deck:Deck = {
        id:v4(),
        name: theDeck.name,
        cards: Array.from(theDeck.cards)
    }
    const hand = deck.cards.splice(0,5)
    return {
        id:s.myId,
        hp:20,
        dir:null,
        hand,
        deck,
        discard: [],
        manaPool:{...emptyMana},
        isAI: false,
        hasPlayedLand: false,
        drawAllowed: 1,
        playerSprite: s.playerSprite
    }
}

export const net_damageCard = (props:{target:Card, attacker:Card}) => {
    props.target.def -= props.attacker.atk
    const scene = store.getState().scene
    const spr = scene.creatures.find(c=>c.id === props.target.id)
    scene.floatResource(spr.x, spr.y, IconIndex.Sword)
    onUpdateBoardCreature({...props.attacker, tapped: true})
    if(props.target.def<=0){
        scene.tryRemoveCreature(props.target)
    }
    else onUpdateBoardCreature({...props.target})
}

export const net_moveCard = (props:{card:Card, tileX:number, tileY:number}) => {
    const scene = store.getState().scene
    const tile = scene.map.getTileAt(props.tileX, props.tileY, false, Layers.Earth)
    const spr = scene.creatures.find(c=>c.id === props.card.id)
    spr.setPosition(tile.pixelX, tile.pixelY)
    spr.icon?.destroy()
    let attributes = getLaneAttributes(props.card, props.tileX)
    onUpdateBoardCreature({...props.card, attributes, tileX: props.tileX, tileY: props.tileY, tapped: true})
}

export const getLaneAttributes = (card:Card, tileX:number) => {
    const board = store.getState().saveFile.currentMatch.board
    const stingingWinds = board.find(c=>c.attributes.includes(Modifier.StingingWinds) && c.tileX === tileX && c.ownerId === card.ownerId)
    const previousStingingWinds = board.find(c=>c.attributes.includes(Modifier.StingingWinds) && c.tileX === card.tileX && c.ownerId === card.ownerId)
    if(stingingWinds && !card.attributes.includes(Modifier.Haste)){
        card.attributes.push(Modifier.Haste)
    }
    else if(previousStingingWinds && !getCardData(card).defaultAttributes.includes(Modifier.Haste)){
        card.attributes = card.attributes.filter(a=>a!==Modifier.Haste)
    }
    return card.attributes
}

export const net_cancelPendingAction= () => {
    const scene = store.getState().scene
    scene.creaturePreview?.destroy()
    scene.g.clear()
    if(store.getState().repeatCount){
        //If cancelled mid-cast, lose remaining casts
        const state = store.getState().saveFile.currentMatch
        const player = state.players.find(p=>p.id === state.activePlayerId)
        scene.payAndDiscard(player.hand.find(c=>c.id === store.getState().selectedCardId))
    }
    onShowAbilityPreview(null)
    onSelectCard(null)
}

export const net_triggerCardAbility = (props:{card:Card, entityId:string, discard:boolean}) => {
    const scene = store.getState().scene
    const state = store.getState()
    const card = props.card
    const discard = props.discard
    const dat = getCardData(card)
    const targets = dat.ability.targets
    
    let creatures = getValidCreatureTargets(dat.ability, card)
    
    if(targets === Target.AllCreaturesAndPlayers){
        scene.applyGlobalEffect(card, creatures)
        if(discard) scene.payAndDiscard(card)
        return 
    }

    if(dat.ability.effect.repeat){
        if(state.repeatCount==null){
            onSetRepeatingCardAbility(dat.ability.effect.repeat-1)
            state.scene.showSorceryAbilityTargets(dat.ability, card)
        }
        else if(state.repeatCount > 1){
            onSetRepeatingCardAbility(state.repeatCount-1)
            state.scene.showSorceryAbilityTargets(dat.ability, card)
        }
        else{
            if(discard) scene.payAndDiscard(props.card)
            onSetRepeatingCardAbility(null)
            net_cancelPendingAction()
        }
    }

    const player = state.saveFile.currentMatch.players.find(p=>p.id === props.entityId)
    if(player){
        if(targets === Target.CreaturesOrPlayers || targets === Target.Players){
            scene.applyPlayerEffect(player, card)
        }
        else if(targets === Target.Self && player.id === state.saveFile.currentMatch.activePlayerId){
            scene.applyPlayerEffect(player, props.card)
        }
        else if(targets === Target.AllPlayers){
            scene.targetAllPlayers(card)
        }
    }

    let lands = getValidLandTargets(dat.ability, card)
    const land = lands.find(c=>c.id === props.entityId)
    if(land){
        if(targets === Target.Lands || dat.ability.maxOfOne){
            scene.applyLandEffect(props.card, land)
        }
        else scene.applyMultiLandEffect(props.card, lands)
    }
    
    const creature = creatures.find(c=>c.id === props.entityId)
    if(creature) {
        if(targets === Target.AllCreatures || targets === Target.CreaturesInLane || targets === Target.TappedCreatures || 
            targets === Target.AllOpponentCreatures || targets === Target.AllCreaturesYouControl || Target.AllOtherCreatures){
            scene.applyMultiCreatureEffect({creatures: dat.ability.maxOfOne ? [creature]:creatures, card})
        }
        else if(validSingleTarget(props.entityId, card)){ 
            //All single targets
            scene.applySingleTargetCreatureEffect({creature: creature, sorcery:card})
        }
    }

    if(!dat.ability.effect.repeat && (player||land||creature)){
        if(discard) scene.payAndDiscard(props.card)
        net_cancelPendingAction()
    }
}

const getValidLandTargets = (ability:CardAbility, card:Card) => {

    let lands = store.getState().saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Land)

    if(ability.withColor){
        lands = lands.filter(l=>getCardData(l).color === ability.withColor)
    }
    if(ability.targets === Target.LandsYouControl){
        lands = lands.filter(l=>l.ownerId === card.ownerId)
    }
    if(ability.targets === Target.OpponentLand){
        lands = lands.filter(l=>l.ownerId !== card.ownerId)
    }
    
    return lands
}

export const net_endTurn = async (match:MatchState) => {
    const scene = store.getState().scene
    const current = match.players.find(p=>p.id === match.activePlayerId)
    
    //1. move creatures / resolve combats
    const mine = scene.creatures.filter(c=>match.board.find(cr=>cr.id===c.id && cr.ownerId === current.id))
    for(let i=0;i<mine.length;i++){
        await mine[i].tryMoveNext()
    }
    match = store.getState().saveFile.currentMatch

    //set next player
    const nextPlayer = match.players.find(p=>p.id !== current.id)
    onUpdateActivePlayer(nextPlayer.id)
    
    //reset player resources
    match.board.forEach(c=>{
        if(c.ownerId === nextPlayer.id){
            if(!c.status.find(s=>s.status.pacifism)){
                scene.creatures.find(s=>c.id === s.id).untap()
                c.tapped = false
                c.def = Math.max(c.def, getCardData(c).defaultDef)
            }
            //add/remove timed status effects
            c.status.forEach(s=>s.duration--)
            c.status.forEach(s=>{
                if(s.duration <= 0){
                    scene.expireEffect(c, s)
                }
            })
        }
    })
    onUpdateBoard(Array.from(match.board))

    onTurnProcessing(false)
    onUpdatePlayer({...nextPlayer,
        drawAllowed:1,
        hasPlayedLand:false,
        manaPool:{...emptyMana}
    })

    if(nextPlayer.isAI){
        scene.runAITurn()
    }
}

export const net_tapLand = (card:Card) => {
    //tap and add to pool
    const scene = store.getState().scene
    const me = store.getState().saveFile.currentMatch.players.find(p=>p.id === card.ownerId)
    tapLand(card, me)
    const sprite = scene.creatures.find(c=>c.id === card.id)
    scene.floatResource(sprite.x, sprite.y, IconIndex.Mana)
    //TODO add exausted icon to card
}

export const net_addCard = (props:{cardId:string, worldX:number,worldY:number, fromGY?:boolean}) => {
    const scene = store.getState().scene
    scene.creaturePreview?.destroy()
    onSelectCard(null)
    let state = store.getState().saveFile
    const me = state.currentMatch.players.find(p=>p.id === state.currentMatch.activePlayerId)
    let card = me.hand.find(c=>c.id === props.cardId)
    if(props.fromGY) card = me.discard.find(c=>c.id === props.cardId)
    if(!card) card = state.currentMatch.lands.find(l=>l.id === props.cardId)
    const data = getCardData(card)
    const t = scene.map.getTileAtWorldXY(props.worldX,props.worldY,false, undefined, Layers.Earth)
    if(data.kind === Permanents.Land){
        me.hasPlayedLand = true
        //see if we are replacing a land
        const existing = state.currentMatch.board.find(c=>c.tileX === t.x && c.tileY === t.y)
        if(existing){
            scene.tryRemoveCreature(existing)
            state = store.getState().saveFile
        }
        if(card.attributes.includes(Modifier.StingingWinds)){
            const laneCreatures = state.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && c.tileX === t.x && c.ownerId === card.ownerId)
            laneCreatures.forEach(c=>{
                onUpdateBoardCreature({...c, attributes: getLaneAttributes(card, t.x)})
            })
            state = store.getState().saveFile
        }
    } 
    scene.creatures.push(new CreatureSprite(scene, props.worldX,props.worldY, data.sprite, card.id, me.dir))
    card = {...card, ownerId: me.id, tileX:t.x, tileY:t.y, attributes: getLaneAttributes(card, t.x)}
    onUpdateBoard(state.currentMatch.board.concat(card))
    if(props.fromGY){
        onUpdatePlayer({...me, 
            discard: me.discard.filter(c=>c.id !== props.cardId)
        })
    }
    else {
        onUpdatePlayer({...me, 
            hand: me.hand.filter(c=>c.id !== props.cardId), 
            manaPool: payCost(me.manaPool, data.cost)
        })
    }
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
            onSelectBoardCard(card)
            scene.showSorceryAbilityTargets(data.ability, card)
        }
    }
}


