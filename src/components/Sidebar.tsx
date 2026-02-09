import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { VerticalProgressBar } from '../common/Shared';
import { colors } from '../styles/AppStyles';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const cpu = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id !== state.saveFile.myId))
    return (
        <div style={{width:'100px', height:'100%', position:'absolute', top:64,left:-64}}>
            <div style={{display:'flex', marginBottom:'30px'}}>
                <div style={{width:'10px', marginRight:'10px', wordWrap:'break-word'}}>Player</div>
                <VerticalProgressBar value={me.hp} max={20} bg={colors.white}/>
            </div>
            <div style={{display:'flex'}}>
                <div style={{width:'10px', marginRight:'10px',wordWrap:'break-word'}}>CPU</div>
                <VerticalProgressBar value={cpu.hp} max={20} bg={colors.white}/>
            </div>
        </div>
    )
}