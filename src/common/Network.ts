import { createClient, RealtimeChannel } from '@supabase/supabase-js'
import { NetworkEvent } from '../../enum'
import { onRecieveMessage, onRecievePlayer, onSetLobby, onStartMatch, onUpdateLands, onUpdateSave } from './Thunks'
import { store } from '../..'
import { emptyMana } from './Utils'
import{ v4 } from 'uuid'

const supabase = createClient('https://tcuyfzebridkroyzfobz.supabase.co', 'sb_publishable_ygcDc5PEiCwv9e5Tr0T96w_Nyu54ZsB')
let lobby:RealtimeChannel = null

export const createOrJoinLobby = async (id?:string) => {
    if(lobby){
        lobby.unsubscribe()
    }
    const host = id ? false : true
    let sendRemotePlayer = false
    if(!id) id = Phaser.Math.Between(100,999).toString()
    lobby = supabase.channel('crux_'+id)
    lobby.on('broadcast' as any, { event: NetworkEvent.MoveCard }, (data)=>store.getState().scene.net_moveCard(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.CancelAction }, ()=>store.getState().scene.net_cancelPendingAction())
    lobby.on('broadcast' as any, { event: NetworkEvent.TriggerAbility }, (data)=>store.getState().scene.net_triggerCardAbility(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.LandDeck }, (data)=>onUpdateLands(data.payload.lands))
    lobby.on('broadcast' as any, { event: NetworkEvent.TapLand }, (data)=>store.getState().scene.net_tapLand(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.AddCard }, (data)=>store.getState().scene.net_addCard(data.payload))
    lobby.on('broadcast' as any, { event: NetworkEvent.EndTurn }, (data)=>store.getState().scene.net_endTurn(data.payload))
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

const sendMessage = async (event:NetworkEvent, data:any) => {
    await lobby.httpSend(event, data)
}

const getMyPlayer = ():PlayerState => {
    const myId = v4()
    const s = store.getState().saveFile
    const theDeck = s.decks.find(d=>d.id === s.currentDeckId)
    const deck:Deck = {
        id:v4(),
        name: theDeck.name,
        cards: Array.from(theDeck.cards)
    }
    const hand = deck.cards.splice(0,5)
    onUpdateSave({...s, myId})
    return {
        id:myId,
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


