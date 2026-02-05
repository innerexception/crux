import * as React from 'react'
import AppStyles from '../styles/AppStyles';
import { Button, CreatureIcon, CssIcon } from '../common/Shared';
import { getCardData } from '../common/Cards';

export default (props:{card:Card}) => {
    
    return (
        <div style={{width:'200px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>{props.card.kind}</div>
            <div><CreatureIcon kind={props.card.kind}/></div>
            {getCardData(props.card.kind).atk && <div>{getCardData(props.card.kind).atk}/{getCardData(props.card.kind).def}</div>}
        </div>
    )
}
    