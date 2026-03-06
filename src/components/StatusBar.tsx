import * as React from 'react'
import { useSelector } from 'react-redux';
import { IconIndex } from '../../enum';
import { Button, CssIcon } from '../common/Shared';
import { onSave } from '../common/Thunks';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    
    return (
        <div style={{width:'100%', height:'48px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{display:'flex', gap:'5px', fontSize:'28px'}}>
                <CssIcon spriteIndex={IconIndex.Mana}/>
                {Object.keys(me.manaPool).map(color=><div style={{color}}>{me.manaPool[color]}</div>)}
            </div>
            <div style={{display:'flex', flexWrap:'wrap', width:'400px', justifyContent:'flex-end', alignItems:'center'}}>
                <Button enabled={true} text="Save & Exit" icon={IconIndex.Options} handler={()=>onSave()}/>
            </div>
        </div>
    )
}