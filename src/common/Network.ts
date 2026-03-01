import { createClient, RealtimeChannel } from '@supabase/supabase-js'
import { store } from '../..'
import { EventType } from '../../enum'
import { onRecieveMessage, onUpdateSave } from './Thunks'

const supabase = createClient('https://tcuyfzebridkroyzfobz.supabase.co', 'sb_publishable_ygcDc5PEiCwv9e5Tr0T96w_Nyu54ZsB')
let lobby:RealtimeChannel = null

export const createOrJoinLobby = (id?:string) => {
    if(lobby){
        lobby.unsubscribe()
    }
    if(!id) id = Phaser.Math.Between(1000,9999).toString()
    lobby = supabase.channel('crux_'+id)
    lobby.on('broadcast' as any, { event: EventType.Endturn }, (data:MatchState)=>onRecieveMessage(data)).subscribe()
    const state = store.getState().saveFile
    onUpdateSave({...state, currentMatch: {...state.currentMatch, lobbyId: id}})
}

export const sendMessage = (event:EventType, data:MatchState) => {
    lobby.send({
        type: 'broadcast',
        event,
        payload: data
    })
}

