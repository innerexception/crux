import { GameObjects, Input, Scene, Tilemaps } from "phaser";
import { DEFAULT_KEYS, LayerStack, Layers, Maps, Modal, CreatureSpriteIndex } from "../../../enum";
import { TILE_DIM } from "./BattleScene";
import { store } from "../../..";
import { onSelectNPC, onShowModal, onStartCampaignMatch, onUpdateSave } from "../../common/Thunks";
import { getAIPlayer } from "../../common/Utils";
import { MapFeatures } from "../../assets/data/Map";

const DEAD_ZONE = 10

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
    currentCenter:{x:number,y:number}

    create = () =>
    {
        this.sounds = {}
        //this.add.tileSprite(0,0,this.cameras.main.displayWidth,this.cameras.main.displayHeight*2, 'bg').setOrigin(0,0).setScale(1)
        this.input.mouse.disableContextMenu()
        const save = store.getState().saveFile
        this.redrawMap(save.currentMap, 'spawn' as any)
        
        const keys = DEFAULT_KEYS
        this.input.keyboard.enabled = true
        this.input.keyboard.clearCaptures()
        this.input.keyboard.removeAllKeys(true)
        this.input.keyboard.removeAllListeners()
        this.keys = this.input.keyboard.addKeys(keys) as any
        this.input.on('pointermove', (event, gameObjects:Array<Phaser.GameObjects.GameObject>) => {
            const state = store.getState()
            let tile = this.map?.getTileAtWorldXY(this.input.activePointer.worldX, this.input.activePointer.worldY, false, undefined, Layers.Earth)
            if(tile){
                const cre = state.saveFile.campaignCreatures.find(c=>c.tileX === tile.x && c.tileY === tile.y)
                if(cre){
                    onSelectNPC({x:cre.tileX, y:cre.tileY})
                }
                else if(state.selectedNPC) onSelectNPC(null)
            }
        })
        if(save.campaignDeck.length === 0) 
            onShowModal(Modal.CampaignDeckbuilder)
    }

    onTransitionIn = () => {
        
    }

    redrawMap(map:Maps, previousMap:Maps) {
        this.map?.destroy()
        this.map = this.add.tilemap(map)
        let grass = this.map.addTilesetImage('tiles', 'tiles', TILE_DIM,TILE_DIM)
        LayerStack.forEach(l=>this.map.createLayer(l, grass))
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        const save = store.getState().saveFile
        this.playerSprite?.destroy()
        this.map.setLayer(Layers.Doodad)
        if(!save.maps[map]){
            const stairs = this.map.getObjectLayer('stairs').objects.find(s=>s.name === previousMap)
            this.playerSprite = this.add.image(stairs.x+16, stairs.y+16, 'creatures', save.playerSprite)
            this.map.setLayer(Layers.Creature)
            let creatures = new Array<CreatureState>()
            this.map.forEachTile(t=>{
                if(t.index != -1){
                    creatures.push({ kind: t.index-1, tileX: t.x, tileY:t.y, alive:true, map })
                }
            })
            onUpdateSave({...save, campaignCreatures:creatures})
        }
        else{
            this.playerSprite = this.add.image(save.maps[map].worldX, save.maps[map].worldY, 'creatures', save.playerSprite)
            save.campaignCreatures.filter(c=>c.map === map && !c.alive).forEach(c=>this.map.removeTileAt(c.tileX, c.tileY, false, false, Layers.Creature))
        } 
        this.cameras.main.centerOn(this.playerSprite.x, this.playerSprite.y)
        this.currentCenter = {x:this.cameras.main.midPoint.x,y:this.cameras.main.midPoint.y}
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
                    const current = this.map.getTileAtWorldXY(unit.x, unit.y, false, undefined, Layers.Earth)
                    let save = store.getState().saveFile
                    save.maps[save.currentMap] = {...save.maps[save.currentMap], worldX: this.playerSprite.x, worldY: this.playerSprite.y}
                    onUpdateSave({...save})
                    const stairs = this.map.getObjectLayer('stairs').objects.find(s=>s.x === current.pixelX && s.y === current.pixelY && s.name !== 'spawn')
                    if(stairs){
                        return this.redrawMap(stairs.name as Maps, save.currentMap)
                    }
                    const creature = this.map.getTileAt(t.x, t.y, false, Layers.Creature)
                    if(creature) this.triggerNPCEvent(creature.index-1)
                    const d = Phaser.Math.Distance.Between(this.currentCenter.x, this.currentCenter.y, this.playerSprite.x, this.playerSprite.y)
                    if(d > DEAD_ZONE*TILE_DIM){
                        let xDif = Math.abs(this.playerSprite.x - this.currentCenter.x)
                        let yDif = Math.abs(this.playerSprite.y - this.currentCenter.y)
                        if(xDif > yDif){
                            let dir = {x: this.playerSprite.x >= this.currentCenter.x?1:-1, y: 0}
                            this.currentCenter = {x:this.currentCenter.x+(DEAD_ZONE*TILE_DIM*dir.x), y:this.currentCenter.y+(DEAD_ZONE*TILE_DIM*dir.y)}
                        }
                        else {
                            let dir = {x: 0, y: this.playerSprite.y>=this.currentCenter.y?1:-1}
                            this.currentCenter = {x:this.currentCenter.x+(DEAD_ZONE*TILE_DIM*dir.x), y:this.currentCenter.y+(DEAD_ZONE*TILE_DIM*dir.y)}
                        }
                        this.cameras.main.pan(this.currentCenter.x, this.currentCenter.y, 500, (t) => {
                            // t goes from 0 → 1
                            const steps = 6;
                            // quantize the easing progress
                            return Math.floor(t * steps) / steps;
                        })
                    } 
                }
            })
        }
    }

    triggerNPCEvent = (creature:CreatureSpriteIndex) => {
        const dat = MapFeatures[creature]
        if(dat){
            if(dat.speech){
                return onShowModal(Modal.Speech, {speech:dat.speech})
            }
            else if(dat.opponent) {
                const saveFile = store.getState().saveFile
                return onStartCampaignMatch(saveFile, getAIPlayer(dat.opponent), saveFile.myId)
            }
            else if(dat.shopInventory){
                onShowModal(Modal.TradeSpells, { cards: dat.shopInventory })
            }
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