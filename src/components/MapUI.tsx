import * as React from 'react'
import { useSelector } from 'react-redux';
import { onCancelAction, onEndTurn, onSelectCard, onShowModal, onUpdatePlayer, onInspectCreature, onQuit } from '../common/Thunks';
import { canAfford } from '../common/Utils';
import { Button, CssIcon } from '../common/Shared';
import { CreatureSpriteIndex, IconIndex, Log, Modal, Permanents } from '../../enum';

export default () => {

    return (
        <div style={{width:'97%', position:'absolute', bottom:10, left:10}}>
            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
                <Button icon={IconIndex.Draw} enabled={true} text="Codex" handler={()=>onShowModal(Modal.CampaignDeckbuilder)}/>
                <Button icon={IconIndex.Graveyard} enabled={true} text="Quit" handler={()=>onQuit(true)}/>
            </div>
        </div>
    )
}