import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { onShowModal, onUpdatePlayer } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';
import { Button } from '../../common/Shared';
import { getCardData } from '../../common/CardUtils';
import { Permanents } from '../../../enum';

export default () => {
    const cards = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId).deck.cards.filter(c=>getCardData(c).kind === Permanents.Creature))
    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))

    const moveToTop = (c:Card) => {
        let cardz = me.deck.cards.filter(c=>c.id !== c.id)
        cardz.unshift(c)
        onUpdatePlayer({...me, deck: {...me.deck, cards: cardz}})
        onShowModal(null)
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'420px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>CHOOSE CREATURE FROM CODEX</div>
            <div style={{display:'flex', flexWrap:'wrap', marginBottom:'0.5em'}}>
                {cards.map(c=><div onClick={()=>moveToTop(c)}><CardView card={c}/></div>)}
            </div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    