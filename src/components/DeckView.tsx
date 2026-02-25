import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { onSelectCreature, onShowModal, onUpdatePlayer } from '../common/Thunks';
import { canAfford } from '../common/Utils';
import CardView, { getCreatureDetail, renderCost } from './CardView';
import { Button, CssIcon } from '../common/Shared';
import { IconIndex, Modal } from '../../enum';
import { getCardData } from '../common/CardUtils';
import { colors } from '../styles/AppStyles';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const selectedCardId = useSelector((state:RState)=>state.selectedCardId)
    
    const drawNext = () => {
        onUpdatePlayer({...me, 
            drawAllowed: me.drawAllowed-1,
            hand: me.hand.concat(me.deck.cards.shift()), 
            deck:me.deck
        })
    }

    return (
        <div style={{width:'97%', display:'flex', justifyContent:'space-between', position:'absolute', bottom:50, left:10}}>
            <div style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                {me.hand.map(c=>CardPreview(me, c, selectedCardId))}
            </div>
            <div>
                <Button icon={IconIndex.Draw} enabled={me.deck.cards.length>0 && me.drawAllowed > 0} text="Draw" handler={()=>drawNext()}/>
                <Button icon={IconIndex.Draw} enabled={!me.hasPlayedLand} text="Create Land" handler={()=>onShowModal(Modal.ShowLandChoices)}/>
                <Button icon={IconIndex.Graveyard} enabled={me.discard.length>0} text="Graveyard" handler={()=>onShowModal(Modal.Graveyard)}/>
            </div>
        </div>
    )
}
    
const CardPreview = (me:PlayerState, c:Card, selectedCardId:string) => {
    const dat = getCardData(c)
    return <div onClick={canAfford(me.manaPool, c) ? ()=>onSelectCreature(c.id, c):null} 
                style={{backgroundColor:'black',border: selectedCardId === c.id ? '1px solid' : 'none', marginRight:'5px', opacity: canAfford(me.manaPool, c) ? 1 : 0.5}}>
        <div style={{width:'120px', height:'25px', overflow:'hidden', border:'2px inset', fontSize:'16px', borderColor: colors[dat.color], paddingLeft:'5px', borderRadius:'5px'}}>
            <Tooltip overlay={getCreatureDetail(dat, c)}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>{c.kind}</div>
                    <div style={{height:'16px'}}><CssIcon spriteIndex={dat.sprite} noTooltip={true}/></div>
                </div>
            </Tooltip>
        </div>
    </div>
}