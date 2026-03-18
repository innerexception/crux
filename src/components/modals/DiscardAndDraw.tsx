import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { onShowModal, onUpdatePlayer } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';
import { Button } from '../../common/Shared';
import { sendUpdate } from '../../common/Network';

export default () => {
    const me = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId))
    const aiGame = useSelector((state:RState)=>state.saveFile.currentMatch.players.find(p=>p.isAI))
    const [count, setCount] = React.useState(0)

    const discardCard = (c:Card) => {
        setCount(count+1)
        onUpdatePlayer({...me, 
            hand: me.hand.filter(cc=>cc.id !== c.id), 
            discard: me.discard.concat(c)
        })
        if(!aiGame)
            sendUpdate()
    }

    const finish = () => {
        let newMe = {...me}
        for(let i=0;i<count;i++){
            if(me.deck.cards.length > 0) 
                newMe = {...newMe, hand: newMe.hand.concat(me.deck.cards.shift()), deck:me.deck}
        }
        onUpdatePlayer(newMe)
        onShowModal(null)
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'420px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>DISCARD</div>
            <div style={{display:'flex', flexWrap:'wrap', marginBottom:'0.5em'}}>
                {me.hand.map(c=><div onClick={()=>discardCard(c)}><CardView card={c}/></div>)}
            </div>
            <Button enabled={true} text="Done Discarding" handler={()=>finish()}/>
        </div>
    )
}
    