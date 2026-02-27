import * as React from 'react'
import AppStyles from '../styles/AppStyles';
import { onSelectCreature, onShowModal } from '../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from './CardView';

export default () => {
    const lands = useSelector((state:RState)=>state.saveFile.currentMatch.lands)

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'380px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>LANDS</div>
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {lands.slice(0,3).map(c=><div onClick={()=>{onSelectCreature(c.id, c); onShowModal(null)}}><CardView card={c}/></div>)}
            </div>
        </div>
    )
}
    