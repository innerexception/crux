import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { IconIndex, Modal } from '../../enum';
import { Button, CssIcon } from '../common/Shared';
import { onEndTurn, onSave, onShowModal } from '../common/Thunks';
import { colors } from '../styles/AppStyles';
import { SAVE_NAMES } from '../common/UIReducer';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    return (
        <div style={{width:'100%', height:'48px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{display:'flex', gap:'5px', fontSize:'28px'}}>
                <CssIcon spriteIndex={IconIndex.Mana}/>
                {Object.keys(me.manaPool).map(color=><div style={{color}}>{me.manaPool[color]}</div>)}
            </div>
            <div style={{display:'flex', flexWrap:'wrap', width:'400px', justifyContent:'flex-end', alignItems:'center'}}>
                <Button enabled={true} style={{marginRight:'25px'}}  text="End Turn" icon={IconIndex.Quit} handler={()=>onEndTurn()}/>
                <Button enabled={true} text="Exit" icon={IconIndex.Options} handler={()=>onSave(SAVE_NAMES[0])}/>
            </div>
        </div>
    )
}