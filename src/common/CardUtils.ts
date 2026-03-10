import { CardType, Permanents } from "../../enum";
import{ v4 } from 'uuid'
import { Portal } from "../assets/data/Portal";
import { onUpdateBoardCreature, onUpdatePlayer } from "./Thunks";
import { shuffle } from "./Utils";
import { store } from "../..";

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