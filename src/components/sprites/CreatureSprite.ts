import { GameObjects } from "phaser"
import { store } from "../../.."
import { CardType, Color, CreatureSpriteIndex, Direction, IconIndex, Layers, Modal, Modifier, Permanents, Target, Triggers } from "../../../enum"
import { getCardData, getLandAtEndOfLane, getLoot, resetCard, validEndTile } from "../../common/CardUtils"
import { onShowModal, onUpdateBoard, onUpdateBoardCreature, onUpdatePlayer } from "../../common/Thunks"
import BattleScene from "../scenes/BattleScene"
import { net_moveCard } from "../../common/Network"

export default class CreatureSprite extends GameObjects.Image {

    icon:GameObjects.Image
    scene:BattleScene
    id:string
    dir:number

    constructor(scene:BattleScene, x:number, y:number, texture:CreatureSpriteIndex,id:string,dir:number){
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
        if(!thisCreature) return
        if(thisCreature.attributes.includes(Modifier.Seige)){
            let validLand = state.board.find(c=>getCardData(c).kind===Permanents.Land && c.ownerId !== thisCreature.ownerId && (c.kind === CardType.Tower || c.kind === CardType.City || c.kind === CardType.Temple))
            if(!validLand) return
        }
        if(thisCreature.attributes.includes(Modifier.Defender)){
            return
        }
        let owner = state.players.find(p=>p.id === thisCreature.ownerId)
        let haste = thisCreature.attributes.includes(Modifier.Haste)
        if(thisCreature.tapped) return //Tapped creatures don't move
        for(let i=0;i<thisCreature.moves+(haste?1:0);i++){
            state = store.getState().saveFile.currentMatch
            thisCreature = state.board.find(c=>c.id === this.id)
            if(!thisCreature) return
            const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
            let next = this.scene.map.getTileAt(myTile.x, myTile.y+this.dir, false, Layers.Earth)
            if(validEndTile(next, owner.dir, true)){
                const enemy = state.players.find(p=>p.id !== thisCreature.ownerId)
                if(enemy.damageReflect !== null && enemy.damageReflect>=0){
                    onUpdatePlayer({...enemy, hp: enemy.hp-thisCreature.atk, damageReflect: enemy.damageReflect+thisCreature.atk})
                }
                else {
                    const hp = enemy.hp-thisCreature.atk
                    if(hp<=0){
                        if(owner.id === store.getState().saveFile.myId) onShowModal(Modal.Winner, {cards: getLoot(enemy, owner.id), targetPlayerId: ''})
                        else onShowModal(Modal.GameOver)
                    }
                    else onUpdatePlayer({...enemy, hp})
                }
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

                    if(getCardData(target).ability?.trigger === Triggers.OnCombat){
                        const targets =getCardData(target).ability.targets
                        if(targets === Target.ThisCreature)
                            this.scene.applySingleTargetCreatureEffect({creature: target, sorcery: target})
                        else if(targets === Target.Self){
                            this.scene.applyPlayerEffect(owner, target)
                        }
                    }
                    if(getCardData(thisCreature).ability?.trigger === Triggers.OnCombat){
                        const targets =getCardData(thisCreature).ability.targets
                        if(targets === Target.ThisCreature)
                            this.scene.applySingleTargetCreatureEffect({creature: thisCreature, sorcery: thisCreature})
                        else if(targets === Target.Self){
                            this.scene.applyPlayerEffect(owner, thisCreature)
                        }
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
        let owner = store.getState().saveFile.currentMatch.players.find(p=>p.id === thisCard.ownerId)
        const myTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, undefined, Layers.Earth)
            
        this.scene.flashIcon(myTile.pixelX, myTile.pixelY, IconIndex.Sword)
        
        if(!thisCard.tapped){
            if(this.hasProtectionFrom(target, thisCard)){
                console.log('noop')
            }
            else {
                const defHp = target.def - thisCard.atk
                if(defHp <= 0){
                    if(getCardData(thisCard).ability?.effect.casterHpUpOnKill){
                        owner.hp+=getCardData(thisCard).ability?.effect.casterHpUpOnKill
                        onUpdatePlayer({...owner})
                    }
                    this.scene.tryRemoveCreature(target)
                    if(thisCard.attributes.includes(Modifier.Retribution)){
                        this.scene.tryRemoveCreature(thisCard)
                    }
                } 
            }
        }
        if(!target.tapped){
            if(this.hasProtectionFrom(thisCard, target)){
                console.log('noop')
            }
            else {
                const atkHp = thisCard.def - target.atk
                if(atkHp <= 0){
                    if(getCardData(target).ability?.effect.casterHpUpOnKill){
                        owner.hp+=getCardData(target).ability?.effect.casterHpUpOnKill
                        onUpdatePlayer({...owner})
                    }
                    this.scene.tryRemoveCreature(thisCard)
                    if(target.attributes.includes(Modifier.Retribution)){
                        this.scene.tryRemoveCreature(target)
                    }
                } 
            }
        }
    }

    hasProtectionFrom(c:Card, cc:Card) {
        if(cc.attributes.includes(Modifier.ProtectionFromBlack) && getCardData(c).color === Color.Black){
            return true
        }
        if(cc.attributes.includes(Modifier.ProtectionFromBlue) && getCardData(c).color === Color.Blue){
            return true
        }
        if(cc.attributes.includes(Modifier.ProtectionFromGreen) && getCardData(c).color === Color.Green){
            return true
        }
        if(cc.attributes.includes(Modifier.ProtectionFromRed) && getCardData(c).color === Color.Red){
            return true
        }
        if(cc.attributes.includes(Modifier.ProtectionFromWhite) && getCardData(c).color === Color.White){
            return true
        }
        return false
    }

    destroy(){
        const i = this.scene?.creatures.findIndex(s=>s.id === this.id)
        this.scene?.creatures.splice(i,1)
        super.destroy()
        this.icon?.destroy()
    }
}