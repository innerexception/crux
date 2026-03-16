import * as React from 'react'
import AppStyles, { colors } from '../styles/AppStyles';
import { Button, CssIcon } from '../common/Shared';
import { getCardData } from '../common/CardUtils';
import { ColorIcons, Color, ModifierDesc } from '../../enum';
import Tooltip from 'rc-tooltip';
import CardDetailView from './CardDetailView';
import { onInspectCreature } from '../common/Thunks';

export default (props:{card:Card}) => {
    
    const dat = getCardData(props.card)

    return (
        <div style={{width:'120px', height:'80px', border:'2px inset', fontSize:'16px', borderColor: colors[dat.color], paddingLeft:'5px', borderRadius:'5px'}}>
            <div onMouseEnter={()=>onInspectCreature(props.card)} onMouseLeave={()=>onInspectCreature(null)} style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{marginRight:'5px'}}>
                    <div>{props.card.kind}</div>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <CssIcon spriteIndex={dat.sprite} noTooltip={true}/>
                        {(props.card.atk || props.card.def) && <div style={{marginLeft:'5px'}}>{props.card.atk}/{props.card.def}</div>}
                    </div>
                </div>
            </div>
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
        {effect.cardToHandFromGY && <div>Return target card to your hand from your graveyard</div>}
        {effect.discardAtRandom && <div>Discard a card at random.</div>}
        {effect.dmg && <div>Deal {effect.dmg} to target.</div>}
        {effect.draw && <div>Draw a card.</div>}
        {effect.drawX && <div>Draw X cards.</div>}
        {effect.drawForDeserts && <div>Draw cards equal to deserts in play</div>}
        {effect.drawForTappedOpponent && <div>Draw cards equal to the number of tapped creatures</div>}
        {effect.drawIfFewerCards && <div>Draw cards until you have the same number as opponent</div>}
        {effect.hpPerLand && <div>Gain {effect.hpUp} life for each {effect.hpPerLand}</div>}
        {effect.dmgX && <div>Deal X damage to target.</div>}
        {effect.destroy && <div>Put target into controller's graveyard.</div>}
        {effect.searchSorceryForTop && <div>Search your codex for a sorceryand place it on top.</div>}
        {effect.searchCardForTop && <div>Search your codex for a card and put it on top</div>}
        {effect.searchForLand && <div>Put a {effect.searchForLand} into play</div>}
        {effect.untap && <div>Untap target.</div>}
        {effect.addAttributes && <div>Creature gains {effect.addAttributes.map(m=>ModifierDesc[m]).join(' & ')}</div>}
        {effect.removeAttribute && <div>Creature loses {ModifierDesc[effect.removeAttribute]}</div>}
        {effect.addMana && <div>Add <CssIcon spriteIndex={ColorIcons[effect.addMana]}/></div>}
        {effect.arrangeTop5Remove1 && <div>Look at enemy's top 5 and put 1 in their graveyard</div>}
        {effect.creatureToHandFromGY && <div>Return target creature to your hand from your graveyard.</div>}
        {effect.creatureToHandFromLibrary && <div>Choose a creature from your library. Shuffle.</div>}
        {effect.damageReflect && <div>Damage dealt to you is also dealt to the opposing player</div>}
        {effect.lookAtTop3 && <div>Look at the top 3 cards in target codex</div>}
        {effect.lookAtHand && <div>Look at target's hand</div>}
        {effect.tauntPlayer && <div>Opponent's non-defender creatures must move to an open lane.</div>}
        {effect.casterDmg && <div>Deal {effect.casterDmg} to yourself</div>}
        {effect.casterHpUp && <div>You gain {effect.casterHpUp} life</div>}
        {effect.creatureToHandFromGY && <div>Return target creature to your hand from your graveyard</div>}
        {effect.creatureToHandFromLibrary && <div>Choose a creature from your codex and add it to your hand</div>}
        {effect.damageReflect && <div>Damage dealt to you this round is also dealt to opponent</div>}
        {effect.destroyForest && <div>Destroy a forest you control</div>}
        {effect.destroyOrReturnThis && <div>Destroy target creature you control, or return this to your hand.</div>}
        {effect.discard && <div>Choose and discard a card.</div>}
        {effect.discardAllAndDraw && <div>Discard all cards and draw that many cards.</div>}
        {effect.discardToDraw && <div>Discard X cards and draw X cards</div>}
        {effect.dmgAsCreaturePower && <div>Deal damage to target equal to creature's power</div>}
        {effect.dmgAsYourDeserts && <div>Deal damage to target equal to deserts in play</div>}
        {effect.extraTurn && <div>Take another turn. Then you lose the game.</div>}
        {effect.hp3perBlackCreature && <div>Gain 3 life per City creature in play</div>}
        {effect.hpPerAttacker && <div>Gain 1 life per non-defender creature opponent controls</div>}
        {effect.hpPerLand && <div>Gain 1 life per {effect.hpPerLand}</div>}
        {effect.hpToOwner && <div>Creature's owner gains {effect.hpToOwner} life</div>}
        {effect.hpUp && <div>Gain {effect.hpUp} life</div>}
        {effect.lookAtTop3Choose1 && <div>Look at the top 3 card of your codex and choose one to put into your hand</div>}
        {effect.playExtraLand && <div>You may play another land this turn</div>}
        {effect.resetMovement && <div>Send all creatures back to their starting tiles</div>}
        {effect.retribution && <div>Destroy all creatures that destroy a creature during the next combat</div>}
        {effect.returnToBattle && <div>Return target creature from your graveyard to the battle</div>}
        {effect.returnToHand && <div>Return target creature to owner's hand</div>}
        {effect.shuffle && <div>Shuffle your codex</div>}
        {effect.snare && <div>Target creature cannot move</div>}
        {effect.untap && <div>Untap target creature</div>}
        {effect.tap && <div>Tap target creature</div>}
        {effect.transformInto && <div>Target land becomes a {effect.transformInto}</div>}
        {/* //TODO */}
    </div>
