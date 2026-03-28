import { CardType, Color, CreatureSpriteIndex, Direction, Layers, Modifier, Permanents, Target } from "../../enum";
import{ v4 } from 'uuid'
import { Portal } from "../assets/data/Portal";
import { onUpdateBoardCreature, onUpdatePlayer } from "./Thunks";
import { shuffle } from "./Utils";
import { store } from "../..";
import { Tilemaps } from "phaser";

export const getLoot = (sprite:CreatureSpriteIndex, myId:string) => {
    return AIPlayers[sprite].loot.map(l=>getCard(myId, l))
}

export const getLandAtEndOfLane = (d:Direction, tileX:number, tileY:number) => {
    const map = store.getState().scene.map
    let t = map.getTileAt(tileX, tileY, false, Layers.Earth)
    while(!validEndTile(t, d, true)){
        t = map.getTileAt(t.x, t.y+d, false, Layers.Earth)
    }
    return store.getState().saveFile.currentMatch.board.find(c=>c.tileX === t.x && c.tileY === t.y)
}

export const getValidCreatureTargets = (ability:CardAbility, card:Card, targetEntityId:string) => {
    const state = store.getState()
    const me = state.saveFile.currentMatch.players.find(p=>p.id === state.saveFile.myId)
    let creatures = state.saveFile.currentMatch.board.filter(c=>getCardData(c.kind).kind === Permanents.Creature && !c.attributes.includes(Modifier.Vigilant))
    if(ability.def3orLess) creatures = creatures.filter(c=>c.def<=3)
    if(ability.withoutColor) creatures = creatures.filter(c=>getCardData(c.kind).color !== ability.withoutColor)
    if(ability.withColor) creatures = creatures.filter(c=>getCardData(c.kind).color === ability.withColor)
    if(ability.whenAttackingLand) creatures = creatures.filter(c=>c.kind === ability.whenAttackingLand)
    if(ability.withAttribute) creatures = creatures.filter(c=>c.attributes.includes(ability.withAttribute))
    if(ability.withoutAttribute) creatures = creatures.filter(c=>!c.attributes.includes(ability.withoutAttribute))
    if(ability.withCategory) creatures = creatures.filter(c=>getCardData(c.kind).category===ability.withCategory)

    if(ability.targets === Target.TappedCreatures || ability.targets === Target.TappedCreature) creatures = creatures.filter(c=>c.tapped)
    if(ability.targets === Target.ThisCreature) creatures = creatures.filter(c=>c.id === targetEntityId)
    if(ability.targets === Target.AllOtherCreatures) creatures = creatures.filter(c=>c.id !== targetEntityId)
    if(ability.targets === Target.CreatureYouControl || ability.targets === Target.AllCreaturesYouControl) creatures = creatures.filter(c=>c.ownerId === me.id)
    if(ability.targets === Target.OpponentCreature || ability.targets === Target.AllOpponentCreatures){
        creatures = creatures.filter(c=>c.ownerId !== me.id)
    }
    if(ability.targets === Target.CreaturesInLane) 
        creatures = creatures.filter(c=>c.tileX === card.tileX && c.id !== card.id)

    const color = getCardData(card.kind).color
    if(color === Color.Black){
        creatures = creatures.filter(c=>!c.attributes.includes(Modifier.ProtectionFromBlack))
    }
    if(color === Color.Red){
        creatures = creatures.filter(c=>!c.attributes.includes(Modifier.ProtectionFromRed))
    }
    if(color === Color.Blue){
        creatures = creatures.filter(c=>!c.attributes.includes(Modifier.ProtectionFromBlue))
    }
    if(color === Color.White){
        creatures = creatures.filter(c=>!c.attributes.includes(Modifier.ProtectionFromWhite))
    }
    if(color === Color.Green){
        creatures = creatures.filter(c=>!c.attributes.includes(Modifier.ProtectionFromGreen))
    }
    
    
    return creatures
}

export const getLaneAttributes = (card:Card, tileX:number) => {
    const board = store.getState().saveFile.currentMatch.board
    const stingingWinds = board.find(c=>c.attributes.includes(Modifier.StingingWinds) && c.tileX === tileX && c.ownerId === card.ownerId)
    const previousStingingWinds = board.find(c=>c.attributes.includes(Modifier.StingingWinds) && c.tileX === card.tileX && c.ownerId === card.ownerId)
    if(stingingWinds && !card.attributes.includes(Modifier.Haste)){
        card.attributes.push(Modifier.Haste)
    }
    else if(previousStingingWinds && !getCardData(card.kind).defaultAttributes.includes(Modifier.Haste)){
        card.attributes = card.attributes.filter(a=>a!==Modifier.Haste)
    }
    return card.attributes
}

export const getValidLandTargets = (ability:CardAbility, card:Card) => {

    let lands = store.getState().saveFile.currentMatch.board.filter(c=>getCardData(c.kind).kind === Permanents.Land)

    if(ability.withColor){
        lands = lands.filter(l=>getCardData(l.kind).color === ability.withColor)
    }
    if(ability.targets === Target.LandYouControl){
        lands = lands.filter(l=>l.ownerId === card.ownerId)
    }
    if(ability.targets === Target.OpponentLand){
        lands = lands.filter(l=>l.ownerId !== card.ownerId)
    }
    
    return lands
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
    const meta = getCardData(card.kind)
    const color = meta.ability.effect.addMana
    me.manaPool[color]=me.manaPool[color]+1
    if(card.attributes.includes(Modifier.GreenProducer)){
        me.manaPool.green=me.manaPool.green+1
    }
    onUpdatePlayer({...me})
    onUpdateBoardCreature({...card, tapped: true})
}

export const getCardData = (c:CardType) => {
    if(!c) debugger
    if(Portal[c]) return Portal[c]
    return null
}

export const getAllCards = (playerId:string):Card[] => {
    return Object.keys(Portal).map((c:CardType)=>getCard(playerId,c))
}

export const getStartingCards = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.MessengerOwl),
        getCard(playerId, CardType.ArmoredTortoise),
        getCard(playerId, CardType.BlackBear),
        getCard(playerId, CardType.Corvian),
        getCard(playerId, CardType.CatBurglar)
    ]
}

export const getCard = (playerId:string,kind:CardType):Card => {
    const c = getCardData(kind)
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
        attributes: c.defaultAttributes || []
    }
}

export const resetCard = (card:Card) => {
    const c = getCardData(card.kind)
    return {
        ...card,
        tapped: false,
        tileX:null,
        tileY:null,
        status:[],
        atk: c.defaultAtk,
        def: c.defaultDef,
        attributes: c.defaultAttributes || []
    }
}

export const getFreshLands = () => {
    return shuffle([
        getCard('', CardType.Temple),
        getCard('', CardType.Temple),
        getCard('', CardType.Temple),
        getCard('', CardType.Temple),
        getCard('', CardType.Temple),
        getCard('', CardType.Tower),
        getCard('', CardType.Tower),
        getCard('', CardType.Tower),
        getCard('', CardType.Tower),
        getCard('', CardType.Tower),
        getCard('', CardType.City),
        getCard('', CardType.City),
        getCard('', CardType.City),
        getCard('', CardType.City),
        getCard('', CardType.City),
        getCard('', CardType.Desert),
        getCard('', CardType.Desert),
        getCard('', CardType.Desert),
        getCard('', CardType.Desert),
        getCard('', CardType.Desert),
        getCard('', CardType.Forest),
        getCard('', CardType.Forest),
        getCard('', CardType.Forest),
        getCard('', CardType.Forest),
        getCard('', CardType.Forest)
    ])
}

export const goblinHordes = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.Tremors),
        getCard(playerId, CardType.GoblinSargeant),
        getCard(playerId, CardType.GoblinSargeant),
        getCard(playerId, CardType.GoblinSargeant),
        getCard(playerId, CardType.Hobgoblin),
        getCard(playerId, CardType.Hobgoblin),
        getCard(playerId, CardType.Hobgoblin),
        getCard(playerId, CardType.Sinkhole),
        getCard(playerId, CardType.Sinkhole),
        getCard(playerId, CardType.Sinkhole),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger)
    ]
}

export const goblinSmall = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.GoblinSargeant),
        getCard(playerId, CardType.Hobgoblin),
        getCard(playerId, CardType.Hobgoblin),
        getCard(playerId, CardType.Sinkhole),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger),
        getCard(playerId, CardType.GoblinScrounger)
    ]
}

export const blackSmall = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.Boggart),
        getCard(playerId, CardType.Boggart),
        getCard(playerId, CardType.Homonculus),
        getCard(playerId, CardType.MercenaryKnight),
        getCard(playerId, CardType.MercenaryKnight),
        getCard(playerId, CardType.Roaches),
        getCard(playerId, CardType.Roaches),
        getCard(playerId, CardType.Roaches),
        getCard(playerId, CardType.ShadowForm),
        getCard(playerId, CardType.ShadowForm),
        getCard(playerId, CardType.Addict),
        getCard(playerId, CardType.CursedToad,),
        getCard(playerId, CardType.CursedToad),
        getCard(playerId, CardType.ScavengingRats),
        getCard(playerId, CardType.ScavengingRats),
        getCard(playerId, CardType.ScavengingRats),
        getCard(playerId, CardType.Riot),
        getCard(playerId, CardType.Riot),
        getCard(playerId, CardType.Pollution),
        getCard(playerId, CardType.Pollution),
        getCard(playerId, CardType.Pollution)
    ]
}

export const beasts = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.FeralSpirit),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.ForestJackal),
        getCard(playerId, CardType.BlackBear),
        getCard(playerId, CardType.BlackBear),
        getCard(playerId, CardType.BlackBear),
        getCard(playerId, CardType.WerewolfRaider),
        getCard(playerId, CardType.WerewolfRaider),
        getCard(playerId, CardType.WerewolfRaider)
    ]
}
    
export const AIPlayers:Partial<Record<CreatureSpriteIndex,{deck:(id:string)=>Card[], sprite:CreatureSpriteIndex, hp:number, loot:CardType[]}>> = {
    [CreatureSpriteIndex.Goblin]: {
        sprite: CreatureSpriteIndex.Goblin,
        deck: goblinSmall,
        hp:5,
        loot:[CardType.GoblinScrounger]
    },
    [CreatureSpriteIndex.Goblin3]: {
        sprite: CreatureSpriteIndex.Goblin,
        deck: beasts,
        hp:5,
        loot:[CardType.WerewolfRaider]
    },
    [CreatureSpriteIndex.CityMage]: {
        sprite: CreatureSpriteIndex.CityMage,
        deck: blackSmall,
        hp:10,
        loot:[CardType.Pollution]
    },
    [CreatureSpriteIndex.Bruiser]: {
        sprite: CreatureSpriteIndex.CityMage,
        deck: goblinHordes,
        hp:20,
        loot:[CardType.Hobgoblin]
    },
    [CreatureSpriteIndex.Mummy]: {
        sprite: CreatureSpriteIndex.Mummy,
        deck: blackSmall,
        hp:10,
        loot:[CardType.Necromancy]
    },
    [CreatureSpriteIndex.MasterMummy]: {
        sprite: CreatureSpriteIndex.MasterMummy,
        deck: blackSmall,
        hp:20,
        loot:[CardType.TheFear]
    }
}