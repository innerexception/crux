import Tooltip from 'rc-tooltip';
import * as React from 'react'
import { renderEffect } from './CardView';

export default (props:{ability:CardAbility}) => {

    return (
        <div style={{maxWidth:'80%'}}>
            Resolving effect:
            {renderEffect(props.ability.effect)}
        </div>
    )
}