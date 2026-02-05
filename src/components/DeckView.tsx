import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { onSelectCreature, onShowModal, onUpdatePlayer } from '../common/Thunks';
import { canAfford } from '../common/Utils';
import CardView from './CardView';
import { Button } from '../common/Shared';
import { Modal } from '../../enum';

export default () => {

    const me = useSelector((state:RState)=>state.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const selectedCardId = useSelector((state:RState)=>state.selectedCardId)
 
    const drawNext = () => {
        onUpdatePlayer({...me, 
            hand: me.hand.concat(me.deck.cards.shift()), 
            deck:me.deck
        })
    }

    return (
        <div style={{width:'100%', height:'85px', display:'flex', justifyContent:'space-between'}}>
            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                {me.hand.map(c=>
                <div onClick={canAfford(me.manaPool, c) ? ()=>onSelectCreature(c.id, c.kind):null} style={{border: selectedCardId === c.id ? '1px solid' : 'none', marginRight:'5px', opacity: canAfford(me.manaPool, c) ? 1 : 0.5}}>
                    <CardView card={c}/>
                </div>)}
            </div>
            <div>
                <Button enabled={me.deck.cards.length>0} text="Draw" handler={()=>drawNext()}/>
            </div>
            <div>
                <Button enabled={me.discard.length>0} text="Graveyard" handler={()=>onShowModal(Modal.Graveyard)}/>
            </div>
        </div>
    )
}