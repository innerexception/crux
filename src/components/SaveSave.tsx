import * as React from 'react'
import { Button, CssIcon } from '../common/Shared';
import AppStyles from '../styles/AppStyles';
import { SAVE_NAMES } from '../common/UIReducer';
import { IconIndex, Modal } from '../../enum';
import { onSave, onShowModal } from '../common/Thunks';

export default () => {

    const [selectedSave, setSelectedSave] = React.useState('')

    return (
        <div style={{...AppStyles.modal, margin:'auto', width:'375px'}}>
            <div style={{textAlign:'center', marginBottom:'10px'}}>CHOOSE</div>
            {SAVE_NAMES.map(s=>{
                const sv = JSON.parse(localStorage.getItem(s)) as SaveFile
                return <div onClick={()=>setSelectedSave(s)} style={{display:'flex', padding:'4px', border: '2px dashed white', borderStyle: s===selectedSave ? 'solid' : 'dashed', marginBottom:'10px'}}>
                          <CssIcon spriteIndex={IconIndex.Save} noTooltip={true}/>
                          <div style={{marginLeft:'5px', width:'80%'}}>{sv ? sv.name: 'Empty'}</div>
                       </div>
            })}
            <div style={{display:'flex'}}>
                <Button style={{marginRight:'10px'}} text="Save" handler={()=>onSave(selectedSave)} enabled={selectedSave ? true : false}/>
                <Button text="Cancel" handler={()=>onShowModal(null)} enabled={true}/>
            </div>
            
        </div>
    )
}
    