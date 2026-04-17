import * as React from 'react'
import { useSelector } from 'react-redux';
import { Button } from '../common/Shared';
import { onSave, onShowModal, onUpdateSave } from '../common/Thunks';
import AppStyles from '../styles/AppStyles';
import CardView from './CardView';
import { Color } from '../../enum';
import { getCardData } from '../common/CardUtils';
import Tooltip from 'rc-tooltip';
import CardDetailView from './CardDetailView';

export default () => {
    
    const me = useSelector((s:RState)=>s.saveFile)
    const selectedDeck = useSelector((s:RState)=>s.saveFile.campaignDeck)
    const [selectedColor, setSelectedColor] = React.useState(Color.Blue)
    const cards = useSelector((s:RState)=>s.saveFile.cards)

    const addCardToDeck = (c:Card) => {
        onUpdateSave({...me, campaignDeck: selectedDeck.concat(c)})
    }

    const removeCardFromDeck = (c:Card) => {
        onUpdateSave({...me, campaignDeck: selectedDeck.filter(cc=>cc.id !== c.id)})
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'auto', border:'none'}}>
            <div>PREPARE CODEX</div>
            <div style={{display:'flex', flexWrap:'wrap', height:'200px', overflow:'auto', border:'1px solid', padding:'5px'}}>
                {selectedDeck.map(c=><Tooltip placement='bottom' mouseEnterDelay={0.5} overlay={<CardDetailView card={c}/>}><div onClick={()=>removeCardFromDeck(c)}><CardView card={c}/></div></Tooltip>)}
            </div>
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
                    {cards.filter(c=>getCardData(c.kind).color === selectedColor && !selectedDeck.find(cc=>cc.id===c.id))
                        .map(c=><div onClick={()=>addCardToDeck(c)}><Tooltip placement='bottom' mouseEnterDelay={0.5} overlay={<CardDetailView card={c}/>}><div><CardView card={c}/></div></Tooltip></div>)}
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <div>
                    <Button text="Done" enabled={true} handler={()=>{onSave();onShowModal(null)}} style={{border:'1px solid white', padding:'5px'}}/>
                </div>
            </div>
        </div>
    )
}