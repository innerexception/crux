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
    return Object.keys(Portal).map((c:CardType)=>{
        return {
            id: v4(),
            ownerId: playerId,
            kind: c,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:[]
        }}
    )
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
            status:[]
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Goblin,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:[]
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Goblin,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:[]
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Goblin,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:[]
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Goblin,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:[]
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Desert,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:[]
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Desert,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:[]
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Desert,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:[]
        },
    ]
}

export const getAIDeck = (id:string) => {
    return AIDecks[Phaser.Math.Between(0,AIDecks.length-1)](id)
}

export const AIDecks = [
    goblinHordes
]