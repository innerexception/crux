import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button } from '../../common/Shared';
import { onFinishBattle, onQuit } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';

export default () => {
    
    const loot = useSelector((s:RState)=>s.modalData.cards)
    
    return (
        <div style={{...AppStyles.modal, margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>WINNER WINNER</div>
            <div>YOU FOUND:</div>
            <div style={{display:'flex'}}>
                {loot.map(c=><CardView card={c}/>)}
            </div>
            <Button enabled={true} text="Close" handler={loot ? ()=>onFinishBattle(loot):()=>onQuit(false)}/>
        </div>
    )
}
    