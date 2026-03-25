import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button } from '../../common/Shared';
import { onQuit } from '../../common/Thunks';

export default () => {
    
    return (
        <div style={{...AppStyles.modal, margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>YOU LOSE! GOOD DAY SIR!</div>
            <Button enabled={true} text="Close" handler={()=>onQuit(false)}/>
        </div>
    )
}
    