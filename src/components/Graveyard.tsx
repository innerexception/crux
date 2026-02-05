import * as React from 'react'
import AppStyles from '../styles/AppStyles';
import { Button } from '../common/Shared';
import { onShowModal } from '../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from './CardView';

export default () => {
    const me = useSelector((state:RState)=>state.currentMatch.players.find(p=>p.id === state.saveFile.myId))

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'380px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>GRAVEYARD</div>
            <div style={{display:'flex', flexWrap:'wrap'}}>{me.discard.map(c=><div><CardView card={c}/></div>)}</div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    