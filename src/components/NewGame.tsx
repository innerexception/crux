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

    React.useEffect(()=>{
        const getSave = async ()=>{
            let save = await tryLoadFile()
            if(save) onUpdateSave(save)
            else{
                const myId=v4()
                const newSave:SaveFile = {myId,name:'new player',currentDeckId:'',decks:[{id:v4(), name: 'new set', cards:[]}], cards: defaultCards(myId)}
                trySaveFile(JSON.stringify(newSave))
                onUpdateSave(newSave)
            } 
        }
        getSave()
    },[])

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto'}}>
            <h3 style={{textAlign:'center', marginBottom:'0.5em'}}>MENAGERIE</h3>
            <Deckbuilder/>
            <div style={{marginBottom:'0.5em'}}>
                <Button text="Continue" enabled={saveFile?true:false} handler={()=>{trySaveFile(JSON.stringify(saveFile));onStartMatch()}} style={{border:'1px solid white', padding:'5px'}}/>
            </div>
            <div style={{marginBottom:'0.5em'}}>
                <Button enabled={true} text="Quit" handler={onQuit} style={{border:'1px solid white', padding:'5px'}}/>
            </div>
        </div>
    )
}
    