import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { onSelectCard, onShowModal, onUpdatePlayer } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';
import { Button } from '../../common/Shared';
import { sendUpdate } from '../../common/Network';

export default () => {
    const data = useSelector((state:RState)=>state.modalData)
    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.modalData.targetPlayerId))
    const match = useSelector((state:RState)=>state.saveFile.currentMatch)
    const [count, setCount] = React.useState(1)


    const addCardToHand = (c:Card) => {
        setCount(count+1)
        onUpdatePlayer({...me, 
            hand: me.hand.concat(c), 
            deck: {...me.deck, cards: me.deck.cards.filter(d=>d.id !== c.id)}
        })
        if(!match.players.find(p=>p.isAI))
            sendUpdate()

        if(count >= data.keep)
            onShowModal(null)
    }

    const addCardToBoard = (c:Card) => {
        onSelectCard(c)
        onShowModal(null)
    }

    const discardCard = (c:Card) => {
        setCount(count+1)
        onUpdatePlayer({...me, 
            hand: me.hand.filter(cc=>cc.id !== c.id), 
            discard: me.discard.concat(c)
        })
        if(!match.players.find(p=>p.isAI))
            sendUpdate()

        if(count >= data.discard)
            onShowModal(null)
    }

    const getHandler = (c:Card) => {
        if(data.keep) return ()=>addCardToHand(c)
        if(data.discard) return ()=>discardCard(c)
        if(data.play) return ()=>addCardToBoard(c)
        return null
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'420px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>VIEWING {data.keep && "(choose 1)"}</div>
            <div style={{display:'flex', flexWrap:'wrap', marginBottom:'0.5em'}}>
                {data.cards.map(c=><div onClick={getHandler(c)}><CardView card={c}/></div>)}
            </div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    