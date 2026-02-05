import { GameObjects, Time } from "phaser"
import { store } from "../../.."
import { CreatureSpriteIndex, Direction, IconIndex, Layers, Modifier, Permanents, StatusEffect } from "../../../enum"
import { getCardData } from "../../common/CardUtils"
import { onUpdateBoard, onUpdateBoardCreature, onUpdatePlayer } from "../../common/Thunks"
import MapScene from "../scenes/MapScene"

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
        let next = this.scene.map.getTileAt(myTile.x, myTile.y+this.dir, false, Layers.Earth)
        const state = store.getState().currentMatch
        let creature = state.board.find(c=>c.id === this.id)
        let owner = state.players.find(p=>p.id === creature.ownerId)
        for(let i=0;i<getCardData(creature.kind).moves;i++){
            //TODO: targets in range, and able to be targeted by us
            const target = store.getState().currentMatch.board.find(c=>c.tileX === next.x && c.tileY === next.y)
            if(target){
                await this.fight(target)
                return
            }
            creature = store.getState().currentMatch.board.find(c=>c.id === this.id)
            if(this.scene.validEndTile(myTile, owner.dir, true)){
                const enemy = state.players.find(p=>p.id !== creature.ownerId)
                onUpdatePlayer({...enemy, hp: enemy.hp-getCardData(creature.kind).atk})
                this.scene.floatResource(myTile.pixelX, myTile.pixelY, IconIndex.Bored, '0xff0000', '-')
                return this.reset()
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

    reset () {
        const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
        const startTile = this.scene.map.getTileAt(myTile.x, this.dir === Direction.NORTH ? this.scene.northCreatures[0].y : this.scene.southCreatures[0].y, false, Layers.Earth)
        onUpdateBoardCreature({...store.getState().currentMatch.board.find(c=>c.id === this.id), tileY: startTile.y})
        this.setPosition(startTile.pixelX,startTile.pixelY)
    }

    fight = async (target:Card) => {
        const defender = getCardData(target.kind)
        let thisCard = store.getState().currentMatch.board.find(c=>c.id === this.id)
        const attacker = getCardData(thisCard.kind)
        if(defender.kind === Permanents.Land){
            //If target is land, apply pillage (tap land until end of controller's next turn)
            this.reset()
            target.tapped = true
            target.status.Pillaged=true
            onUpdateBoardCreature(target)
            const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
            return this.scene.floatResource(myTile.pixelX, myTile.pixelY, IconIndex.Sword, '0xff0000')
        }

        //1. def - atk
        const defHp = defender.def - attacker.atk
        const atkHp = attacker.def - defender.atk
        
        if(attacker.attributes.includes(Modifier.FirstStrike) && defHp <= 0){
            return this.tryRemoveCreature(target)
        }
        if(defender.attributes.includes(Modifier.FirstStrike) && atkHp <= 0){
            return this.tryRemoveCreature(thisCard)
        }

        if(defHp <= 0) this.tryRemoveCreature(target)
        if(atkHp <= 0) this.tryRemoveCreature(thisCard)
    }

    tryRemoveCreature (card:Card) {
        //TODO
        //3. death effects
        //2. remove to discard
        const spr = this.scene.creatures.find(c=>c.id === card.id)
        spr.destroy()
        let board = store.getState().currentMatch.board
        board.splice(board.findIndex(c=>c.id === card.id), 1)
        onUpdateBoard(Array.from(board))
        const p = store.getState().currentMatch.players.find(p=>p.id === card.ownerId)
        onUpdatePlayer({...p, discard: p.discard.concat(card)})
    }

    destroy(){
        const i = this.scene.creatures.findIndex(s=>s.id === this.id)
        this.scene.creatures.splice(i,1)
        super.destroy()
        this.icon?.destroy()
    }
}