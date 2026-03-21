import * as React from 'react'
import AppStyles, { colors } from '../styles/AppStyles';
import { Button, CssIcon } from '../common/Shared';
import { getCardData } from '../common/CardUtils';
import { IconIndex, TargetsDesc, ModifierDesc, ColorIcons, TriggerNames, Permanents } from '../../enum';
import { renderCost, renderEffect } from './CardView';
import { useSelector } from 'react-redux';

export default (props:{card:Card}) => {
    
    const dat = getCardData(props.card)
    const owner = useSelector((state:RState)=>state.saveFile.currentMatch?.players.find(p=>p.id === props.card.ownerId))

    return (
        <div style={{fontSize:'16px',border:'2px inset', height:'300px', width:'200px', borderColor: colors[dat.color], padding:'5px'}}>
            {props.card.kind}
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{marginRight:'5px'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <CssIcon spriteIndex={dat.sprite} noTooltip={true}/>
                        {dat.kind === Permanents.Creature && <div style={{marginLeft:'5px'}}>{props.card.atk}/{props.card.def} {dat.category}</div>}
                    </div>
                </div>
            </div>
            
            {props.card.attributes && props.card.attributes.map(a=><div>{ModifierDesc[a]}</div>)}
            {dat.ability && <div style={{marginTop:'5px', marginBottom:'5px'}}>
                <div style={{display:'flex'}}>{dat.ability.tap && <CssIcon spriteIndex={IconIndex.Activate}/>} {renderCost(dat.ability.cost, dat.ability.effect?.dmgX)}</div>
                {dat.ability.targets && <div>Affects: {TargetsDesc[dat.ability.targets]} 
                    {dat.ability.withCategory && <div>That is a {dat.ability.withCategory}</div>}
                    {dat.ability.withAttribute?" with "+ModifierDesc[dat.ability.withAttribute]:''}
                    {dat.ability.withoutAttribute ? " without "+ModifierDesc[dat.ability.withoutAttribute]:''}
                    {dat.ability.withColor ? <div> with <CssIcon spriteIndex={ColorIcons[dat.ability.withColor]}/></div>:''}
                    {dat.ability.def3orLess ? " with defence 3 or less" : ''}
                    {dat.ability.withoutColor ? <div> without <CssIcon spriteIndex={ColorIcons[dat.ability.withoutColor]}/></div>:''}
                </div>}
                {dat.ability.trigger ? <div>{TriggerNames[dat.ability.trigger]}</div>:<div>When played,</div>}
                {dat.ability.conditionalSpend && <div>If <CssIcon spriteIndex={ColorIcons[dat.ability.conditionalSpend]}/> was spent:</div>}
                <div>{dat.ability.effect && renderEffect(dat.ability.effect)}</div>   
            </div>}
            {renderCost(dat.cost, dat.pumpColor ? true:false)}
            {owner && <div>Owner: <CssIcon spriteIndex={owner.playerSprite}/></div>}
        </div>
    )
}