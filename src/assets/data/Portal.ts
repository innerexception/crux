import { CardType, Color, CreatureSpriteIndex, IconIndex, Modifier, Permanents } from "../../../enum";

export const Portal:Record<CardType, CardMeta> = {
    [CardType.City]: {
        color:Color.Black,
        defaultAttributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Black, amount: -1}],
        },
        sprite: CreatureSpriteIndex.City
    },
    [CardType.Desert]: {
        color:Color.Red,
        defaultAttributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Red, amount: -1}],
        },
        sprite: CreatureSpriteIndex.Desert
    },
    [CardType.Forest]: {
        color:Color.Green,
        defaultAttributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Green, amount: -1}],
        },
        sprite: CreatureSpriteIndex.Forest
    },
    [CardType.Tower]: {
        color:Color.Blue,
        defaultAttributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.Blue, amount: -1}],
        },
        sprite: CreatureSpriteIndex.Tower
    },
    [CardType.Sanctuary]: {
        color:Color.White,
        defaultAttributes: null,
        kind: Permanents.Land,
        ability: {
            tap: true,
            cost:[{ kind: Color.White, amount: -1}],
        },
        sprite: CreatureSpriteIndex.Sanctuary
    },
    [CardType.SkyPirates]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes: [Modifier.Flying, Modifier.OnlyFlying],
        ability: null,
        sprite: CreatureSpriteIndex.Skypirate
    },
    [CardType.FireCloak]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Enchantment,
        defaultAttributes: null,
        ability: {
            targets: Permanents.Creature,
            effect: {
                atkUp: 2,
                dmg:2,
                duration: 1,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.FireCloak
    },
    [CardType.FeatherCloak]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Enchantment,
        ability: {
            targets: Permanents.Creature,
            effect: {
                duration: 1,
                draw: 1,
                attributes: [Modifier.Flying],
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.FeatherCloak
    },
    [CardType.Sandstorm]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        pumpColor: Color.None, //TODO: can add any amount to increase effect
        kind: Permanents.Sorcery,
        ability: {
            targets: Permanents.Any,
            effect: {
                dmgX: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Sandstorm
    },
    [CardType.Earthquake]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        pumpColor: Color.None, //TODO: can add any amount to increase effect
        kind: Permanents.Sorcery,
        ability: {
            targets: Permanents.CreaturesAndPlayers,
            effect: {
                dmgX: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Earthquake
    },
    [CardType.PeaceTreaty]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            cost: [],
            tap: false,
            targets: Permanents.CreaturesYouControl,
            effect: {
                duration: 1,
                pacifism: true,
                sprite: IconIndex.Debuff
            }
        },
        sprite: CreatureSpriteIndex.PeaceTreaty
    },
    [CardType.HeroicSoldier]: {
        color:Color.White,
        defaultAtk: 1,
        defaultDef: 2,
        cost: [{kind:Color.White, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        sprite: CreatureSpriteIndex.HeroicSoldier
    },
    [CardType.FertileSoil]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Permanents.Self,
            effect: {
                hpPerForest: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.FertileSoil
    },
    [CardType.Hurricane]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        pumpColor: Color.None, //TODO: can add any amount to increase effect
        kind: Permanents.Sorcery,
        ability: {
            targets: Permanents.CreaturesAndPlayers,
            effect: {
                dmgX: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Hurricane
    },
    [CardType.ForestJackal]: {
        color:Color.Green,
        defaultAtk: 2,
        defaultDef: 1,
        cost: [{kind:Color.Green, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        defaultAttributes: [Modifier.CantBlock],
        sprite: CreatureSpriteIndex.ForestJackal
    },
    [CardType.Merfolk]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        sprite: CreatureSpriteIndex.Merfolk
    },
    [CardType.Refreshment]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Permanents.CreaturesYouControl,
            effect: {
                untap: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Refreshment
    },
    [CardType.BillyGoat]: {
        color:Color.Red,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        defaultAttributes:[Modifier.DesertWalk],
        sprite: CreatureSpriteIndex.BillyGoat
    },
    [CardType.ScavengingRats]: {
        color:Color.Black,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Black, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        sprite: CreatureSpriteIndex.ScavengingRats
    },
    [CardType.Memoize]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            effect:{
                searchSorceryForTop: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Memoize
    },
    [CardType.Brainstorm]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        pumpColor: Color.None, //TODO: can add any amount to increase effect
        kind: Permanents.Sorcery,
        ability: {
            targets: Permanents.Players,
            effect: {
                drawX:true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Brainstorm
    },
    [CardType.Goblin]: {
        color:Color.Red,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        defaultAttributes:[Modifier.Berserk],
        sprite: CreatureSpriteIndex.Goblin
    },
    [CardType.Necromancy]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Permanents.CreaturesYourGraveyard,
            effect: {
                cardToHandFromGY: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Necromancy
    },
    [CardType.FierySpear]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Permanents.CreaturesOrPlayers,
            effect: {
                dmg: 1,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.FierySpear
    },
}
