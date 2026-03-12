import { CardType, Direction, Layers, Permanents, Target } from "../../enum";
import{ v4 } from 'uuid'
import { Portal } from "../assets/data/Portal";
import { onUpdateBoardCreature, onUpdatePlayer } from "./Thunks";
import { shuffle } from "./Utils";
import { store } from "../..";
import { Tilemaps } from "phaser";

export const getLandAtEndOfLane = (d:Direction, tileX:number, tileY:number) => {
    const map = store.getState().scene.map
    let t = map.getTileAt(tileX, tileY, false, Layers.Earth)
    while(!validEndTile(t, d, true)){
        t = map.getTileAt(t.x, t.y+d, false, Layers.Earth)
    }
    return store.getState().saveFile.currentMatch.board.find(c=>c.tileX === t.x && c.tileY === t.y)
}

export const getValidCreatureTargets = (ability:CardAbility) => {
    const state = store.getState()
    let creatures = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature)
    if(ability.def3orLess) creatures = creatures.filter(c=>c.def<=3)
    if(ability.withoutColor) creatures = creatures.filter(c=>getCardData(c).color !== ability.withoutColor)
    if(ability.withColor) creatures = creatures.filter(c=>getCardData(c).color === ability.withColor)
    if(ability.withAttribute) creatures = creatures.filter(c=>c.attributes.includes(ability.withAttribute))
    if(ability.withoutAttribute) creatures = creatures.filter(c=>!c.attributes.includes(ability.withoutAttribute))
    if(ability.withCategory) creatures = creatures.filter(c=>getCardData(c).category===ability.withCategory)
    return creatures
}

export const validSingleTarget = (entityId:string, sorcery:Card):boolean => {
    const sorceryData = getCardData(sorcery)
    const creature = store.getState().saveFile.currentMatch.board.find(c=>c.id === entityId)
    const cdat = getCardData(creature)
    if(cdat.kind === Permanents.Land){
        return sorceryData.ability.targets === Target.Lands
    }
    if(cdat.kind === Permanents.Creature){
        if(sorceryData.ability.targets === Target.Creature || 
            sorceryData.ability.targets === Target.CreaturesAndPlayers ||
            sorceryData.ability.targets === Target.CreaturesOrPlayers){
            return true
        }
        if(sorceryData.ability.targets === Target.CreatureYouControl){
            return creature.ownerId === sorcery.ownerId
        }
        if(sorceryData.ability.targets === Target.OpponentCreature){
            return creature.ownerId !== sorcery.ownerId
        }
        if(sorceryData.ability.targets === Target.ThisCreature){
            return creature.id === entityId
        }
    }
}

export const validStartTile = (t:Tilemaps.Tile, dir:Direction, land:boolean) => {
    const scene = store.getState().scene
    if(dir === Direction.SOUTH){
        if(land) return scene.southLands.find(l=>l.x===t.x&&l.y===t.y)
        return scene.southCreatures.find(l=>l.x===t.x&&l.y===t.y)
    }
    else{
        if(land) return scene.northLands.find(l=>l.x===t.x&&l.y===t.y)
        return scene.northCreatures.find(l=>l.x===t.x&&l.y===t.y)
    } 
}

export const validEndTile = (t:Tilemaps.Tile, dir:Direction, land:boolean) => {
    const scene = store.getState().scene
    if(dir === Direction.NORTH){
        if(land) return scene.southLands.find(l=>l.x===t.x&&l.y===t.y)
        return scene.southCreatures.find(l=>l.x===t.x&&l.y===t.y)
    }
    else{
        if(land) return scene.northLands.find(l=>l.x===t.x&&l.y===t.y)
        return scene.northCreatures.find(l=>l.x===t.x&&l.y===t.y)
    } 
}


export const tapLand = (card:Card, me:PlayerState) => {
    const meta = getCardData(card)
    const color = meta.ability.effect.addMana
    onUpdatePlayer({...me, manaPool: {...me.manaPool, 
        [color]: me.manaPool[color]+1
    }})
    onUpdateBoardCreature({...card, tapped: true})
}

export const getCardData = (c:Card) => {
    if(!c) debugger
    if(Portal[c.kind]) return Portal[c.kind]
    return null
}

export const defaultCards = (playerId:string):Card[] => {
    return Object.keys(Portal).map((c:CardType)=>getCard(playerId,c,Portal[c]))
}

const getCard = (playerId:string,kind:CardType,c:CardMeta):Card => {
    return {
        id: v4(),
        ownerId: playerId,
        kind,
        tapped: false,
        tileX:null,
        tileY:null,
        status:[],
        atk: c.defaultAtk,
        def: c.defaultDef,
        moves: c.defaultMoves,
        attributes: c.defaultAttributes || []
    }
}

export const resetCard = (card:Card) => {
    const c = getCardData(card)
    return {
        ...card,
        tapped: false,
        tileX:null,
        tileY:null,
        status:[],
        atk: c.defaultAtk,
        def: c.defaultDef,
        moves: c.defaultMoves,
        attributes: c.defaultAttributes || []
    }
}

export const getFreshLands = () => {
    return shuffle([
        getCard('', CardType.Temple, Portal[CardType.Temple]),
        getCard('', CardType.Temple, Portal[CardType.Temple]),
        getCard('', CardType.Temple, Portal[CardType.Temple]),
        getCard('', CardType.Temple, Portal[CardType.Temple]),
        getCard('', CardType.Temple, Portal[CardType.Temple]),
        getCard('', CardType.Tower, Portal[CardType.Tower]),
        getCard('', CardType.Tower, Portal[CardType.Tower]),
        getCard('', CardType.Tower, Portal[CardType.Tower]),
        getCard('', CardType.Tower, Portal[CardType.Tower]),
        getCard('', CardType.Tower, Portal[CardType.Tower]),
        getCard('', CardType.City, Portal[CardType.City]),
        getCard('', CardType.City, Portal[CardType.City]),
        getCard('', CardType.City, Portal[CardType.City]),
        getCard('', CardType.City, Portal[CardType.City]),
        getCard('', CardType.City, Portal[CardType.City]),
        getCard('', CardType.Desert, Portal[CardType.Desert]),
        getCard('', CardType.Desert, Portal[CardType.Desert]),
        getCard('', CardType.Desert, Portal[CardType.Desert]),
        getCard('', CardType.Desert, Portal[CardType.Desert]),
        getCard('', CardType.Desert, Portal[CardType.Desert]),
        getCard('', CardType.Forest, Portal[CardType.Forest]),
        getCard('', CardType.Forest, Portal[CardType.Forest]),
        getCard('', CardType.Forest, Portal[CardType.Forest]),
        getCard('', CardType.Forest, Portal[CardType.Forest]),
        getCard('', CardType.Forest, Portal[CardType.Forest])
    ])
}

export const goblinHordes = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger])
    ]
}

export const getAIDeck = (id:string) => {
    return AIDecks[Phaser.Math.Between(0,AIDecks.length-1)](id)
}

export const AIDecks = [
    goblinHordes
]