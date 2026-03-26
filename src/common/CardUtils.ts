import { CardType, Color, CreatureSpriteIndex, Direction, Layers, Modifier, Permanents, Target } from "../../enum";
import{ v4 } from 'uuid'
import { Portal } from "../assets/data/Portal";
import { onUpdateBoardCreature, onUpdatePlayer } from "./Thunks";
import { shuffle } from "./Utils";
import { store } from "../..";
import { Tilemaps } from "phaser";

export const getLoot = (sprite:CreatureSpriteIndex, myId:string) => {
    return AIPlayers[sprite].loot.map(l=>getCard(myId, l, Portal[l]))
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
    let creatures = state.saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Creature && !c.attributes.includes(Modifier.Vigilant))
    if(ability.def3orLess) creatures = creatures.filter(c=>c.def<=3)
    if(ability.withoutColor) creatures = creatures.filter(c=>getCardData(c).color !== ability.withoutColor)
    if(ability.withColor) creatures = creatures.filter(c=>getCardData(c).color === ability.withColor)
    if(ability.whenAttackingLand) creatures = creatures.filter(c=>c.kind === ability.whenAttackingLand)
    if(ability.withAttribute) creatures = creatures.filter(c=>c.attributes.includes(ability.withAttribute))
    if(ability.withoutAttribute) creatures = creatures.filter(c=>!c.attributes.includes(ability.withoutAttribute))
    if(ability.withCategory) creatures = creatures.filter(c=>getCardData(c).category===ability.withCategory)

    if(ability.targets === Target.TappedCreatures || ability.targets === Target.TappedCreature) creatures = creatures.filter(c=>c.tapped)
    if(ability.targets === Target.ThisCreature) creatures = creatures.filter(c=>c.id === targetEntityId)
    if(ability.targets === Target.AllOtherCreatures) creatures = creatures.filter(c=>c.id !== targetEntityId)
    if(ability.targets === Target.CreatureYouControl || ability.targets === Target.AllCreaturesYouControl) creatures = creatures.filter(c=>c.ownerId === me.id)
    if(ability.targets === Target.OpponentCreature || ability.targets === Target.AllOpponentCreatures){
        creatures = creatures.filter(c=>c.ownerId !== me.id)
    }
    if(ability.targets === Target.CreaturesInLane) 
        creatures = creatures.filter(c=>c.tileX === card.tileX && c.id !== card.id)

    const color = getCardData(card).color
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
    else if(previousStingingWinds && !getCardData(card).defaultAttributes.includes(Modifier.Haste)){
        card.attributes = card.attributes.filter(a=>a!==Modifier.Haste)
    }
    return card.attributes
}

export const getValidLandTargets = (ability:CardAbility, card:Card) => {

    let lands = store.getState().saveFile.currentMatch.board.filter(c=>getCardData(c).kind === Permanents.Land)

    if(ability.withColor){
        lands = lands.filter(l=>getCardData(l).color === ability.withColor)
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
    const meta = getCardData(card)
    const color = meta.ability.effect.addMana
    me.manaPool[color]=me.manaPool[color]+1
    if(card.attributes.includes(Modifier.GreenProducer)){
        me.manaPool.green=me.manaPool.green+1
    }
    onUpdatePlayer({...me})
    onUpdateBoardCreature({...card, tapped: true})
}

export const getCardData = (c:Card) => {
    if(!c) debugger
    if(Portal[c.kind]) return Portal[c.kind]
    return null
}

export const getAllCards = (playerId:string):Card[] => {
    return Object.keys(Portal).map((c:CardType)=>getCard(playerId,c,Portal[c]))
}

export const getStartingCards = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.MessengerOwl, Portal[CardType.MessengerOwl]),
        getCard(playerId, CardType.ArmoredTortoise, Portal[CardType.ArmoredTortoise]),
        getCard(playerId, CardType.BlackBear, Portal[CardType.BlackBear]),
        getCard(playerId, CardType.Corvian, Portal[CardType.Corvian]),
        getCard(playerId, CardType.CatBurglar, Portal[CardType.CatBurglar])
    ]
}

export const getCard = (playerId:string,kind:CardType,c:CardMeta):Card => {
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
    const c = getCardData(card)
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
        getCard(playerId, CardType.Tremors, Portal[CardType.Tremors]),
        getCard(playerId, CardType.GoblinSargeant, Portal[CardType.GoblinSargeant]),
        getCard(playerId, CardType.GoblinSargeant, Portal[CardType.GoblinSargeant]),
        getCard(playerId, CardType.GoblinSargeant, Portal[CardType.GoblinSargeant]),
        getCard(playerId, CardType.Hobgoblin, Portal[CardType.Hobgoblin]),
        getCard(playerId, CardType.Hobgoblin, Portal[CardType.Hobgoblin]),
        getCard(playerId, CardType.Hobgoblin, Portal[CardType.Hobgoblin]),
        getCard(playerId, CardType.Sinkhole, Portal[CardType.Sinkhole]),
        getCard(playerId, CardType.Sinkhole, Portal[CardType.Sinkhole]),
        getCard(playerId, CardType.Sinkhole, Portal[CardType.Sinkhole]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger]),
        getCard(playerId, CardType.GoblinScrounger, Portal[CardType.GoblinScrounger])
    ]
}

export const blackSmall = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.Boggart, Portal[CardType.Boggart]),
        getCard(playerId, CardType.Boggart, Portal[CardType.Boggart]),
        getCard(playerId, CardType.Homonculus, Portal[CardType.Homonculus]),
        getCard(playerId, CardType.MercenaryKnight, Portal[CardType.MercenaryKnight]),
        getCard(playerId, CardType.MercenaryKnight, Portal[CardType.MercenaryKnight]),
        getCard(playerId, CardType.Roaches, Portal[CardType.Roaches]),
        getCard(playerId, CardType.Roaches, Portal[CardType.Roaches]),
        getCard(playerId, CardType.Roaches, Portal[CardType.Roaches]),
        getCard(playerId, CardType.ShadowForm, Portal[CardType.ShadowForm]),
        getCard(playerId, CardType.ShadowForm, Portal[CardType.ShadowForm]),
        getCard(playerId, CardType.Addict, Portal[CardType.Sophist]),
        getCard(playerId, CardType.CursedToad, Portal[CardType.CursedToad]),
        getCard(playerId, CardType.CursedToad, Portal[CardType.CursedToad]),
        getCard(playerId, CardType.ScavengingRats, Portal[CardType.ScavengingRats]),
        getCard(playerId, CardType.ScavengingRats, Portal[CardType.ScavengingRats]),
        getCard(playerId, CardType.ScavengingRats, Portal[CardType.ScavengingRats]),
        getCard(playerId, CardType.Riot, Portal[CardType.Riot]),
        getCard(playerId, CardType.Riot, Portal[CardType.Riot]),
        getCard(playerId, CardType.Pollution, Portal[CardType.Pollution]),
        getCard(playerId, CardType.Pollution, Portal[CardType.Pollution]),
        getCard(playerId, CardType.Pollution, Portal[CardType.Pollution])
    ]
}

export const beasts = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.FeralSpirit, Portal[CardType.FeralSpirit]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.ForestJackal, Portal[CardType.ForestJackal]),
        getCard(playerId, CardType.BlackBear, Portal[CardType.BlackBear]),
        getCard(playerId, CardType.BlackBear, Portal[CardType.BlackBear]),
        getCard(playerId, CardType.BlackBear, Portal[CardType.BlackBear]),
        getCard(playerId, CardType.WerewolfRaider, Portal[CardType.WerewolfRaider]),
        getCard(playerId, CardType.WerewolfRaider, Portal[CardType.WerewolfRaider]),
        getCard(playerId, CardType.WerewolfRaider, Portal[CardType.WerewolfRaider])
    ]
}
    
export const AIPlayers:Partial<Record<CreatureSpriteIndex,{deck:(id:string)=>Card[], sprite:CreatureSpriteIndex, hp:number, loot:CardType[]}>> = {
    [CreatureSpriteIndex.Goblin]: {
        sprite: CreatureSpriteIndex.Goblin,
        deck: goblinHordes,
        hp:1,
        loot:[CardType.GoblinSargeant]
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
        hp:20,
        loot:[CardType.Pollution]
    },
    [CreatureSpriteIndex.Bruiser]: {
        sprite: CreatureSpriteIndex.CityMage,
        deck: blackSmall,
        hp:20,
        loot:[CardType.Pollution]
    }
}