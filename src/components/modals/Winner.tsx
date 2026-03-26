import * as React from 'react'
import AppStyles from '../../styles/AppStyles';
import { Button } from '../../common/Shared';
import { onFinishBattle, onQuit, onShowModal, onUpdateSave } from '../../common/Thunks';
import { useSelector } from 'react-redux';
import CardView from '../CardView';
import { Layers, SceneNames } from '../../../enum';
import MapScene from '../scenes/MapScene';

export default () => {
    
    const mapScene = useSelector((s:RState)=>s.scene.scene.get(SceneNames.Map) as MapScene)
    const saveFile = useSelector((s:RState)=>s.saveFile)
    const loot = useSelector((s:RState)=>s.modalData.cards)
    
    const onClose = () => {
        const t = mapScene.map.getTileAtWorldXY(mapScene.playerSprite.x, mapScene.playerSprite.y, false, undefined, Layers.Earth)
        mapScene.map.removeTileAt(t.x, t.y, false, false, Layers.Creature)
        const i = saveFile.campaignCreatures.findIndex(c=>c.tileX===t.x && c.tileY === t.y)
        saveFile.campaignCreatures[i].alive = false
        onUpdateSave({...saveFile, campaignCreatures: saveFile.campaignCreatures})
        onShowModal(null)
    }

    return (
        <div style={{...AppStyles.modal, margin:'auto'}}>
            <div style={{textAlign:'center', marginBottom:'0.5em'}}>WINNER WINNER</div>
            <div>YOU FOUND:</div>
            <div style={{display:'flex'}}>
                {loot.map(c=><CardView card={c}/>)}
            </div>
            <Button enabled={true} text="Close" handler={loot ? ()=>onClose():()=>onQuit(false)}/>
        </div>
    )
}
    