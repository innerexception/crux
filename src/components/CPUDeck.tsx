import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { useSelector } from 'react-redux';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id !== state.saveFile.myId))

    return (
        <div style={{width:'97%', display:'flex', justifyContent:'space-between', position:'absolute', top:60, left:10}}>
            <div style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                {me.hand.map(c=>CardPreview())}
            </div>
        </div>
    )
}
    
const CardPreview = () => {
    //const dat = getCardData(c.kind)
    return <div style={{backgroundColor:'black',border:'none', marginRight:'5px', opacity: 0.5}}>
        <div style={{width:'120px', height:'25px', overflow:'hidden', border:'2px inset', fontSize:'16px', paddingLeft:'5px', borderRadius:'5px'}}></div>
    </div>
}