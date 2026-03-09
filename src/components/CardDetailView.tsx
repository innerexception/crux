import * as React from 'react'
import AppStyles, { colors } from '../styles/AppStyles';
import { Button, CssIcon } from '../common/Shared';
import { getCardData } from '../common/CardUtils';
import { IconIndex, TargetsDesc, ModifierDesc, ColorIcons, TriggerNames } from '../../enum';
import { renderCost, renderEffect } from './CardView';
import { useSelector } from 'react-redux';

export default (props:{card:Card}) => {
    
    const dat = getCardData(props.card)
    const owner = useSelector((state:RState)=>state.saveFile.currentMatch?.players.find(p=>p.id === props.card.ownerId))

    return (
        <div style={{fontSize:'16px',border:'2px inset', borderColor: colors[dat.color], padding:'5px'}}>
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
                {dat.ability.trigger ? <div>{TriggerNames[dat.ability.trigger]}</div>:<div>When played,</div>}
                {dat.ability.conditionalSpend && <div>If <CssIcon spriteIndex={ColorIcons[dat.ability.conditionalSpend]}/> was spent:</div>}
                {dat.ability.withAttribute && <div>Targets must have {ModifierDesc[dat.ability.withAttribute]}</div>}
                {dat.ability.def3orLess && <div>Target defense 3 or less</div>}
                {dat.ability.withColor && <div>Targets only <CssIcon spriteIndex={ColorIcons[dat.ability.withColor]}/></div>}
                {dat.ability.withoutColor && <div>Does not affect <CssIcon spriteIndex={ColorIcons[dat.ability.withoutColor]}/> targets</div>}
                <div>{dat.ability.effect && renderEffect(dat.ability.effect)}</div>   
            </div>}
            {renderCost(dat.cost, dat.pumpColor ? true:false)}
            {owner && <div>Owner: <CssIcon spriteIndex={owner.playerSprite}/></div>}
        </div>
    )
}