import * as React from 'react'
import { Button, CssIcon } from '../common/Shared';
import { onShowModal, onStartMatch } from '../common/Thunks';
import AppStyles from '../styles/AppStyles';
import { useSelector } from 'react-redux';
import { createOrJoinLobby } from '../common/Network';
import { Modal } from '../../enum';

export default () => {
    const saveFile = useSelector((s:RState)=>s.saveFile)
    const lobbyId = useSelector((s:RState)=>s.lobbyId)
    const opponent = useSelector((s:RState)=>s.joinedPlayer)
    const [joinLobbyId, setLobbyId] = React.useState('')

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto', border:'none'}}>
            <h3 style={{textAlign:'center', marginBottom:'0.5em'}}>MENAGERIE</h3>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                {!lobbyId &&
                <div style={{marginTop:'0.5em', display:'flex'}}>
                    <input placeholder='Join Lobby' value={joinLobbyId} onChange={(e)=>setLobbyId(e.currentTarget.value)} />
                </div>}
                
                {opponent && <div style={{display:'flex', alignItems:'center', marginRight:'1em'}}><CssIcon noTooltip={true} spriteIndex={opponent.playerSprite}/> joined</div>}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    {!lobbyId &&<Button enabled={joinLobbyId.length === 4} handler={()=>createOrJoinLobby(joinLobbyId)} text="Join" style={{border:'1px solid white', padding:'5px'}}/>}
                    {lobbyId ? 
                    <div style={{marginRight:'1em', display:'flex', alignItems:'center'}}>Session ID: {lobbyId}</div> : 
                    <Button enabled={true} handler={()=>createOrJoinLobby()} style={{border:'1px solid white', padding:'5px'}} text="Host"/>}
                    <Button text="Begin" enabled={opponent?true:false} handler={()=>{onStartMatch(saveFile, opponent)}} style={{border:'1px solid white', padding:'5px'}}/>
                    <Button text="Cancel" enabled={true} handler={()=>onShowModal(Modal.NewGame)} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
            </div>
        </div>
    )
}
    