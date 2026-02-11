import { GameObjects, Time } from "phaser"
import { store } from "../../.."
import { CreatureSpriteIndex, Direction, IconIndex, Layers, Modifier, Permanents } from "../../../enum"
import { getCardData } from "../../common/CardUtils"
import { onUpdateBoard, onUpdateBoardCreature, onUpdatePlayer } from "../../common/Thunks"
import MapScene from "../scenes/MapScene"
import{ v4 } from 'uuid'

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