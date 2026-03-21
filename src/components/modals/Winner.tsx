import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button } from '../../common/Shared';
import { onQuit, onShowModal } from '../../common/Thunks';

export default () => {
    
    return (
        <div style={{...AppStyles.modal, margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>WINNER WINNER</div>
            <Button enabled={true} text="Close" handler={()=>onQuit()}/>
        </div>
    )
}
    