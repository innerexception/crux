import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { onShowModal, onUpdatePlayer } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';
import { Button } from '../../common/Shared';
import { getCardData } from '../../common/CardUtils';
import { sendUpdate } from '../../common/Network';

export default () => {
    const cards = useSelector((state:RState)=>state.modalData.cards.filter(c=>state.modalData.chooseType ? getCardData(c.kind).kind === state.modalData.chooseType:true))
    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const match = useSelector((state:RState)=>state.saveFile.currentMatch)
    
    const moveToTop = (c:Card) => {
        let cardz = me.deck.cards.filter(c=>c.id !== c.id)
        cardz.unshift(c)
        onUpdatePlayer({...me, deck: {...me.deck, cards: cardz}})
        if(!match.players.find(p=>p.isAI))
            sendUpdate()

        onShowModal(null)
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'420px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>CHOOSE NEXT</div>
            <div style={{display:'flex', flexWrap:'wrap', marginBottom:'0.5em'}}>
                {cards.map(c=><div onClick={()=>moveToTop(c)}><CardView card={c}/></div>)}
            </div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    