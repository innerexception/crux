import * as React from 'react'
import { useSelector } from 'react-redux';
import { onCancelAction, onEndTurn, onSelectCard, onShowModal, onUpdatePlayer, onInspectCreature } from '../common/Thunks';
import { canAfford } from '../common/Utils';
import { Button, CssIcon } from '../common/Shared';
import { IconIndex, Modal, Permanents } from '../../enum';
import { getCardData } from '../common/CardUtils';
import { colors } from '../styles/AppStyles';
import { sendUpdate } from '../common/Network';

export default () => {

    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const myTurn = useSelector((state:RState)=>state.saveFile.currentMatch.activePlayerId === state.saveFile.myId && !state.turnProcessing)
    const selectedCardId = useSelector((state:RState)=>state.selectedCardId)
    const activeAbility = useSelector((state:RState)=>state.previewAbility)
    const match = useSelector((state:RState)=>state.saveFile.currentMatch)

    const canCancel = () => {
        if(!myTurn) return false
        if(!selectedCardId) return false
        if(activeAbility?.required) return false
        return true
    }

    const drawNext = () => {
        onUpdatePlayer({...me, 
            drawAllowed: me.drawAllowed-1,
            hand: me.hand.concat(me.deck.cards.shift()), 
            deck:me.deck
        })
        if(!match.players.find(p=>p.isAI))
            sendUpdate()
    }

    return (
        <div style={{width:'97%', justifyContent:'space-between', position:'absolute', bottom:10, left:10}}>
            <div style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                {me.hand.map(c=>CardPreview(me, c, selectedCardId))}
            </div>
            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
                <Button icon={IconIndex.Cancel} enabled={canCancel()} text="Cancel" handler={()=>onCancelAction()}/>
                <Button icon={IconIndex.Draw} enabled={myTurn && me.deck.cards.length>0 && me.drawAllowed > 0} text="Draw" handler={()=>drawNext()}/>
                <Button icon={IconIndex.CreateLand} enabled={myTurn && (!me.hasPlayedLand)} text="Create Land" handler={()=>onShowModal(Modal.ShowLandChoices)}/>
                <Button icon={IconIndex.Graveyard} enabled={myTurn && me.discard.length>0} text="Graveyard" handler={()=>onShowModal(Modal.ViewCards, {cards: me.discard, targetPlayerId: me.id})}/>
                <Button enabled={myTurn} text="End Turn" icon={IconIndex.Quit} handler={()=>onEndTurn(match)}/>
            </div>
        </div>
    )
}
    
const CardPreview = (me:PlayerState, c:Card, selectedCardId:string) => {
    const dat = getCardData(c)
    return <div onClick={canAfford(me.manaPool, c) ? ()=>onSelectCard(c):null} 
                style={{backgroundColor:'black',border: selectedCardId === c.id ? '1px solid' : 'none', marginRight:'5px', opacity: canAfford(me.manaPool, c) ? 1 : 0.5}}>
        <div style={{width:'120px', height:'25px', overflow:'hidden', border:'2px inset', fontSize:'16px', borderColor: colors[dat.color], paddingLeft:'5px', borderRadius:'5px'}}>
            <div onMouseEnter={()=>onInspectCreature(c)} onMouseLeave={()=>onInspectCreature(null)} style={{display:'flex', justifyContent:'space-between'}}>
                <div>{c.kind}</div>
                <div style={{height:'16px'}}><CssIcon spriteIndex={dat.sprite} noTooltip={true}/></div>
            </div>
        </div>
    </div>
}