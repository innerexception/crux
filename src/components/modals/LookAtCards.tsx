import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { onShowModal, onUpdatePlayer } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';
import { Button } from '../../common/Shared';
import { sendUpdate } from '../../common/Network';

export default () => {
    const data = useSelector((state:RState)=>state.modalData)
    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))

    const addCardToHand = (c:Card) => {
        onUpdatePlayer({...me, 
            hand: me.hand.concat(c), 
            deck: {...me.deck, cards: me.deck.cards.filter(d=>d.id !== c.id)}
        })
        sendUpdate()
        onShowModal(null)
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'420px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>VIEWING {data.choose && "(choose 1)"}</div>
            <div style={{display:'flex', flexWrap:'wrap', marginBottom:'0.5em'}}>
                {data.cards.map(c=><div onClick={data.choose ? ()=>addCardToHand(c):null}><CardView card={c}/></div>)}
            </div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    