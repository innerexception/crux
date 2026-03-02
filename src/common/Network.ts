import { createClient, RealtimeChannel } from '@supabase/supabase-js'
import { Direction, EventType } from '../../enum'
import { onRecieveMessage, onRecievePlayer, onSetLobby, onStartMatch, onUpdateSave } from './Thunks'
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
    if(!id) id = Phaser.Math.Between(1000,9999).toString()
    lobby = supabase.channel('crux_'+id)
    lobby.on('broadcast' as any, { event: EventType.Endturn }, (data)=>onRecieveMessage(data.payload))
    lobby.on('broadcast' as any, { event: EventType.Start }, ()=>onStartMatch(store.getState().saveFile, store.getState().joinedPlayer))
    lobby.on('broadcast' as any, { event: EventType.Join }, async (data)=>{
        const player = data.payload as PlayerState
        if(player.id !== store.getState().saveFile.myId){
            onRecievePlayer(data.payload)
        }
        if(host && !sendRemotePlayer) 
            await sendMessage(EventType.Join, getMyPlayer())
        sendRemotePlayer = true
    })
    .subscribe()
    onSetLobby(id)
    if(!host)
        await sendMessage(EventType.Join, getMyPlayer())
}

export const sendStartMatch = async () => {
    await sendMessage(EventType.Start, {})
}

export const getMyPlayer = ():PlayerState => {
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

export const sendMessage = async (event:EventType, data:any) => {
    await lobby.httpSend(event, data)
}

