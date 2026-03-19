import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { CssIcon, VerticalProgressBar } from '../common/Shared';
import { colors } from '../styles/AppStyles';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const cpu = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id !== state.saveFile.myId))
    return (
        <div style={{width:'100px', height:'100%', position:'absolute', top:64,left:-74}}>
            <div style={{display:'flex', marginBottom:'30px'}}>
                <CssIcon spriteIndex={me.playerSprite}/>
                <VerticalProgressBar value={me.hp} max={20} bg={colors.white}/>
            </div>
            <div style={{display:'flex'}}>
                <CssIcon spriteIndex={cpu.playerSprite}/>
                <VerticalProgressBar value={cpu.hp} max={20} bg={colors.white}/>
            </div>
        </div>
    )
}