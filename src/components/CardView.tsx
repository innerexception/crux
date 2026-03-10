import * as React from 'react'
import AppStyles, { colors } from '../styles/AppStyles';
import { Button, CssIcon } from '../common/Shared';
import { getCardData } from '../common/CardUtils';
import { ColorIcons, Color, ModifierDesc } from '../../enum';
import Tooltip from 'rc-tooltip';
import CardDetailView from './CardDetailView';

export default (props:{card:Card}) => {
    
    const dat = getCardData(props.card)

    return (
        <div style={{width:'120px', height:'80px', border:'2px inset', fontSize:'16px', borderColor: colors[dat.color], paddingLeft:'5px', borderRadius:'5px'}}>
            <Tooltip overlay={<CardDetailView card={props.card}/>}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{marginRight:'5px'}}>
                        <div>{props.card.kind}</div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <CssIcon spriteIndex={dat.sprite} noTooltip={true}/>
                            {(props.card.atk || props.card.def) && <div style={{marginLeft:'5px'}}>{props.card.atk}/{props.card.def}</div>}
                        </div>
                    </div>
                </div>
            </Tooltip>
            {renderCost(dat.cost, dat.pumpColor ? true:false)}
        </div>
    )
}
    
export const renderCost = (mana:ManaCost[], x:boolean) => {
    if(mana) return <div style={{display:'flex'}}>
        {mana.map(c=><div style={{display:'flex', alignItems:'center'}}><CssIcon noTooltip={true} spriteIndex={ColorIcons[c.kind]}/>{c.amount > 0 ? c.amount : '+'}</div>)}
        {x && <div style={{display:'flex', alignItems:'center'}}><CssIcon noTooltip={true} spriteIndex={ColorIcons[Color.None]}/> X</div>}
    </div>
    return <span/>
}
    
export const renderEffect = (effect:CardEffect) => 
    <div>
        {effect.duration && <div>For {effect.duration} turns: </div>}
        {effect.repeat && <div>{effect.repeat} times</div>}
        {(effect.atkUp || effect.defUp) &&
        <div>
            <div>Target recieves </div>
            <div style={{display:'flex'}}>
                {effect.atkUp ? <div>{effect.atkUp > 0 && '+'}{effect.atkUp}</div> : <div>+0</div>}
                /
                {effect.defUp ? <div>{effect.defUp > 0 && '+'}{effect.defUp}</div>: <div>+0</div>}
            </div>
        </div>
        }
        {effect.cardToHandFromGY && <div>Return target card to your hand.</div>}
        {effect.discard && <div>Discard target card from your hand.</div>}
        {effect.dmg && <div>Deal {effect.dmg} to target.</div>}
        {effect.draw && <div>Draw a card.</div>}
        {effect.drawX && <div>Draw X cards.</div>}
        {effect.hpPerLand && <div>Gain {effect.hpUp} life for each {effect.hpPerLand}</div>}
        {effect.pacifism && <div>Targets may not move or use abilities.</div>}
        {effect.dmgX && <div>Deal X damage to target.</div>}
        {effect.destroy && <div>Put target into controller's graveyard.</div>}
        {effect.searchSorceryForTop && <div>Search your deck for a sorcery. It will be placed on top of your library.</div>}
        {effect.untap && <div>Untap target.</div>}
        {effect.addAttributes && <div>Creature gains {effect.addAttributes.map(m=>ModifierDesc[m]).join(' & ')}</div>}
        {effect.removeAttribute && <div>Creature loses {ModifierDesc[effect.removeAttribute]}</div>}
        {effect.addMana && <div>Add <CssIcon spriteIndex={ColorIcons[effect.addMana]}/></div>}
        {effect.arrangeTop5Remove1 && <div>Look at enemy's top 5 and remove 1 from the fight</div>}
        {effect.creatureToHandFromGY && <div>Return target creature to your hand from your graveyard.</div>}
        {effect.creatureToHandFromLibrary && <div>Choose a creature from your library. Shuffle.</div>}
        {effect.creatureToLibrary && <div>Put this creature on top of your library.</div>}
        {effect.damageReflect && <div>Damage dealt to you is also dealt to the opposing player</div>}
        {effect.lookAtTop3 && <div>Look at the top 3 cards in target codex</div>}
        {/* //TODO */}
    </div>
