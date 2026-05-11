import * as React from 'react'
import { TriggerNames } from '../../enum';
import { renderEffect } from './CardView';

export default (props:{ability:CardAbility}) => {

    return (
        <div style={{maxWidth:'80%', fontSize:'16px', padding:'5px', background:'black', border:'2px inset white'}}>
            Threat level...
        </div>
    )
}