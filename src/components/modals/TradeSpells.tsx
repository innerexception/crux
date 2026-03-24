import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button, CssIcon } from '../../common/Shared';
import { onShowModal, onUpdateSave } from '../../common/Thunks';
import CardView from '../CardView';
import { useSelector } from 'react-redux';
import { getCardData } from '../../common/CardUtils';
import { IconIndex } from '../../../enum';

export default () => {
    const save = useSelector((s:RState)=>s.saveFile)
    const inventory = useSelector((s:RState)=>s.modalData.cards)

    const sellCard = (c:Card) => {
        onUpdateSave({...save, 
            cards: save.cards.filter(cc=>cc.id !== c.id),
            campaignDeck: save.campaignDeck.filter(cc=>cc.id !== c.id), 
            gold: save.gold+getSellPrice(c) 
        })
    }

    const purchaseCard = (c:Card) => {
        onUpdateSave({...save, 
            cards: save.cards.concat(c), 
            gold: save.gold-getCardData(c).gold 
        })
    }

    return (
        <div style={{...AppStyles.modal, width:'100%', margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>WHAT YA BUYIN, STRANGER?</div>
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {inventory.map(c=><div style={{opacity: save.gold >= getCardData(c).gold ? 1 : 0.5}} onClick={save.gold >= getCardData(c).gold ? ()=>purchaseCard(c):null}>
                    <CardView card={c}/>
                    <div><CssIcon spriteIndex={IconIndex.Gold} />{getCardData(c).gold}</div>
                </div>)}
            </div>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>WHAT'R YA SELLIN, STRANGER?</div>
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {save.cards.map(c=><div onClick={()=>sellCard(c)}>
                    <CardView card={c}/>
                    <div><CssIcon spriteIndex={IconIndex.Gold} />{getSellPrice(c)}</div>
                </div>)}
            </div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    
const getSellPrice = (c:Card) => Math.ceil(getCardData(c).gold*0.3)