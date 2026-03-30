import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button } from '../../common/Shared';
import { onShowModal } from '../../common/Thunks';
import { useSelector } from 'react-redux';

export default () => {
    
    const speech = useSelector((s:RState)=>s.modalData.speech)

    return (
        <div style={{...AppStyles.modal, margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>{speech}</div>
            <Button enabled={true} text="Close" handler={()=>onShowModal(null)}/>
        </div>
    )
}
    