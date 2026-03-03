import * as React from 'react'
import { Button, CssIcon } from '../common/Shared';
import { onQuit, onShowModal, onStartMatch, onUpdateSave } from '../common/Thunks';
import { getAIPlayer, tryLoadFile, trySaveFile } from '../common/Utils';
import AppStyles from '../styles/AppStyles';
import{ v4 } from 'uuid'
import { useSelector } from 'react-redux';
import { defaultCards } from '../common/CardUtils';
import { CreatureSpriteIndex, Direction, Modal, PlayerAvatars } from '../../enum';

export default () => {

    const saveFile = useSelector((s:RState)=>s.saveFile)
    const [selectedAvatarI, setSelectedAvatarI] = React.useState(0)

    const setPlayerAvatar = (i:number) => {
        setSelectedAvatarI(i)
        onUpdateSave({...saveFile, playerSprite: PlayerAvatars[i]})
    }

    const resetSave = () => {
        const myId=v4()
        const newDeckId = v4()
        const newSave:SaveFile = {
            myId,
            name:'new player',
            playerSprite: CreatureSpriteIndex.Player1, 
            currentDeckId:newDeckId,
            decks:[{id:newDeckId, name: 'new codex', cards:[]}], 
            cards: defaultCards(myId), 
            currentMatch:null
        }
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
            <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
                <div style={{display:'flex', marginRight:'1em'}}>
                    <Button enabled={selectedAvatarI > 0} text={'<'} handler={()=>setPlayerAvatar(selectedAvatarI-1)}/>
                    <CssIcon spriteIndex={saveFile.playerSprite} noTooltip={true}/>
                    <Button enabled={selectedAvatarI < PlayerAvatars.length-1} text={'>'} handler={()=>setPlayerAvatar(selectedAvatarI+1)}/>
                </div>
                {saveFile.decks.map((d,i)=><div style={{display:'flex', padding:'5px', alignItems:'center', border:'1px white', borderStyle: d.id === saveFile.currentDeckId ? 'solid' : 'dashed'}}>
                    <div style={{marginRight:'5px'}}>Codex {i}</div>
                    <Button enabled={d.id !== saveFile.currentDeckId} text="Select" handler={()=>onUpdateSave({...saveFile, currentDeckId: d.id})}/>
                    <Button enabled={true} text="Edit" handler={()=>{onUpdateSave({...saveFile, currentDeckId: d.id});onShowModal(Modal.Deckbuilder)}}/>
                </div>)}
                
            </div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Button text="Editor" enabled={true} handler={()=>{onShowModal(Modal.Deckbuilder)}} style={{border:'1px solid white', padding:'5px'}}/>
                <div>
                    <Button text="Vs CPU" enabled={saveFile.currentDeckId?true:false} handler={()=>onStartMatch(saveFile, getAIPlayer(), saveFile.myId)} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div>
                    <Button text="Vs Hum" enabled={saveFile.currentDeckId?true:false} handler={()=>onShowModal(Modal.Lobby)} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div>
                    <Button text="Reset" enabled={true} handler={()=>{resetSave()}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div>
                    <Button enabled={true} text="Quit" handler={onQuit} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
            </div>
        </div>
    )
}
    