import { createClient, RealtimeChannel } from '@supabase/supabase-js'
import { CreatureSpriteIndex, Direction, EventType } from '../../enum'
import { onRecieveMessage, onRecievePlayer, onSetLobby } from './Thunks'
import { store } from '../..'
import { emptyMana } from './Utils'
import{ v4 } from 'uuid'

const supabase = createClient('https://tcuyfzebridkroyzfobz.supabase.co', 'sb_publishable_ygcDc5PEiCwv9e5Tr0T96w_Nyu54ZsB')
let lobby:RealtimeChannel = null

export const createOrJoinLobby = (id?:string) => {
    if(lobby){
        lobby.unsubscribe()
    }
    const host = id ? false : true
    if(!id) id = Phaser.Math.Between(1000,9999).toString()
    lobby = supabase.channel('crux_'+id)
    lobby.on('broadcast' as any, { event: EventType.Endturn }, (data:MatchState)=>onRecieveMessage(data))
    lobby.on('broadcast' as any, { event: EventType.Join }, (data:PlayerState)=>onRecievePlayer(data, host))
        .subscribe()
    onSetLobby(id)
    if(!host)
        sendMessage(EventType.Join, getMyPlayer(Direction.NORTH))
}

export const getMyPlayer = (dir:Direction) => {
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
        dir,
        hand,
        deck,
        discard: [],
        manaPool:{...emptyMana},
        isAI: false,
        hasPlayedLand: false,
        drawAllowed: 1,
        sprite: CreatureSpriteIndex.Player1
    }
}

export const sendMessage = (event:EventType, data:any) => {
    lobby.send({
        type: 'broadcast',
        event,
        payload: data
    })
}

