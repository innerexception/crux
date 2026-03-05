import * as React from 'react'
import { Button, CssIcon } from '../../common/Shared';
import { onSetLobby, onShowModal } from '../../common/Thunks';
import AppStyles from '../../styles/AppStyles';
import { useSelector } from 'react-redux';
import { createOrJoinLobby, sendStartMatch } from '../../common/Network';
import { Modal } from '../../../enum';

export default () => {
    const saveFile = useSelector((s:RState)=>s.saveFile)
    const lobbyId = useSelector((s:RState)=>s.lobbyId)
    const joinedPlayer = useSelector((s:RState)=>s.joinedPlayer)
    const [joinLobbyId, setLobbyId] = React.useState('')
    const [hosting, setIsHost] = React.useState(false)

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto', border:'none'}}>
            <h3 style={{textAlign:'center', marginBottom:'0.5em'}}>MENAGERIE</h3>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <div style={{display:'flex', alignItems:'center', marginRight:'1em'}}><CssIcon noTooltip={true} spriteIndex={saveFile.playerSprite}/> me {hosting&&'*'}</div>
                {joinedPlayer ? <div style={{display:'flex', alignItems:'center', marginRight:'1em'}}><CssIcon noTooltip={true} spriteIndex={joinedPlayer.playerSprite}/> visitor {!hosting&&'*'}</div> : <div>waiting...</div>}
            </div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                {!lobbyId &&
                <div style={{marginTop:'0.5em', display:'flex'}}>
                    <input placeholder='Join Lobby' value={joinLobbyId} onChange={(e)=>setLobbyId(e.currentTarget.value)} />
                </div>}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    {!lobbyId &&<Button enabled={joinLobbyId.length === 3} handler={()=>createOrJoinLobby(joinLobbyId)} text="Join" style={{border:'1px solid white', padding:'5px'}}/>}
                    {lobbyId ? 
                    <div style={{marginRight:'1em', display:'flex', alignItems:'center'}}>Session ID: {lobbyId}</div> : 
                    <Button enabled={true} handler={()=>{createOrJoinLobby(); setIsHost(true)}} style={{border:'1px solid white', padding:'5px'}} text="Host"/>}
                    <Button text="Begin" enabled={joinedPlayer && hosting} handler={()=>sendStartMatch()} style={{border:'1px solid white', padding:'5px'}}/>
                    <Button text="Cancel" enabled={true} handler={()=>{onSetLobby('');onShowModal(Modal.NewGame)}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
            </div>
        </div>
    )
}
    