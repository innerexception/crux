import * as React from 'react'
import { useSelector } from 'react-redux';
import { Color, ColorIcons, IconIndex } from '../../enum';
import { Button, CssIcon, ProgressBar } from '../common/Shared';
import { onQuit, onSave } from '../common/Thunks';
import { colors } from '../styles/AppStyles';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const cpu = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id !== state.saveFile.myId))

    return (
        <div style={{width:'100%', height:'48px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{display:'flex', gap:'5px', fontSize:'28px'}}>
                <CssIcon spriteIndex={IconIndex.Mana}/>
                {Object.keys(me.manaPool).filter(c=>c!==Color.None).map(color=><div><CssIcon spriteIndex={ColorIcons[color]}/>{me.manaPool[color]}</div>)}
            </div>
            <div style={{display:'flex'}}>
                <div style={{display:'flex', alignItems:'center', marginRight:'1em'}}>
                    <CssIcon spriteIndex={me.playerSprite}/>
                    <ProgressBar value={me.hp} max={20} bg={colors.white}/>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <CssIcon spriteIndex={cpu.playerSprite}/>
                    <ProgressBar value={cpu.hp} max={20} bg={colors.white}/>
                </div>
            </div>
        </div>
    )
}