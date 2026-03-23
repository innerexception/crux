import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button } from '../../common/Shared';
import { onFinishBattle, onQuit } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';

export default () => {
    
    const ai = useSelector((s:RState)=>s.saveFile.currentMatch.players.find(p=>p.isAI))
    const loot = getLoot(ai)

    return (
        <div style={{...AppStyles.modal, margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>WINNER WINNER</div>
            <div>YOU FOUND:</div>
            <div style={{display:'flex'}}>
                {loot.map(c=><CardView card={c}/>)}
            </div>
            <Button enabled={true} text="Close" handler={ai ? ()=>onFinishBattle(loot):()=>onQuit()}/>
        </div>
    )
}
    