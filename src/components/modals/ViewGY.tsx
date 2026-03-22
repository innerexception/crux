import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { onSelectCard, onShowModal, onUpdatePlayer } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';
import { Button } from '../../common/Shared';
import { sendUpdate } from '../../common/Network';
import { getCardData } from '../../common/CardUtils';

export default () => {
    const data = useSelector((state:RState)=>state.modalData)
    const cards = useSelector((state:RState)=>state.modalData.cards.filter(c=>state.modalData.chooseType ? getCardData(c).kind === state.modalData.chooseType:true))
    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.modalData.targetPlayerId))
    const match = useSelector((state:RState)=>state.saveFile.currentMatch)
    
    const addCardToHand = (c:Card) => {
        onUpdatePlayer({...me, 
            hand: me.hand.concat(c), 
            discard: me.discard.filter(d=>d.id !== c.id)
        })
        if(!match.players.find(p=>p.isAI))
            sendUpdate()

        onShowModal(null)
    }

    const addCardToBoard = (c:Card) => {
        onSelectCard(c)
        onShowModal(null)
    }

    const getHandler = (c:Card) => {
        if(data.keep) return ()=>addCardToHand(c)
        if(data.play) return ()=>addCardToBoard(c)
        return null
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'420px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>CHOOSE</div>
            <div style={{display:'flex', flexWrap:'wrap', marginBottom:'0.5em'}}>
                {cards.map(c=><div onClick={getHandler(c)}><CardView card={c}/></div>)}
            </div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    