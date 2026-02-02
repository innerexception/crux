import { GameObjects, Time } from "phaser"
import { store } from "../../.."
import { CreatureSpriteIndex, Direction, Layers } from "../../../enum"
import { CardData } from "../../common/Cards"
import { onUpdateBoardCreature, onUpdatePlayer } from "../../common/Thunks"
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
        const state = store.getState().currentMatch
        let creature = state.board.find(c=>c.id === this.id)
        let owner = state.players.find(p=>p.id === creature.ownerId)
        for(let i=0;i<CardData[creature.kind].moves;i++){
            //TODO: targets in range, and able to be targeted by us
            const target = store.getState().currentMatch.board.find(c=>c.tileX === next.x && c.tileY === next.y)
            if(target){
                await this.fight(target)
                return
            }
            creature = store.getState().currentMatch.board.find(c=>c.id === this.id)
            //TODO: if we are on last row, deal player dmg and reset to start of column (if not ephemeral)
            if(this.scene.validEndTile(myTile, owner.dir, true)){
                const enemy = state.players.find(p=>p.id !== creature.ownerId)
                onUpdatePlayer({...enemy, hp: enemy.hp-CardData[creature.kind].atk})
                const startTile = this.scene.map.getTileAt(myTile.x, this.dir === Direction.NORTH ? this.scene.northCreatures[0].y : this.scene.southCreatures[0].y, false, Layers.Earth)
                onUpdateBoardCreature({...creature, tileY: startTile.y})
                return this.setPosition(startTile.pixelX,startTile.pixelY)
            }

            if(creature)
                await new Promise((resolve)=>{
                    this.scene.tweens.add({
                        targets: this,    
                        x: next.pixelX,
                        y: next.pixelY,
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

    fight = async (target:Card) => {
        //TODO: fight it out
        //If target is land, apply pillage (tap land until end of controller's next turn)
        //0. modifier effects go off
        //1. def - atk
        //2. remove units w <= 0 def to discard
        //3. death effects
    }

    destroy(){
        const i = this.scene.creatures.findIndex(s=>s.id === this.id)
        this.scene.creatures.splice(i,1)
        super.destroy()
        this.icon?.destroy()
    }
}