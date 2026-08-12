import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button } from '../../common/Shared';
import { onQuit, onSave, onShowModal, onUpdateSave } from '../../common/Thunks';
import { Color, Modal } from '../../../enum';
import Tooltip from 'rc-tooltip';
import CardDetailView from '../CardDetailView';
import CardView from '../CardView';
import { getCardData, getDraftCards } from '../../common/CardUtils';
import { useSelector } from '../../common/store';

export default () => {
    const [selectedColor, setSelectedColor] = React.useState('')
    const me = useSelector((s:RState)=>s.saveFile)
    const selectedDeck = useSelector((s:RState)=>s.saveFile.campaignDeck)
    const [cards, setCards] = React.useState([])

    React.useEffect(()=>{
        setCards(getDraftCards(me.myId, 5))
    },[])
    
    const addCardToDeck = (c:Card) => {
        onUpdateSave({...me, campaignDeck: selectedDeck.concat(c)})
    }
    
    const removeCardFromDeck = (c:Card) => {
        onUpdateSave({...me, campaignDeck: selectedDeck.filter(cc=>cc.id !== c.id)})
    }

    return (
        <div style={{...AppStyles.modal, width:'600px', margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>BWAHAHA! WELCOME CREATURE!</div>
            <div>Welcome, creature from a far off realm, you have been sampled for today's tournament!</div>
            <div>To return, defeat the other specmines displayed here. You best prepare yourself!</div>
            <div>
                <div style={{display:'flex', flexWrap:'wrap', height:'200px', overflow:'auto', border:'1px solid', padding:'5px'}}>
                    {selectedDeck.length === 0 && <div>Add spells from below</div>}
                    {selectedDeck.map(c=><Tooltip placement='bottom' mouseEnterDelay={0.5} overlay={<CardDetailView card={c}/>}><div onClick={()=>removeCardFromDeck(c)}><CardView card={c}/></div></Tooltip>)}
                </div>
                <div>
                    <div style={{marginTop:'1em'}}>All Workings</div>
                    <div style={{display:'flex'}}>
                        <Button enabled={selectedColor?true:false} text="All" handler={()=>setSelectedColor('')}/>
                        <Button enabled={selectedColor!==Color.Red} text="Red" handler={()=>setSelectedColor(Color.Red)}/>
                        <Button enabled={selectedColor!==Color.Green} text="Green" handler={()=>setSelectedColor(Color.Green)}/>
                        <Button enabled={selectedColor!==Color.Blue} text="Blue" handler={()=>setSelectedColor(Color.Blue)}/>
                        <Button enabled={selectedColor!==Color.White} text="White" handler={()=>setSelectedColor(Color.White)}/>
                        <Button enabled={selectedColor!==Color.Black} text="Black" handler={()=>setSelectedColor(Color.Black)}/>
                    </div>
                    <div style={{display:'flex', flexWrap:'wrap', height:'200px', overflow:'auto', border:'1px solid', padding:'5px'}}>
                        {cards.filter(c=>(selectedColor ? getCardData(c.kind).color === selectedColor : true) && !selectedDeck.find(cc=>cc.id===c.id))
                            .map(c=><div onClick={()=>addCardToDeck(c)}><Tooltip placement='bottom' mouseEnterDelay={1} overlay={<CardDetailView card={c}/>}><div><CardView card={c}/></div></Tooltip></div>)}
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <div>
                        <Button text="Done" enabled={selectedDeck.length>=40} handler={()=>{onSave();onShowModal(null)}} style={{border:'1px solid white', padding:'5px'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}