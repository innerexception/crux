import { GameObjects, Time } from "phaser"
import { store } from "../../.."
import { CreatureSpriteIndex, Layers } from "../../../enum"
import { CardData } from "../../common/Cards"
import { onUpdateBoard, onUpdateBoardCreature } from "../../common/Thunks"
import MapScene from "../scenes/MapScene"

export default class CreatureSprite extends GameObjects.Image {

    icon:GameObjects.Image
    scene:MapScene
    id:string
    dir:number

    constructor(scene:MapScene, x:number, y:number, texture:CreatureSpriteIndex,id:string,dir:number){
        super(scene, x, y, 'creatures', texture.toString())
        scene.add.existing(this)
        this.setInteractive()
        this.id = id
        this.dir = dir
        this.setOrigin(0)
    }

    tryMoveNext = async () => {
        const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
        let next = this.scene.map.getTileAt(myTile.x, myTile.y+this.dir, false, Layers.Earth)
        let creature = store.getState().currentMatch.board.find(c=>c.id === this.id)
        for(let i=0;i<CardData[creature.kind].moves;i++){
            const target = store.getState().currentMatch.board.find(c=>c.tileX === next.x && c.tileY === next.y)
            if(target){
                //TODO combat resolution

            }
            creature = store.getState().currentMatch.board.find(c=>c.id === this.id)
            if(creature)
                await new Promise((resolve)=>{
                    this.scene.tweens.add({
                        targets: this,    
                        x: next.getCenterX(),
                        y: next.getCenterY(),
                        ease: 'Stepped',
                        easeParams: [2],
                        duration: 500,
                        onComplete: ()=>{
                            let unitTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
                            const creature = store.getState().currentMatch.board.find(c=>c.id === this.id)
                            onUpdateBoardCreature({...creature, tileX:unitTile.x, tileY:unitTile.y})
                            resolve(1)
                        }
                    })
                })
        }
    }

    destroy(){
        const i = this.scene.creatures.findIndex(s=>s.id === this.id)
        this.scene.creatures.splice(i,1)
        super.destroy()
        this.icon?.destroy()
    }
}