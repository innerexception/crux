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
            <Button text="Add+" enabled={true} handler={()=>onUpdateSave({...me, decks: me.decks.concat({id:v4(), name:'new set', cards: []})})} />
            {me.decks.map((d,i)=><div style={{display:'flex'}}>
                <div style={{marginRight:'5px'}}>Set {i}</div>
                <Button enabled={true} text="Select" handler={()=>onUpdateSave({...me, currentDeckId: d.id})}/>
            </div>)}
            <div>{selectedDeck ? 'Edit Set':''}</div>
            {selectedDeck && selectedDeck.cards.length === 0 && <div>--No Cards--</div>}
            {selectedDeck && <div style={{display:'flex', flexWrap:'wrap'}}>
                {selectedDeck.cards.map(c=><div onClick={()=>removeCardFromDeck(c)}><CardView card={c}/></div>)}
            </div>}
            {selectedDeck &&
            <div>
                <div>All Workings</div>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                    {me.cards.map(c=><div onClick={()=>addCardToDeck(c)}><CardView card={c}/></div>)}
                </div>
            </div>}
        </div>
    )
}