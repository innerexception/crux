import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { onSelectCreature, onShowModal } from '../common/Thunks';
import { canAfford } from '../common/Utils';
import CardView from './CardView';

export default () => {

    const me = useSelector((state:RState)=>state.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const selectedCardId = useSelector((state:RState)=>state.selectedCardId)
 
    return (
        <div style={{width:'100%', height:'85px', display:'flex', justifyContent:'space-between'}}>
            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                {me.hand.map(c=>
                <div onClick={()=>onSelectCreature(c.id, c.kind)} style={{border: selectedCardId === c.id ? '1px solid' : 'none', marginRight:'5px', opacity: canAfford(me.manaPool, c) ? 1 : 0.5}}>
                    <CardView card={c}/>
                </div>)}
            </div>
        </div>
    )
}