import { createClient, RealtimeChannel } from '@supabase/supabase-js'
import { IconIndex, Layers, NetworkEvent, Permanents, Target } from '../../enum'
import { onRecieveMessage, onRecievePlayer, onSelectBoardCard, onSelectCard, onSetLobby, onShowAbilityPreview, onStartMatch, onTurnProcessing, onUpdateActivePlayer, onUpdateBoard, onUpdateBoardCreature, onUpdateLands, onUpdatePlayer, onUpdateSave } from './Thunks'
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
    let sendRemotePlayer = false
    if(!id) id = Phaser.Math.Between(100,999).toString()
    lobby = supabase.channel('crux_'+id, { config: {broadcast: {ack: true}}})
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
        if(host && !sendRemotePlayer) 
            await sendMessage(NetworkEvent.Join, getMyPlayer())
        sendRemotePlayer = true
    })
    .subscribe()
    onSetLobby(id)
    if(!host)
        await sendMessage(NetworkEvent.Join, getMyPlayer())
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

export const sendAddCardEffect = (props:{cardId:string, worldX:number,worldY:number}) => {
    sendMessage(NetworkEvent.AddCard, props)
}

export const sendMoveCard = (props:{card:Card, tileX:number, tileY:number}) => {
    sendMessage(NetworkEvent.MoveCard, props)
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

export const sendUpdate = () => {
    sendMessage(NetworkEvent.Update, store.getState().saveFile.currentMatch)
}

const sendMessage = async (event:NetworkEvent, data:any) => {
    try{
        const ack = await lobby.httpSend(event, data)
        if(!ack.success){
            debugger
            console.log('message failed to be sent: '+(ack as any).error)
            setTimeout(()=>{sendMessage(event, data)},500)
        }
    }
    catch(e){
        debugger
        console.log('message failed to be sent: '+e)
        setTimeout(()=>{sendMessage(event, data)},500)
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

export const net_moveCard = (props:{card:Card, tileX:number, tileY:number}) => {
    const scene = store.getState().scene
    const tile = scene.map.getTileAt(props.tileX, props.tileY, false, Layers.Earth)
    const spr = scene.creatures.find(c=>c.id === props.card.id)
    spr.setPosition(tile.pixelX, tile.pixelY)
    onUpdateBoardCreature({...props.card, tileX: props.tileX, tileY: props.tileY, tapped: true})
}

export const net_cancelPendingAction= () => {
    const scene = store.getState().scene
    scene.creaturePreview?.destroy()
    scene.g.clear()
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
    net_cancelPendingAction()
    
    const player = state.saveFile.currentMatch.players.find(p=>p.id === props.entityId)
    if(player){
        if(targets === Target.CreaturesOrPlayers || targets === Target.Players){
            scene.applyPlayerEffect(player, props.card)
            onSelectCard(null)
            if(discard) scene.payAndDiscard(card)
            return
        }
        else if(targets === Target.Self && player.id === state.saveFile.currentMatch.activePlayerId){
            scene.applyPlayerEffect(player, props.card)
            onSelectCard(null)
            if(discard) scene.payAndDiscard(card)
            return
        }
        else if(targets === Target.AllPlayers){
            scene.targetAllPlayers(card)
            if(discard) scene.payAndDiscard(card)
            return
        }
        return //invalid player target
    }

    let land = state.saveFile.currentMatch.board.find(c=>getCardData(c).kind === Permanents.Land && c.id === props.entityId)
    if(land){
        if(targets === Target.Lands){
            scene.applyLandEffect(props.card, land)
        }
        if(targets === Target.LandsYouControl){
            scene.applyMultiLandEffect(props.card, state.saveFile.currentMatch.board.filter(l=>getCardData(l).kind === Permanents.Land && l.ownerId === card.ownerId))
        }
        if(targets === Target.OpponentLand){
            scene.applyMultiLandEffect(props.card, state.saveFile.currentMatch.board.filter(l=>getCardData(l).kind === Permanents.Land && l.ownerId !== card.ownerId))
        }
        return //invalid land target
    }
    

    let creatures = getValidCreatureTargets(dat.ability)
    const target = creatures.find(c=>c.id === props.entityId)
    if(!target) return //invalid creature target

    if(targets === Target.CreaturesAndPlayers){
        scene.applyGlobalEffect(card, creatures)
        if(discard) scene.payAndDiscard(card)
        return 
    }
    else if(targets === Target.AllCreatures){
        const props = {creatures, card}
        scene.applyMultiCreatureEffect(props)
        if(discard) scene.payAndDiscard(props.card)
        return 
    }
    else if(targets === Target.AllCreaturesYouControl){
        const props = {creatures: creatures.filter(c=>c.ownerId === card.ownerId), card}
        if(!props.creatures.find(c=>c.id === target.id)) return
        scene.applyMultiCreatureEffect(props)
        if(discard) scene.payAndDiscard(props.card) 
        return 
    }
    else if(targets === Target.AllOpponentCreatures){
        const props = {creatures: creatures.filter(c=>c.ownerId !== card.ownerId), card}
        if(!props.creatures.find(c=>c.id === target.id)) return
        scene.applyMultiCreatureEffect(props)
        if(discard) scene.payAndDiscard(props.card) 
        return 
    }
    else if(targets === Target.TappedCreatures){
        const props = {creatures: creatures.filter(c=>c.tapped), card}
        if(!props.creatures.find(c=>c.id === target.id)) return
        scene.applyMultiCreatureEffect(props)
        if(discard) scene.payAndDiscard(props.card)
        return 
    }
    else if(targets === Target.CreaturesInLane){
        const props = {creatures: creatures.filter(c=>c.tileX === card.tileX), card}
        if(!props.creatures.find(c=>c.id === target.id)) return
        scene.applyMultiCreatureEffect(props)
        if(discard) scene.payAndDiscard(props.card)
        return 
    }
    
    if(validSingleTarget(props.entityId, card)){ 
        //All single targets
        const props = {creature: creatures.find(c=>c.id === target.id), sorcery:card}
        if(!props.creature) return
        scene.applySingleTargetCreatureEffect(props)
        if(discard) scene.payAndDiscard(card)
        return
    }
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

    //reset player resources
    match.board.forEach(c=>{
        if(c.ownerId === current.id){
            if(!c.status.find(s=>s.status.pacifism)){
                scene.creatures.find(s=>c.id === s.id).untap()
                c.tapped = false
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

    //set next player
    const nextPlayer = match.players.find(p=>p.id !== current.id)
    onUpdateActivePlayer(nextPlayer.id)
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
    scene.floatResource(sprite.x, sprite.y, IconIndex.Mana, '#ff0000')
    //TODO add exausted icon to card
}

export const net_addCard = (props:{cardId:string, worldX:number,worldY:number}) => {
    const scene = store.getState().scene
    scene.creaturePreview?.destroy()
    onSelectCard(null)
    let state = store.getState().saveFile
    const me = state.currentMatch.players.find(p=>p.id === state.currentMatch.activePlayerId)
    let card = me.hand.find(c=>c.id === props.cardId)
    if(!card) card = state.currentMatch.lands.find(l=>l.id === props.cardId)
    const data = getCardData(card)
    if(data.kind === Permanents.Land) me.hasPlayedLand = true
    scene.creatures.push(new CreatureSprite(scene, props.worldX,props.worldY, data.sprite, card.id, me.dir))
    const t = scene.map.getTileAtWorldXY(props.worldX,props.worldY,false, undefined, Layers.Earth)
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
            onSelectBoardCard(card)
            scene.showSorceryAbilityTargets(data.ability)
        }
    }
}


