import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { IconIndex, Modal } from '../../enum';
import { Button, CreatureIcon, CssIcon, ProgressBar } from '../common/Shared';
import { onEndTurn, onShowModal } from '../common/Thunks';
import { colors } from '../styles/AppStyles';

export default () => {

    const me = useSelector((state:RState)=>state.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    return (
        <div style={{width:'100%', height:'32px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{display:'flex'}}>
                <CssIcon spriteIndex={IconIndex.Mana}/>
                {Object.keys(me.manaPool).map(color=><div style={{color}}>{me.manaPool[color]}</div>)}
            </div>
            <div style={{display:'flex', flexWrap:'wrap', width:'400px', justifyContent:'flex-end', alignItems:'center'}}>
                <Button enabled={true} style={{marginRight:'25px'}}  text="End Turn" icon={IconIndex.Quit} handler={()=>onEndTurn()}/>
                <Button enabled={true} style={{marginRight:'25px'}}  text="Option" icon={IconIndex.Options} handler={()=>onShowModal(Modal.Options)}/>
                <Button enabled={true} text="Exit" icon={IconIndex.Close} handler={()=>onShowModal(Modal.NewGame)}/>
            </div>
        </div>
    )
}