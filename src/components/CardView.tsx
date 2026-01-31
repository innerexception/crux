import * as React from 'react'
import AppStyles from '../styles/AppStyles';
import { Button, CreatureIcon, CssIcon } from '../common/Shared';
import { CardData } from '../common/Cards';

export default (props:{card:Card}) => {
    
    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'200px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>{props.card.kind}</div>
            <div><CreatureIcon kind={props.card.kind}/></div>
            {CardData[props.card.kind].atk && <div>{CardData[props.card.kind].atk}/{CardData[props.card.kind].def}</div>}
        </div>
    )
}
    