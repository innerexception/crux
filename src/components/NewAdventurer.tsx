import * as React from 'react'
import AppStyles from '../styles/AppStyles';
import { Button } from '../common/Shared';
import { onShowModal } from '../common/Thunks';
import { useSelector } from 'react-redux';

export default () => {
    
    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'380px'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>INTERLOPER COMES</div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    