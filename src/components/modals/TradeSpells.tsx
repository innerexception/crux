import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button, CssIcon } from '../../common/Shared';
import { onShowModal, onUpdateSave } from '../../common/Thunks';
import CardView from '../CardView';
import { useSelector } from 'react-redux';
import { store } from '../../..';
import { getCardData } from '../../common/CardUtils';
import { IconIndex } from '../../../enum';

export default () => {
    
    const myCards = useSelector((s:RState)=>s.saveFile.campaignDeck)
    const golds = useSelector((s:RState)=>s.saveFile.gold)
    const inventory = useSelector((s:RState)=>s.modalData.cards)

    const sellCard = (c:Card) => {
        const s = store.getState().saveFile
        onUpdateSave({...s, campaignDeck: s.campaignDeck.filter(cc=>cc.id !== c.id), gold: s.gold+(Math.round(getCardData(c).gold)*0.3) })
    }

    const purchaseCard = (c:Card) => {
        const s = store.getState().saveFile
        onUpdateSave({...s, campaignDeck: s.campaignDeck.concat(c), gold: s.gold-getCardData(c).gold })
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>WHAT YA BUYIN, STRANGER?</div>
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {inventory.map(c=><div style={{opacity: golds >= getCardData(c).gold ? 1 : 0.5}} onClick={golds >= getCardData(c).gold ? ()=>purchaseCard(c):null}>
                    <CardView card={c}/>
                    <div><CssIcon spriteIndex={IconIndex.Gold} />{Math.round(getCardData(c).gold)*0.3}</div>
                </div>)}
            </div>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>WHAT'R YA SELLIN, STRANGER?</div>
            <div>
                {myCards.map(c=><div onClick={()=>sellCard(c)}>
                    <CardView card={c}/>
                    <div><CssIcon spriteIndex={IconIndex.Gold} />{Math.round(getCardData(c).gold)*0.3}</div>
                </div>)}
            </div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    
