import { GameObjects, Input, Scene, Tilemaps } from "phaser";
import { DEFAULT_KEYS, LayerStack, Layers, MapFeatures, Maps, Modal } from "../../../enum";
import { TILE_DIM } from "./BattleScene";
import { store } from "../../..";
import { onShowModal, onStartCampaignMatch, onStartMatch, onUpdateSave } from "../../common/Thunks";
import { getAIPlayer } from "../../common/Utils";

export default class MapScene extends Scene {

    sounds: any
    map:Tilemaps.Tilemap
    playerSprite:GameObjects.Image
    keys: {
        up: Input.Keyboard.Key
        down: Input.Keyboard.Key
        left: Input.Keyboard.Key
        right: Input.Keyboard.Key
        cancel: Input.Keyboard.Key
        inventory: Input.Keyboard.Key
    }
    moveCooldown:boolean

    create = () =>
    {
        this.sounds = {}
        //this.add.tileSprite(0,0,this.cameras.main.displayWidth,this.cameras.main.displayHeight*2, 'bg').setOrigin(0,0).setScale(1)
        this.input.mouse.disableContextMenu()
        this.map?.destroy()
        this.map = this.add.tilemap(Maps.Overworld)
        let grass = this.map.addTilesetImage('tiles', 'tiles', TILE_DIM,TILE_DIM)
        LayerStack.forEach(l=>this.map.createLayer(l, grass))
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        const save = store.getState().saveFile
        this.playerSprite?.destroy()
        this.map.setLayer(Layers.Doodad)
        if(!save.worldX){
            const spawn = this.map.findByIndex(729)
            this.playerSprite = this.add.image(spawn.pixelX, spawn.pixelY, 'creatures', save.playerSprite)
        }
        else this.playerSprite = this.add.image(save.worldX, save.worldY, 'creatures', save.playerSprite)
        this.cameras.main.startFollow(this.playerSprite)
        const keys = DEFAULT_KEYS
        this.input.keyboard.enabled = true
        this.input.keyboard.clearCaptures()
        this.input.keyboard.removeAllKeys(true)
        this.input.keyboard.removeAllListeners()
        this.keys = this.input.keyboard.addKeys(keys) as any
    }

    onTransitionIn = () => {
        
    }


    resolveMove (unit:GameObjects.Image, tileX:number, tileY:number) {
        const current = this.map.getTileAtWorldXY(unit.x, unit.y, false, undefined, Layers.Earth)
        const t = this.map.getTileAt(current.x+tileX, current.y+tileY, false, Layers.Earth)
        if(t){
            const b = this.map.getTileAt(current.x+tileX, current.y+tileY, false, Layers.Blockers)
            if(b) return
            this.moveCooldown = true
            this.tweens.add({
                targets: unit,
                x: t.getCenterX(),
                y: t.getCenterY(),
                ease: 'Stepped',
                easeParams: [3],
                duration: 300,
                onComplete: ()=>{
                    this.moveCooldown = false
                    onUpdateSave({...store.getState().saveFile, worldX: this.playerSprite.x, worldY:this.playerSprite.y})
                    const creature = this.map.getTileAt(t.x, t.y, false, Layers.Creature)
                    if(creature){
                        this.map.removeTileAt(t.x, t.y, false, false, Layers.Creature)
                        const saveFile = store.getState().saveFile
                        return onStartCampaignMatch(saveFile, getAIPlayer(creature.index-1), saveFile.myId)
                    }
                    const shop = this.map.getTileAt(t.x, t.y, false, Layers.Entrances)
                    if(shop){
                        onShowModal(Modal.TradeSpells, MapFeatures[shop.index-1])
                    }
                }
            })
        }
    }


    update(){
        if(!this.keys || this.moveCooldown) return
        if(this.keys.inventory.isDown) onShowModal(Modal.CampaignDeckbuilder)
        if(this.keys.left.isDown){
            this.playerSprite.flipX = false
            return this.resolveMove(this.playerSprite, -1, 0)
        }
        if(this.keys.right.isDown){
            this.playerSprite.flipX = true
            return this.resolveMove(this.playerSprite, +1, 0)
        }
        if(this.keys.up.isDown){
            this.resolveMove(this.playerSprite, 0, -1)
        }
        if(this.keys.down.isDown){
            this.resolveMove(this.playerSprite, 0, +1)
        }
    }

}