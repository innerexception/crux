import { GameObjects, Time } from "phaser"
import { store } from "../../.."
import { CreatureSpriteIndex, Direction, IconIndex, Layers, Modifier, Permanents } from "../../../enum"
import { getCardData } from "../../common/CardUtils"
import { onUpdateBoard, onUpdateBoardCreature, onUpdatePlayer } from "../../common/Thunks"
import MapScene from "../scenes/MapScene"
import{ v4 } from 'uuid'

export default class CreatureSprite extends GameObjects.Image {

    icon:GameObjects.Image
    scene:MapScene
    id:string
    dir:number

    constructor(scene:MapScene, x:number, y:number, texture:CreatureSpriteIndex,id:string,dir:number){
        super(scene, x, y, 'creatures', texture)
        scene.add.existing(this)
        this.setInteractive()
        this.id = id
        this.dir = dir
        this.setOrigin(0)
    }

    tryMoveNext = async () => {
        const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
        const state = store.getState().saveFile.currentMatch
        let creature = state.board.find(c=>c.id === this.id)
        let owner = state.players.find(p=>p.id === creature.ownerId)
        for(let i=0;i<creature.moves;i++){
            //TODO: targets in range, and able to be targeted by us
            let next = this.scene.map.getTileAt(myTile.x, myTile.y+this.dir, false, Layers.Earth)
            if(this.scene.validEndTile(next, owner.dir, true)){
                const enemy = state.players.find(p=>p.id !== creature.ownerId)
                onUpdatePlayer({...enemy, hp: enemy.hp-creature.atk})
                this.scene.floatResource(myTile.pixelX, myTile.pixelY, IconIndex.Damage, '0xff0000', '-')
                return this.reset()
            }
            const target = store.getState().saveFile.currentMatch.board.find(c=>c.tileX === next.x && c.tileY === next.y)
            if(target){
                if(target.ownerId !== creature.ownerId){
                    await this.fight(target)
                }
                return
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
                            const creature = store.getState().saveFile.currentMatch.board.find(c=>c.id === this.id)
                            onUpdateBoardCreature({...creature, tileX:unitTile.x, tileY:unitTile.y})
                            resolve(1)
                        }
                    })
                })
        }
    }

    reset () {
        const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
        const startTile = this.scene.map.getTileAt(myTile.x, this.dir === Direction.NORTH ? this.scene.northCreatures[0].y : this.scene.southCreatures[0].y, false, Layers.Earth)
        onUpdateBoardCreature({...store.getState().saveFile.currentMatch.board.find(c=>c.id === this.id), tileY: startTile.y})
        this.setPosition(startTile.pixelX,startTile.pixelY)
    }

    fight = async (target:Card) => {
        const defender = getCardData(target)
        let thisCard = store.getState().saveFile.currentMatch.board.find(c=>c.id === this.id)
        const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
            
        this.scene.flashIcon(myTile.pixelX, myTile.pixelY, IconIndex.Sword)
        if(defender.kind === Permanents.Land){
            //If target is land, apply pillage (tap land until end of controller's next turn)
            this.reset()
            target.tapped = true
            target.status.push({
                id: v4(),
                status: { pillaged: true, sprite: IconIndex.Debuff },
                duration: 1
            })
            onUpdateBoardCreature(target)
            return this.scene.floatResource(myTile.pixelX, myTile.pixelY, IconIndex.Sword, '0xff0000')
        }

        //1. def - atk
        const defHp = target.def - thisCard.atk
        const atkHp = thisCard.def - target.atk
        
        if(thisCard.attributes.includes(Modifier.FirstStrike) && defHp <= 0){
            return this.scene.tryRemoveCreature(target)
        }
        if(target.attributes.includes(Modifier.FirstStrike) && atkHp <= 0){
            return this.scene.tryRemoveCreature(thisCard)
        }

        if(defHp <= 0) this.scene.tryRemoveCreature(target)
        if(atkHp <= 0) this.scene.tryRemoveCreature(thisCard)
    }

    destroy(){
        const i = this.scene.creatures.findIndex(s=>s.id === this.id)
        this.scene.creatures.splice(i,1)
        super.destroy()
        this.icon?.destroy()
    }
}