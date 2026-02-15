import { CardType, Color, CreatureSpriteIndex, IconIndex, Modifier, Permanents, Target } from "../../../enum";

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
    [CardType.Temple]: {
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
            targets: Target.Creature,
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
            targets: Target.Creature,
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
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesOrPlayers,
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
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesAndPlayers,
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
            targets: Target.CreaturesYouControl,
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
            targets: Target.Self,
            effect: {
                hpPerLand: CardType.Forest,
                hpUp: 1,
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
            targets: Target.CreaturesAndPlayers,
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
            targets: Target.CreaturesYouControl,
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
            targets: Target.Players,
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
            targets: Target.CreaturesYourGraveyard,
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
            targets: Target.CreaturesOrPlayers,
            effect: {
                dmg: 1,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.FierySpear
    },
    [CardType.AssassinKnife]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AttackingCreatures,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Knife
    },
    [CardType.JellyFish]: {
        color:Color.Blue,
        defaultAtk: 2,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        sprite: CreatureSpriteIndex.Jellyfish
    },
    [CardType.DustStorm]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AttackingCreatures,
            effect: {
                dmg: 1,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Sandstorm
    },
    [CardType.Scry]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                viewHand: true,
                sprite: IconIndex.Debuff
            }
        },
        sprite: CreatureSpriteIndex.Brainstorm
    },
    [CardType.ForestCall]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                searchCreatureForTop: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.ForestCall
    },
    [CardType.Taunt]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                tauntPlayer: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Taunt
    },
    [CardType.WillowSpirit]:{
        color:Color.Green,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Green, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.ForestWalk],
        ability: null,
        sprite: CreatureSpriteIndex.Dryad
    },
    [CardType.VisitingGryphon]: {
        color:Color.White,
        defaultAtk: 1,
        defaultDef: 2,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Flying],
        ability: null,
        sprite: CreatureSpriteIndex.Gryphon
    },
    [CardType.MartyrPrayer]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                hpPerAttacker: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.MartyrPrayer
    },
    [CardType.RefuseDrone]: {
        color:Color.Black,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Flying],
        ability: null,
        sprite: CreatureSpriteIndex.Imp
    },
    [CardType.FaithlessKnight]: {
        color:Color.Black,
        defaultAtk: 2,
        defaultDef: 2,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.CantBlock],
        ability: null,
        sprite: CreatureSpriteIndex.Brigand
    },
    [CardType.FlashFlood]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllPlayers,
            effect: {
                discardAllAndDraw:true,
                sprite: IconIndex.Debuff
            }
        },
        sprite: CreatureSpriteIndex.Flood
    },
    [CardType.TracklessWilds]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind: Color.None, amount: 1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AttackingCreatures,
            effect: {
                resetMovement: true,
                sprite: IconIndex.Debuff
            }
        },
        sprite: CreatureSpriteIndex.Wilderness
    },
    [CardType.Defiance]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind: Color.None, amount: 1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                duration: 1,
                untap: true,
                atkUp: 1,
                defUp: 3,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Defiance
    },
    [CardType.Pollution]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind: Color.None, amount: 1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesAndPlayers,
            effect: {
                dmg: 1,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Pollution
    },
    [CardType.HolyMonk]: {
        color:Color.White,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.BlockerMaxPwr1],
        ability: null,
        sprite: CreatureSpriteIndex.Monk
    },
    [CardType.LandReform]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind: Color.None, amount: 1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                draw3TemplesIfLessLand: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Law
    },
    [CardType.GoblinSargeant]: {
        color:Color.Red,
        defaultAtk: 2,
        defaultDef: 1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[],
        ability: null,
        sprite: CreatureSpriteIndex.Goblin2
    },
    [CardType.BlackBear]: {
        color:Color.Green,
        defaultAtk: 2,
        defaultDef: 2,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[],
        ability: null,
        sprite: CreatureSpriteIndex.Bear
    },
    [CardType.FatGoblin]: {
        color:Color.Red,
        defaultAtk: 2,
        defaultDef: 2,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.CantBlock],
        ability: null,
        sprite: CreatureSpriteIndex.Goblin3
    },
    [CardType.CatBurglar]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Flying],
        ability: {
            effect: {
                lookAtHand:true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Goblin3
    },
    [CardType.FaithfulKnight]: {
        color:Color.White,
        defaultAtk: 2,
        defaultDef: 2,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[],
        ability: null,
        sprite: CreatureSpriteIndex.Knight
    },
    [CardType.DoubleFate]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                extraTurn: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Time
    },
    [CardType.Dementia]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                discard: 1,
                sprite: IconIndex.Debuff
            }
        },
        sprite: CreatureSpriteIndex.Mind
    },
    [CardType.Overgrowth]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                atkUp:4,
                defUp:4,
                duration: 1,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Giant
    },
    [CardType.Sprite]: {
        color:Color.Green,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Flying],
        ability: null,
        sprite: CreatureSpriteIndex.Sprite
    },
    [CardType.NaturesPaths]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                putForestInPlay: true,
                shuffle: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Giant
    },
    [CardType.Omen]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                viewTop3: true,
                shuffle: true,
                draw: 1,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Giant
    },
    [CardType.Owl]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Flying],
        ability: {
            effect: {
                draw: 1,
                discard: 1,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Owl
    },
    [CardType.Treant]: {
        color:Color.Green,
        defaultAtk: 3,
        defaultDef: 4,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: {
            effect: {
                destroyForest: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Treant
    },
    [CardType.Eruption]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                dmg: 2,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Volcano
    },
    [CardType.HolyMountain]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                hpPerLand: CardType.Desert,
                hpUp: 2,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.HolyMountain
    },
    [CardType.HeavenlyDew]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                hpUp: 4,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Heal
    },
    [CardType.SewerRats]: {
        color:Color.Black,
        defaultAtk: 2,
        defaultDef: 1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        sprite: CreatureSpriteIndex.Rats
    },
    [CardType.Tremors]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                dmgAsYourDeserts: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Earthquake
    },
    [CardType.Sunlight]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                hp3perBlackCreature:true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Sun
    },
    [CardType.Steadfast]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreaturesYouControl,
            effect: {
                defUp:3,
                duration:1,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Armor
    },
    [CardType.Crow]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 2,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultAttributes:[Modifier.Flying],
        defaultMoves: 1,
        ability: null,
        sprite: CreatureSpriteIndex.Crow
    },
    [CardType.BloomingEarth]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                play3Land: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.FertileSoil
    },
    [CardType.Truce]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllPlayers,
            effect: {
                draw: 2,
                hpUp: 2,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Scroll
    },
    [CardType.TidePool]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                tap: true,
                repeat: 3,
                sprite: IconIndex.Debuff
            }
        },
        sprite: CreatureSpriteIndex.Flood
    },
    [CardType.TreeClimbers]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesYouControl,
            effect: {
                sprite: IconIndex.Buff,
                attributes: [Modifier.BlockFlying]
            }
        },
        sprite: CreatureSpriteIndex.FertileSoil
    },
    [CardType.FireHammer]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesOrPlayers,
            effect: {
                dmg: 3,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Hammer
    },
    [CardType.CunningLure]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                taunt: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Lure
    },
}
