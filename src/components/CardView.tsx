import * as React from 'react'
import AppStyles, { colors } from '../styles/AppStyles';
import { Button, CssIcon } from '../common/Shared';
import { getCardData } from '../common/CardUtils';
import { OtherIcons, IconIndex, Permanents, CreatureSpriteIndex, TargetsDesc, ModifierDesc, Color } from '../../enum';
import Tooltip from 'rc-tooltip';

export default (props:{card:Card}) => {
    
    const dat = getCardData(props.card)

    return (
        <div style={{width:'120px', height:'80px', border:'2px inset', fontSize:'16px', borderColor: colors[dat.color], paddingLeft:'5px', borderRadius:'5px'}}>
            <Tooltip overlay={getCreatureDetail(dat, props.card)}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{marginRight:'5px'}}>
                        <div>{props.card.kind}</div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <CssIcon spriteIndex={dat.sprite} noTooltip={true}/>
                            {props.card.atk && <div style={{marginLeft:'5px'}}>{props.card.atk}/{props.card.def}</div>}
                        </div>
                    </div>
                </div>
            </Tooltip>
            {renderCost(dat.cost, dat.pumpColor ? true:false)}
        </div>
    )
}
    
export const getCreatureDetail = (dat:CardMeta, card:Card) => 
    <div style={{fontSize:'16px', borderColor: colors[dat.color]}}>
       
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{marginRight:'5px'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <CssIcon spriteIndex={dat.sprite} noTooltip={true}/>
                    {card.atk && <div style={{marginLeft:'5px'}}>{card.atk}/{card.def}</div>}
                </div>
            </div>
        </div>
        {dat.description && <div>{dat.description}</div>}
        {card.attributes && card.attributes.map(a=><div>{ModifierDesc[a]}</div>)}
        {dat.ability && <div>
            <div style={{display:'flex'}}>{dat.ability.tap && <CssIcon spriteIndex={IconIndex.Tap}/>} {renderCost(dat.ability.cost, dat.ability.effect?.dmgX)}</div>
            {dat.ability.targets && <div>Affects: {TargetsDesc[dat.ability.targets]}</div>}
            <div>{dat.ability.effect && renderEffect(dat.ability.effect)}</div>   
        </div>}
        {renderCost(dat.cost, dat.pumpColor ? true:false)}
    </div>

export const renderCost = (mana:ManaCost[], x:boolean) => {
    if(mana) return <div style={{display:'flex'}}>
        {mana.map(c=><div style={{display:'flex', alignItems:'center'}}><CssIcon noTooltip={true} spriteIndex={OtherIcons[c.kind]}/>{c.amount > 0 ? c.amount : '+'}</div>)}
        {x && <div style={{display:'flex', alignItems:'center'}}><CssIcon noTooltip={true} spriteIndex={OtherIcons[Color.None]}/> X</div>}
    </div>
    return <span/>
}
    

const renderEffect = (effect:CardEffect) => 
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
        {effect.pacifism && <div>Target may not move.</div>}
        {effect.dmgX && <div>Deal X damage to target.</div>}
        {effect.removal && <div>Remove target from the game.</div>}
        {effect.destroy && <div>Put target into controller's graveyard.</div>}
        {effect.searchSorceryForTop && <div>Search your deck for a sorcery. It will be placed on top of your library.</div>}
        {effect.untap && <div>Untap target.</div>}
        {effect.addAttributes && <div>Creature gains {effect.addAttributes.join(' & ')}</div>}
        {effect.addMana && <div>Add <CssIcon spriteIndex={OtherIcons[effect.addMana]}/></div>}
        {effect.arrangeTop5Remove1 && <div>Look at enemy's top 5 and remove 1 from the fight</div>}
        {effect.creatureToHandFromGY && <div>Return target creature to your hand from your graveyard.</div>}
        {effect.creatureToHandFromLibrary && <div>Choose a creature from your library. Shuffle.</div>}
        {effect.creatureToLibrary && <div>Put this creature on top of your library.</div>}
        {effect.damageReflect && <div>Damage dealt to you is also dealt to the opposing player</div>}
        {/* {effect.destroy2Creatures && <div>Destroy 2 target creatures.</div>}
        {effect.destroyAll && <div>Destroy all targets</div>}
        {effect.destroyForest && <div>Destroy a forest</div>}
        {effect.destroyTower && <div>Destroy a tower</div>}
        {effect.dmgAsCreaturePower && <div>Deal damage to target equal to creature's power</div>}
         */}
        {/* //TODO */}
    </div>
