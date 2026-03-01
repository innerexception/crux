import * as React from 'react'
import { Button, CssIcon } from '../common/Shared';
import { onQuit, onStartMatch, onUpdateSave } from '../common/Thunks';
import { getAIPlayer, tryLoadFile, trySaveFile } from '../common/Utils';
import AppStyles from '../styles/AppStyles';
import{ v4 } from 'uuid'
import { useSelector } from 'react-redux';
import Deckbuilder from './Deckbuilder';
import { defaultCards } from '../common/CardUtils';
import { createOrJoinLobby } from '../common/Network';
import { Direction } from '../../enum';

export default () => {

    const saveFile = useSelector((s:RState)=>s.saveFile)
    const lobbyId = useSelector((s:RState)=>s.lobbyId)
    const [joinLobbyId, setLobbyId] = React.useState('')

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
    const opponent = saveFile.currentMatch.players?.find(p=>p.id !== saveFile.myId)

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto', border:'none'}}>
            <h3 style={{textAlign:'center', marginBottom:'0.5em'}}>MENAGERIE</h3>
            <Deckbuilder/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                {!lobbyId &&
                <div style={{marginTop:'0.5em'}}>
                    <input placeholder='Join Lobby' value={lobbyId} onChange={(e)=>setLobbyId(e.currentTarget.value)} />
                    <Button enabled={lobbyId.length === 4} handler={()=>createOrJoinLobby(joinLobbyId)} text="Join"/>
                </div>}
                {lobbyId ? 
                    <div style={{marginRight:'1em', display:'flex', alignItems:'center'}}>Session ID: {lobbyId}</div> : 
                    <Button enabled={true} handler={()=>createOrJoinLobby()} style={{border:'1px solid white', padding:'5px'}} text="Host"/>}
                {opponent && <div><CssIcon spriteIndex={opponent.sprite}/> joined</div>}
                <div>
                    <Button text="Reset" enabled={true} handler={()=>{resetSave()}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div>
                    <Button text="Continue" enabled={saveFile.currentDeckId?true:false} handler={()=>{onStartMatch(saveFile, joinedPlayer || getAIPlayer(Direction.NORTH))}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div>
                    <Button enabled={true} text="Quit" handler={onQuit} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
            </div>
        </div>
    )
}
    