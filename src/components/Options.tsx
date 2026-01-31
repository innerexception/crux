import * as React from 'react'
import AppStyles from '../styles/AppStyles';
import { Button } from '../common/Shared';
import { onShowModal } from '../common/Thunks';

export default () => {
    
    return (
        <div style={{...AppStyles.modal, margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>OPTIONS</div>
            <div>Adventurer</div>
            <div>Volume</div>
            <div>Save / Quit</div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    