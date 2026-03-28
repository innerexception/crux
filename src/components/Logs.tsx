import * as React from 'react'
import { useSelector } from 'react-redux';
import { CssIcon } from '../common/Shared';
import { IconIndex, Log } from '../../enum';
import { getCardData } from '../common/CardUtils';
import { renderEffect } from './CardView';

export default () => {
    const match = useSelector((state:RState)=>state.saveFile?.currentMatch)
    const bottomRef = React.useRef(null);

    React.useEffect(() => {
        const el = bottomRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [match.logs]);

    return (
        <div ref={bottomRef} style={{width:'200px', opacity:0.8, position:'absolute', top:'33%', left:10, height:'300px', overflow:'auto', background:'black', padding:'5px', fontSize:'16px'}}>
            {match.logs.map(l=>getLogEl(l, match))}
        </div>
    )
}

const getLogEl = (l:LogEntry, match:MatchState) => {

    const caster = match.players.find(p=>p.id === l.card.ownerId).playerSprite
    const dat = getCardData(l.card.kind)
  
    if(l.kind === Log.AbilityPlayed) return <div>
        <CssIcon spriteIndex={caster}/> used ability of {l.card.kind} : {renderEffect(dat.ability.effect)}
    </div>
    if(l.kind === Log.CardPlayed) return <div>
        <CssIcon spriteIndex={caster}/> summoned {l.card.kind}
    </div>
    if(l.kind === Log.RangedDamage) return <div>
        <CssIcon spriteIndex={caster}/> used ranged attack of {l.card.kind} on {l.target.kind}
    </div>
    if(l.kind === Log.ExpiredEffect) return <div>
        <CssIcon spriteIndex={IconIndex.Debuff}/> Effect expired on {l.card.kind}: {renderEffect(l.effect.status)}
    </div>
    if(l.kind === Log.NimbleActivation) return <div>
      <CssIcon spriteIndex={dat.sprite}/> was moved
    </div>
    if(l.kind === Log.Destroyed) return <div>
      <CssIcon spriteIndex={dat.sprite}/> was destroyed
    </div>
  }
  