import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { onShowModal } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';
import { Button } from '../../common/Shared';

export default (props:{number:number}) => {
    const cards = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.modalData.targetPlayer.id).deck.cards.slice(0,props.number))
    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'420px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>VIEW CODEX</div>
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {cards.map(c=><div><CardView card={c}/></div>)}
            </div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    