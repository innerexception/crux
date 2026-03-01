import * as React from 'react'
import { Button } from '../common/Shared';
import { onQuit, onStartMatch, onUpdateSave } from '../common/Thunks';
import { tryLoadFile, trySaveFile } from '../common/Utils';
import AppStyles from '../styles/AppStyles';
import{ v4 } from 'uuid'
import { useSelector } from 'react-redux';
import Deckbuilder from './Deckbuilder';
import { defaultCards } from '../common/CardUtils';
import { createOrJoinLobby } from '../common/Network';

export default () => {

    const saveFile = useSelector((s:RState)=>s.saveFile)
    const [lobbyId, setLobbyId] = React.useState('')

    const resetSave = () => {
        const myId=v4()
        const newSave:SaveFile = {myId,name:'new player',currentDeckId:'',decks:[{id:v4(), name: 'new set', cards:[]}], cards: defaultCards(myId), currentMatch:null}
        trySaveFile(JSON.stringify(newSave))
        onUpdateSave(newSave)
    }

    React.useEffect(()=>{
        const getSave = async ()=>{
            let save = await tryLoadFile()
            if(save) onUpdateSave(save)
            else resetSave()
        }
        getSave()
    },[])

    if(!saveFile) return <span/>

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto', border:'none'}}>
            <h3 style={{textAlign:'center', marginBottom:'0.5em'}}>MENAGERIE</h3>
            <Deckbuilder/>

            <div style={{marginTop:'1em'}}>
                {saveFile.currentMatch.lobbyId ? 
                    <div>Session ID: {saveFile.currentMatch.lobbyId}</div> : 
                    <Button enabled={true} handler={()=>createOrJoinLobby()} text="Host"/>}
                {!saveFile.currentMatch.lobbyId &&
                <div style={{marginTop:'0.5em'}}>
                    <input placeholder='Join Lobby' value={lobbyId} onChange={(e)=>setLobbyId(e.currentTarget.value)} />
                    <Button enabled={lobbyId.length === 4} handler={()=>createOrJoinLobby(lobbyId)} text="Join"/>
                </div>}
            </div>

            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <div style={{marginBottom:'0.5em'}}>
                    <Button text="New" enabled={true} handler={()=>{resetSave()}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div style={{marginBottom:'0.5em'}}>
                    <Button text="Continue" enabled={saveFile.currentDeckId?true:false} handler={()=>{onStartMatch(saveFile)}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div style={{marginBottom:'0.5em'}}>
                    <Button enabled={true} text="Quit" handler={onQuit} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
            </div>
        </div>
    )
}
    