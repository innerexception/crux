import { CardType } from "../../enum";
import{ v4 } from 'uuid'
import { Portal } from "../assets/data/Portal";
import { onUpdateBoardCreature, onUpdatePlayer } from "./Thunks";

export const tapLand = (card:Card, me:PlayerState) => {
    const meta = getCardData(card)
    onUpdatePlayer({...me, manaPool: {...me.manaPool, 
        [meta.color]: me.manaPool[meta.color]-meta.ability.cost[0].amount
    }})
    onUpdateBoardCreature({...card, tapped: true})
}

export const getCardData = (c:Card) => {
    if(Portal[c.kind]) return Portal[c.kind]
    debugger
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
        newSummon: true,
        tileX:null,
        tileY:null,
        status:[],
        atk: c.defaultAtk,
        def: c.defaultDef,
        moves: c.defaultMoves,
        attributes: c.defaultAttributes
    }
}

export const goblinHordes = (playerId:string):Card[] => {
    return [
        getCard(playerId, CardType.Goblin, Portal[CardType.Goblin]),
        getCard(playerId, CardType.Goblin, Portal[CardType.Goblin]),
        getCard(playerId, CardType.Goblin, Portal[CardType.Goblin]),
        getCard(playerId, CardType.Goblin, Portal[CardType.Goblin]),
        getCard(playerId, CardType.Goblin, Portal[CardType.Goblin]),
        getCard(playerId, CardType.Desert, Portal[CardType.Desert]),
        getCard(playerId, CardType.Desert, Portal[CardType.Desert]),
        getCard(playerId, CardType.Desert, Portal[CardType.Desert])
    ]
}

export const getAIDeck = (id:string) => {
    return AIDecks[Phaser.Math.Between(0,AIDecks.length-1)](id)
}

export const AIDecks = [
    goblinHordes
]