import { CardType, Color, CreatureSpriteIndex, Modifier, Permanents } from "../../../enum";
import{ v4 } from 'uuid'

export const Portal:Record<CardType, CardMeta> = {
    [CardType.City]: {
        color:Color.Black,
        attributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Black, amount: -1}],
        },
        sprite: CreatureSpriteIndex.DeadMatter
    },
    [CardType.Desert]: {
        color:Color.Red,
        attributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Red, amount: -1}],
        },
        sprite: CreatureSpriteIndex.DeadMatter
    },
    [CardType.Forest]: {
        color:Color.Green,
        attributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Green, amount: -1}],
        },
        sprite: CreatureSpriteIndex.DeadMatter
    },
    [CardType.Island]: {
        color:Color.Blue,
        attributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Blue, amount: -1}],
        },
        sprite: CreatureSpriteIndex.DeadMatter
    },
    [CardType.Meadow]: {
        color:Color.White,
        attributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.White, amount: -1}],
        },
        sprite: CreatureSpriteIndex.DeadMatter
    },
    [CardType.SkyPirates]: {
        color:Color.Blue,
        atk: 1,
        def: 1,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Creature,
        moves: 1,
        attributes: [Modifier.Flying, Modifier.OnlyFlying],
        ability: null,
        sprite: CreatureSpriteIndex.Grub
    },
    [CardType.FireCloak]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Enchantment,
        attributes: null,
        ability: {
            cost: [],
            tap: false,
            targets: Permanents.Creature,
            effect: {
                atkUp: 2,
                dmg: 2,
                duration: 1
            }
        },
        sprite: CreatureSpriteIndex.Grub
    },
    [CardType.FeatherCloak]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Enchantment,
        attributes: [Modifier.Flying],
        ability: {
            cost: [],
            tap: false,
            targets: Permanents.Creature,
            effect: {
                duration: 1,
                draw: 1
            }
        },
        sprite: CreatureSpriteIndex.Grub
    },
    [CardType.Sandstorm]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        pumpColor: Color.None, //TODO: can add any amount to increase effect
        kind: Permanents.Sorcery,
        attributes: null,
        ability: {
            cost: [],
            tap: false,
            targets: Permanents.Any,
            effect: {
                duration: 0,
                pumpDamage: true 
            }
        },
        sprite: CreatureSpriteIndex.Grub
    },
    [CardType.Earthquake]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        pumpColor: Color.None, //TODO: can add any amount to increase effect
        kind: Permanents.Sorcery,
        attributes: null,
        ability: {
            cost: [],
            tap: false,
            targets: Permanents.Creature,
            targetsAllPlayers: true,
            effect: {
                duration: 0,
                pumpDamage: true
            }
        },
        sprite: CreatureSpriteIndex.Grub
    },
    [CardType.PeaceTreaty]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1}],
        kind: Permanents.Sorcery,
        attributes: null,
        ability: {
            cost: [],
            tap: false,
            targets: Permanents.Any,
            effect: {
                duration: 1,
                pacifism: true
            }
        },
        sprite: CreatureSpriteIndex.Grub
    },
    [CardType.HeroicSoldier]: {
        color:Color.White,
        atk: 1,
        def: 2,
        cost: [{kind:Color.White, amount:1}],
        kind: Permanents.Creature,
        moves: 1,
        attributes: null,
        ability: null,
        sprite: CreatureSpriteIndex.Grub
    },
}
