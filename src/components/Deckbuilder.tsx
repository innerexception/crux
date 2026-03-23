import * as React from 'react'
import { useSelector } from 'react-redux';
import { Button } from '../common/Shared';
import { onSave, onShowModal, onUpdateSave } from '../common/Thunks';
import AppStyles from '../styles/AppStyles';
import CardView from './CardView';
import{ v4 } from 'uuid'
import { Color, Modal, Permanents } from '../../enum';
import { getAllCards, getCardData } from '../common/CardUtils';
import Tooltip from 'rc-tooltip';
import CardDetailView from './CardDetailView';

export default () => {
    
    const me = useSelector((s:RState)=>s.saveFile)
    const selectedDeck = useSelector((s:RState)=>s.saveFile.decks.find(d=>d.id === s.saveFile.currentDeckId))
    const [selectedColor, setSelectedColor] = React.useState(Color.Red)
    const [cards, setCards] = React.useState(getAllCards(me.myId))

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

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto', border:'none'}}>
            <div style={{display:'flex',gap:'5px'}}>
                {me.decks.map((d,i)=><div style={{display:'flex', padding:'5px', alignItems:'center', border:'1px white', borderStyle: d.id === selectedDeck.id ? 'solid' : 'dashed'}}>
                    <div style={{marginRight:'5px'}}>Set {i}</div>
                    <Button enabled={d.id !== selectedDeck.id} text="Select" handler={()=>onUpdateSave({...me, currentDeckId: d.id})}/>
                </div>)}
                <Button style={{marginLeft:'1em'}} text="Add New+" enabled={true} handler={()=>onUpdateSave({...me, decks: me.decks.concat({id:v4(), name:'new set', cards: []})})} />
            </div>
            <div style={{marginTop:'1em'}}>{selectedDeck ? 'Editing Set':''}</div>
            {selectedDeck && <div style={{display:'flex', flexWrap:'wrap', height:'200px', overflow:'auto', border:'1px solid', padding:'5px'}}>
                {selectedDeck.cards.length === 0 && <div style={{width:'100%', textAlign:'center'}}>--No Cards--</div>}
                {selectedDeck.cards.map(c=><div onClick={()=>removeCardFromDeck(c)}><CardView card={c}/></div>)}
            </div>}
            {selectedDeck &&
            <div>
                <div style={{marginTop:'1em'}}>All Workings</div>
                <div style={{display:'flex'}}>
                    <Button enabled={selectedColor!==Color.Red} text="Red" handler={()=>setSelectedColor(Color.Red)}/>
                    <Button enabled={selectedColor!==Color.Green} text="Green" handler={()=>setSelectedColor(Color.Green)}/>
                    <Button enabled={selectedColor!==Color.Blue} text="Blue" handler={()=>setSelectedColor(Color.Blue)}/>
                    <Button enabled={selectedColor!==Color.White} text="White" handler={()=>setSelectedColor(Color.White)}/>
                    <Button enabled={selectedColor!==Color.Black} text="Black" handler={()=>setSelectedColor(Color.Black)}/>
                    <Button enabled={selectedColor!==Color.None} text="None" handler={()=>setSelectedColor(Color.None)}/>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', height:'200px', overflow:'auto', border:'1px solid', padding:'5px'}}>
                    {cards.filter(c=>getCardData(c).color === selectedColor && getCardData(c).kind !== Permanents.Land && selectedDeck.cards.filter(cc=>c.kind === cc.kind).length<3)
                        .map(c=><div onClick={()=>addCardToDeck(c)}><Tooltip placement='bottom' mouseEnterDelay={0.5} overlay={<CardDetailView card={c}/>}><div><CardView card={c}/></div></Tooltip></div>)}
                </div>
            </div>}
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <div>
                    <Button text="Done" enabled={true} handler={()=>{onSave();onShowModal(Modal.NewGame)}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
            </div>
        </div>
    )
}