import * as React from 'react'
import AppStyles, { colors } from '../styles/AppStyles';
import { Button, CssIcon } from '../common/Shared';
import { getCardData } from '../common/CardUtils';
import { IconIndex, TargetsDesc, ModifierDesc } from '../../enum';
import { renderCost, renderEffect } from './CardView';

export default (props:{card:Card}) => {
    
    const dat = getCardData(props.card)

    return (
        <div style={{fontSize:'16px', borderColor: colors[dat.color]}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{marginRight:'5px'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <CssIcon spriteIndex={dat.sprite} noTooltip={true}/>
                        {props.card.atk && <div style={{marginLeft:'5px'}}>{props.card.atk}/{props.card.def}</div>}
                    </div>
                </div>
            </div>
            {dat.description && <div>{dat.description}</div>}
            {props.card.attributes && props.card.attributes.map(a=><div>{ModifierDesc[a]}</div>)}
            {dat.ability && <div>
                <div style={{display:'flex'}}>{dat.ability.tap && <CssIcon spriteIndex={IconIndex.Tap}/>} {renderCost(dat.ability.cost, dat.ability.effect?.dmgX)}</div>
                {dat.ability.targets && <div>Affects: {TargetsDesc[dat.ability.targets]}</div>}
                <div>{dat.ability.effect && renderEffect(dat.ability.effect)}</div>   
            </div>}
            {renderCost(dat.cost, dat.pumpColor ? true:false)}
        </div>
    )
}