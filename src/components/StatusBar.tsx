import * as React from 'react'
import { useSelector } from 'react-redux';
import { Color, ColorIcons, IconIndex } from '../../enum';
import { Button, CssIcon } from '../common/Shared';
import { onQuit, onSave } from '../common/Thunks';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    
    return (
        <div style={{width:'100%', height:'48px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{display:'flex', gap:'5px', fontSize:'28px'}}>
                <CssIcon spriteIndex={IconIndex.Mana}/>
                {Object.keys(me.manaPool).filter(c=>c!==Color.None).map(color=><div><CssIcon spriteIndex={ColorIcons[color]}/>{me.manaPool[color]}</div>)}
            </div>
            <div style={{display:'flex', flexWrap:'wrap', width:'400px', justifyContent:'flex-end', alignItems:'center'}}>
                <Button enabled={true} text="Exit" icon={IconIndex.Options} handler={()=>onQuit()}/>
            </div>
        </div>
    )
}