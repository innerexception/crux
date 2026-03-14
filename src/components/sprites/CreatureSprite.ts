import { GameObjects } from "phaser"
import { store } from "../../.."
import { CardType, CreatureSpriteIndex, Direction, IconIndex, Layers, Modifier } from "../../../enum"
import { getCardData, getLandAtEndOfLane, resetCard, validEndTile } from "../../common/CardUtils"
import { onUpdateBoard, onUpdateBoardCreature, onUpdatePlayer } from "../../common/Thunks"
import MapScene from "../scenes/MapScene"
import { net_moveCard } from "../../common/Network"

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

    tap(){
        this.icon = this.scene.add.image(this.x, this.y+10, 'creatures', IconIndex.Tap)
    }
    untap(){
        this.icon?.destroy()
        this.icon = null
    }

    tryMoveNext = async () => {
        let state = store.getState().saveFile.currentMatch
        let thisCreature = state.board.find(c=>c.id === this.id)
        let owner = state.players.find(p=>p.id === thisCreature.ownerId)
        let haste = thisCreature.attributes.includes(Modifier.Haste)
        if(thisCreature.tapped) return //Tapped creatures don't move
        for(let i=0;i<thisCreature.moves+(haste?1:0);i++){
            //TODO: targets in range, and able to be targeted by us
            state = store.getState().saveFile.currentMatch
            thisCreature = state.board.find(c=>c.id === this.id)
            if(!thisCreature) return
            const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
            let next = this.scene.map.getTileAt(myTile.x, myTile.y+this.dir, false, Layers.Earth)
            if(validEndTile(next, owner.dir, true)){
                const enemy = state.players.find(p=>p.id !== thisCreature.ownerId)
                onUpdatePlayer({...enemy, hp: enemy.hp-thisCreature.atk})
                this.scene.floatResource(myTile.pixelX, myTile.pixelY, IconIndex.Damage, '-')
                const land = state.board.find(c=>c.tileX===next.x && c.tileY === next.y)
                if(land){
                    this.scene.tryRemoveCreature(land)
                    this.scene.floatResource(myTile.pixelX, myTile.pixelY, IconIndex.Sword)
                }        
                return this.returnToHand()
            }
            const target = store.getState().saveFile.currentMatch.board.find(c=>c.tileX === next.x && c.tileY === next.y)
            if(target){
                if(target.ownerId !== thisCreature.ownerId){
                    const destroyTarget = thisCreature.attributes.includes(Modifier.Toxic) && target.def <=3
                    if(destroyTarget){
                        this.scene.tryRemoveCreature(target)
                        this.scene.flashIcon(myTile.pixelX, myTile.pixelY, IconIndex.Graveyard)
                    }
                    const destroyThis = target.attributes.includes(Modifier.Toxic) && thisCreature.def <=3
                    if(destroyThis){
                        this.scene.tryRemoveCreature(thisCreature)
                        this.scene.flashIcon(myTile.pixelX, myTile.pixelY, IconIndex.Graveyard)
                    }
                    if(destroyTarget || destroyThis) return

                    if(this.shouldSwap(thisCreature, this.dir) || this.shouldSwap(target, this.dir*-1)){
                        net_moveCard({card: target, tileX: myTile.x, tileY: myTile.y})
                        net_moveCard({card: thisCreature, tileX: target.tileX, tileY: target.tileY})
                        return
                    }

                    this.fight(target)
                }
                return
            }

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

    shouldSwap(creature:Card, dir:Direction){
        if(creature.attributes.includes(Modifier.Unblockable)) return true
        const land = getLandAtEndOfLane(dir, creature.tileX, creature.tileY)
        let swaps = false
        if(land){
            if(creature.attributes.includes(Modifier.CityWalk) && land.kind === CardType.City)
                swaps = true
            if(creature.attributes.includes(Modifier.ForestWalk) && land.kind === CardType.Forest)
                swaps = true
            if(creature.attributes.includes(Modifier.DesertWalk) && land.kind === CardType.Desert)
                swaps = true
            if(creature.attributes.includes(Modifier.TowerWalk) && land.kind === CardType.Tower)
                swaps = true
            if(creature.attributes.includes(Modifier.TempleWalk) && land.kind === CardType.Temple)
                swaps = true
        }
        return swaps
    }

    resetPosition () {
        const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
        const startTile = this.scene.map.getTileAt(myTile.x, this.dir === Direction.NORTH ? this.scene.northCreatures[0].y : this.scene.southCreatures[0].y, false, Layers.Earth)
        
        if(store.getState().saveFile.currentMatch.board.find(c=>c.tileX === startTile.x && c.tileY === startTile.y))
            return this.returnToHand()
        
        onUpdateBoardCreature({...store.getState().saveFile.currentMatch.board.find(c=>c.id === this.id), tileY: startTile.y})
        this.setPosition(startTile.pixelX,startTile.pixelY)
    }

    returnToHand(){
        const state = store.getState().saveFile.currentMatch
        let creature = state.board.find(c=>c.id === this.id)
        let owner = state.players.find(p=>p.id === creature.ownerId)
        onUpdatePlayer({...owner, hand: owner.hand.concat(resetCard(creature))}) //Enchants are removed
        onUpdateBoard(state.board.filter(b=>b.id !== creature.id))
        this.destroy()
    }

    fight = (target:Card) => {
        let thisCard = store.getState().saveFile.currentMatch.board.find(c=>c.id === this.id)
        const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
            
        this.scene.flashIcon(myTile.pixelX, myTile.pixelY, IconIndex.Sword)
        
        //1. def - atk
        if(!thisCard.tapped){
            const defHp = target.def - thisCard.atk
            if(defHp <= 0) this.scene.tryRemoveCreature(target)
        }
        if(!target.tapped){
            const atkHp = thisCard.def - target.atk
            if(atkHp <= 0) this.scene.tryRemoveCreature(thisCard)
        }
    }

    destroy(){
        const i = this.scene.creatures.findIndex(s=>s.id === this.id)
        this.scene.creatures.splice(i,1)
        super.destroy()
        this.icon?.destroy()
    }
}