import { CardType, Color, CreatureSpriteIndex, Modifier, Permanents } from "../../enum";
import{ v4 } from 'uuid'
import { Portal } from "../assets/data/Portal";

export const getCardData = (c:CardType) => {
    if(Portal[c]) return Portal[c]
    debugger
    return null
}

export const defaultCards = (playerId:string):Card[] => {
    return [
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Goblin,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:{}
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Goblin,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:{}
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Desert,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:{}
        }
    ]
}

export const goblinHordes = (playerId:string):Card[] => {
    return [
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Goblin,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:{}
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Goblin,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:{}
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Desert,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:{}
        }
    ]
}

export const getAIDeck = (id:string) => {
    return AIDecks[Phaser.Math.Between(0,AIDecks.length-1)](id)
}

export const AIDecks = [
    defaultCards,
    goblinHordes,
]