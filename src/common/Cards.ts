import { CardType, Color, CreatureSpriteIndex, Modifier, Permanents } from "../../enum";
import{ v4 } from 'uuid'

export const CardData:Record<CardType, CardMeta> = {
    [CardType.Mountain]: {
        color:Color.Red,
        attributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Red, amount: -1}],
        },
        sprite: CreatureSpriteIndex.DeadMatter
    },
    [CardType.Goblin]: {
        color:Color.Red,
        atk: 1,
        def: 1,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Creature,
        moves: 1,
        attributes: [Modifier.Banding],
        ability: null,
        sprite: CreatureSpriteIndex.Grub
    },
    [CardType.GoblinKing]: {
        color:Color.Red,
        atk: 1,
        def: 2,
        cost: [{kind:Color.Red, amount:3}],
        kind: Permanents.Creature,
        moves: 1,
        attributes: null,
        ability: {
            cost: [],
            tap: true,
            targets: Permanents.Creature,
            specificTargets: [CardType.Goblin],
            effect: {}
        },
        sprite: CreatureSpriteIndex.Grub
    },
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
            kind: CardType.GoblinKing,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:{}
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Mountain,
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
            kind: CardType.GoblinKing,
            tapped: false,
            newSummon: true,
            tileX:null,
            tileY:null,
            status:{}
        },
        {
            id: v4(),
            ownerId: playerId,
            kind: CardType.Mountain,
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