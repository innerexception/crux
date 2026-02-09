import * as React from 'react'
import { Button } from '../common/Shared';
import { onQuit, onStartMatch, onUpdateSave } from '../common/Thunks';
import { tryLoadFile, trySaveFile } from '../common/Utils';
import AppStyles from '../styles/AppStyles';
import{ v4 } from 'uuid'
import { useSelector } from 'react-redux';
import Deckbuilder from './Deckbuilder';
import { defaultCards } from '../common/CardUtils';

export default () => {

    const saveFile = useSelector((s:RState)=>s.saveFile)

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

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto', border:'none'}}>
            <h3 style={{textAlign:'center', marginBottom:'0.5em'}}>MENAGERIE</h3>
            <Deckbuilder/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <div style={{marginBottom:'0.5em'}}>
                    <Button text="New" enabled={true} handler={()=>{resetSave()}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div style={{marginBottom:'0.5em'}}>
                    <Button text="Continue" enabled={saveFile?true:false} handler={()=>{trySaveFile(JSON.stringify(saveFile));onStartMatch()}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
                <div style={{marginBottom:'0.5em'}}>
                    <Button enabled={true} text="Quit" handler={onQuit} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
            </div>
        </div>
    )
}
    