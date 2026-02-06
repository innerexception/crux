import * as React from 'react'
import { useSelector } from 'react-redux';
import { Button } from '../common/Shared';
import { onUpdateSave } from '../common/Thunks';
import AppStyles from '../styles/AppStyles';
import CardView from './CardView';
import{ v4 } from 'uuid'

export default () => {
    
    const me = useSelector((s:RState)=>s.saveFile)
    const selectedDeck = useSelector((s:RState)=>s.saveFile?.decks.find(d=>d.id === s.saveFile.currentDeckId))

    const addCardToDeck = (c:Card) => {
        onUpdateSave({...me, decks: me.decks.map(d=>d.id === selectedDeck.id ? 
            {...selectedDeck, 
                cards: selectedDeck.cards.concat({...c, id:v4()})} : d)})
    }

    const removeCardFromDeck = (c:Card) => {
        onUpdateSave({...me, decks: me.decks.map(d=>d.id === selectedDeck.id ? 
            {...selectedDeck, 
                cards: selectedDeck.cards.filter(cc=>cc.id !== c.id)} : d)})
    }

    if(!me) return <span/>

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto'}}>
            <div style={{display:'flex'}}>
                {me.decks.map((d,i)=><div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginRight:'5px'}}>Set {i}</div>
                    <Button enabled={true} text="Select" handler={()=>onUpdateSave({...me, currentDeckId: d.id})}/>
                </div>)}
                <Button style={{marginLeft:'1em'}} text="Add New Set+" enabled={true} handler={()=>onUpdateSave({...me, decks: me.decks.concat({id:v4(), name:'new set', cards: []})})} />
            </div>
            <div>{selectedDeck ? 'Editing Set':''}</div>
            {selectedDeck && <div style={{display:'flex', flexWrap:'wrap', height:'200px', overflow:'auto', border:'1px solid', padding:'5px'}}>
                {selectedDeck.cards.length === 0 && <div style={{width:'100%', textAlign:'center'}}>--No Cards--</div>}
                {selectedDeck.cards.map(c=><div onClick={()=>removeCardFromDeck(c)}><CardView card={c}/></div>)}
            </div>}
            {selectedDeck &&
            <div>
                <div style={{marginTop:'1em'}}>All Workings</div>
                <div style={{display:'flex', flexWrap:'wrap', height:'200px', overflow:'auto', border:'1px solid', padding:'5px'}}>
                    {me.cards.map(c=><div onClick={()=>addCardToDeck(c)}><CardView card={c}/></div>)}
                </div>
            </div>}
        </div>
    )
}