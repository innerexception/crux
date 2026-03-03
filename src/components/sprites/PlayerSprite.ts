import { GameObjects } from "phaser"
import { CreatureSpriteIndex } from "../../../enum"
import MapScene from "../scenes/MapScene"

export default class PlayerSprite extends GameObjects.Image {

    scene:MapScene
    playerId:string

    constructor(scene:MapScene, x:number, y:number, texture:CreatureSpriteIndex,playerId:string){
        super(scene, x, y, 'creatures', texture)
        scene.add.existing(this)
        this.setInteractive()
        this.playerId = playerId
        this.setOrigin(0)
    }
}