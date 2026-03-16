import { CardType, Category, Color, CreatureSpriteIndex, IconIndex, Modifier, Permanents, Target, Triggers } from "../../../enum";

export const Portal:Record<CardType, CardMeta> = {
    [CardType.City]: {
        color:Color.Black,
        category: null,
        defaultAttributes: null,
        kind: Permanents.Land,
        ability: {
            targets: Target.Self,
            tap: true,
            effect: {
                addMana: Color.Black,
                sprite: IconIndex.Black
            }
        },
        sprite: CreatureSpriteIndex.City
    },
    [CardType.Desert]: {
        color:Color.Red,
        defaultAttributes: null,
        category: null,
        kind: Permanents.Land,
        ability: {
            targets: Target.Self,
            tap: true,
            effect: {
                addMana: Color.Red,
                sprite: IconIndex.Red
            }
        },
        sprite: CreatureSpriteIndex.Desert
    },
    [CardType.Forest]: {
        color:Color.Green,
        defaultAttributes: null,
        category: null,
        kind: Permanents.Land,
        ability: {
            targets: Target.Self,
            tap: true,
            effect: {
                addMana: Color.Green,
                sprite: IconIndex.Green
            }
        },
        sprite: CreatureSpriteIndex.Forest
    },
    [CardType.Tower]: {
        color:Color.Blue,
        defaultAttributes: null,
        category: null,
        kind: Permanents.Land,
        ability: {
            targets: Target.Self,
            tap: true,
            effect: {
                addMana: Color.Blue,
                sprite: IconIndex.Blue
            }
        },
        sprite: CreatureSpriteIndex.Tower
    },
    [CardType.Temple]: {
        color:Color.White,
        defaultAttributes: null,
        category: null,
        kind: Permanents.Land,
        ability: {
            targets: Target.Self,
            tap: true,
            effect: {
                addMana: Color.White,
                sprite: IconIndex.White
            }
        },
        sprite: CreatureSpriteIndex.Sanctuary
    },
    [CardType.SkyPirates]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 1,
        category: Category.Human,
        cost: [{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes: [Modifier.Nimble, Modifier.Timid],
        ability: {
            targets: Target.Players,
            conditionalSpend: Color.Blue,
            effect: {
                sprite: IconIndex.Buff,
                lookAtTop3: true
            }
        },
        sprite: CreatureSpriteIndex.Skypirate
    },
    [CardType.FeatherCloak]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        category: null,
        kind: Permanents.Enchantment,
        ability: {
            targets: Target.Creature,
            effect: {
                addAttributes: [Modifier.Nimble],
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.FeatherCloak
    },
    [CardType.Sandstorm]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        category: null,
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
        category: null,
        ability: {
            targets: Target.AllCreaturesAndPlayers,
            effect: {
                dmgX: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Earthquake
    },
    [CardType.PeaceTreaty]: {
        color:Color.White,
        category: null,
        cost: [{kind:Color.White, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                tap:true,
                sprite: IconIndex.Debuff
            }
        },
        sprite: CreatureSpriteIndex.PeaceTreaty
    },
    [CardType.HeroicSoldier]: {
        color:Color.White,
        defaultAtk: 1,
        category: Category.Human,
        defaultDef: 1,
        cost: [{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: {
            targets: Target.ThisCreature,
            conditionalSpend: Color.White,
            effect: {
                defUp:1,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.HeroicSoldier
    },
    [CardType.FertileSoil]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1}],
        kind: Permanents.Sorcery,
        category: null,
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
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1}],
        pumpColor: Color.None,
        category: null,
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreaturesAndPlayers,
            withAttribute: Modifier.Nimble,
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
        category: Category.Beast,
        cost: [{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: {
            targets: Target.ThisCreature,
            conditionalSpend: Color.Green,
            effect: {
                sprite: IconIndex.Buff,
                addAttributes: [Modifier.Haste]
            }
        },
        defaultAttributes: [Modifier.Timid],
        sprite: CreatureSpriteIndex.ForestJackal
    },
    [CardType.MessengerOwl]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 1,
        category: Category.Beast,
        cost: [{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: {
            targets: Target.Self,
            conditionalSpend: Color.Blue,
            effect: {
                sprite: IconIndex.Buff,
                draw: 1
            }
        },
        sprite: CreatureSpriteIndex.MessengerOwl
    },
    [CardType.Refreshment]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1}],
        kind: Permanents.Sorcery,
        category:null,
        ability: {
            targets: Target.CreatureYouControl,
            effect: {
                untap: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Refreshment
    },
    [CardType.Bighorn]: {
        color:Color.Red,
        defaultAtk: 1,
        defaultDef: 1,
        category: Category.Beast,
        cost: [{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: {
            targets: Target.ThisCreature,
            conditionalSpend: Color.Red,
            effect: {
                sprite: IconIndex.Buff,
                atkUp:1
            }
        },
        defaultAttributes:[Modifier.DesertWalk],
        sprite: CreatureSpriteIndex.BillyGoat
    },
    [CardType.ScavengingRats]: {
        color:Color.Black,
        defaultAtk: 1,
        defaultDef: 1,
        category: Category.Beast,
        cost: [{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: {
            targets: Target.ThisCreature,
            conditionalSpend: Color.Black,
            effect: {
                sprite: IconIndex.Buff,
                addAttributes:[Modifier.CityWalk]
            }
        },
        sprite: CreatureSpriteIndex.ScavengingRats
    },
    [CardType.Memorize]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Sorcery,
        category: null,
        ability: {
            targets: Target.Self,
            effect:{
                searchSorceryForTop: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Memoize
    },
    [CardType.Brainstorm]: {
        color:Color.Blue,
        category:null,
        cost: [{kind:Color.Blue, amount:1}],
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
    [CardType.GoblinScrounger]: {
        color:Color.Red,
        defaultAtk: 1,
        defaultDef: 1,
        category: Category.Beastkin,
        cost: [{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: {
            targets: Target.ThisCreature,
            conditionalSpend: Color.Red,
            effect: {
                sprite: IconIndex.Buff,
                addAttributes:[Modifier.Haste]
            }
        },
        defaultAttributes:[Modifier.Timid],
        sprite: CreatureSpriteIndex.Goblin
    },
    [CardType.Necromancy]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1}],
        kind: Permanents.Sorcery,
        category: null,
        ability: {
            targets: Target.Self,
            effect: {
                creatureToHandFromGY: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Necromancy
    },
    [CardType.FierySpear]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Sorcery,
        category: null,
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
        category: null,
        ability: {
            targets: Target.Creature,
            //withCategory: Category.Human,
            effect: {
                addAttributes:[Modifier.Toxic],
                sprite: IconIndex.Damage 
            }
        },
        sprite: CreatureSpriteIndex.Knife
    },
    [CardType.Corvian]: {
        color:Color.Blue,
        defaultAtk: 2,
        defaultDef: 1,
        category: Category.Beast,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        ability: null,
        sprite: CreatureSpriteIndex.Corvian
    },
    [CardType.DustStorm]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Sorcery,
        category: null,
        ability: {
            targets: Target.AllCreatures,
            withoutAttribute: Modifier.Defender,
            effect: {
                dmg: 1,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Scry]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Sorcery,
        category: null,
        ability: {
            targets: Target.Players,
            effect: {
                lookAtHand: true,
                sprite: IconIndex.Debuff
            }
        },
        sprite: CreatureSpriteIndex.Scry
    },
    [CardType.ForestCall]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1}],
        kind: Permanents.Sorcery,
        category: null,
        ability: {
            targets: Target.Self,
            effect: {
                searchCreatureForTop: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.ForestCall
    },
    [CardType.Insult]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Sorcery,
        category: null,
        ability: {
            targets: Target.AllOpponentCreatures,
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
        category: Category.Spirit,
        cost: [{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.ForestWalk],
        ability: {
            targets: Target.LandsYouControl,
            conditionalSpend: Color.Green,
            effect: {
                sprite: IconIndex.Buff,
                transformInto: CardType.Forest
            }
        },
        sprite: CreatureSpriteIndex.Dryad
    },
    [CardType.VisitingGryphon]: {
        color:Color.White,
        defaultAtk: 1,
        defaultDef: 2,
        category: Category.Beastkin,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Nimble],
        ability: null,
        sprite: CreatureSpriteIndex.Gryphon
    },
    [CardType.MartyrPrayer]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Sorcery,
        category: null,
        ability: {
            targets: Target.Self,
            effect: {
                hpPerAttacker: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.MartyrPrayer
    },
    [CardType.Homonculus]: {
        color:Color.Black,
        defaultAtk: 1,
        defaultDef: 1,
        category: Category.Infernal,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Nimble],
        ability: null,
        sprite: CreatureSpriteIndex.Imp
    },
    [CardType.MercenaryKnight]: {
        color:Color.Black,
        defaultAtk: 2,
        defaultDef: 2,
        category: Category.Human,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Timid],
        ability: null,
        sprite: CreatureSpriteIndex.MercenaryKnight
    },
    [CardType.FlashFlood]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Sorcery,
        category:null,
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
            targets: Target.AllCreatures,
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
            targets: Target.AllCreaturesAndPlayers,
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
        defaultDef: 2,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        category: Category.Human,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Fearsome],
        ability: null,
        sprite: CreatureSpriteIndex.Monk
    },
    [CardType.LandReform]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                drawLandIfLess: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Law2
    },
    [CardType.Consecrate]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind: Color.None, amount: 1}],
        kind: Permanents.Enchantment,
        ability: {
            targets: Target.CreatureYouControl,
            effect: {
                addAttributes:[Modifier.Consecrate],
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Law
    },
    [CardType.GoblinSargeant]: {
        color:Color.Red,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        category: Category.Beastkin,
        defaultMoves: 1,
        defaultAttributes:[],
        ability: {
            targets: Target.Creature,
            withCategory: Category.Beastkin,
            tap: true,
            trigger: Triggers.AtWill,
            effect: {
                duration: 1,
                sprite: IconIndex.Buff,
                atkUp:1,
                defUp:1
            }
        },
        sprite: CreatureSpriteIndex.Goblin2
    },
    [CardType.BlackBear]: {
        color:Color.Green,
        defaultAtk: 2,
        defaultDef: 2,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        category: Category.Beast,
        defaultMoves: 1,
        defaultAttributes:[],
        ability: null,
        sprite: CreatureSpriteIndex.Bear
    },
    [CardType.Hobgoblin]: {
        color:Color.Red,
        defaultAtk: 3,
        defaultDef: 2,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        category: Category.Beastkin,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Timid],
        ability: null,
        sprite: CreatureSpriteIndex.Goblin3
    },
    [CardType.CatBurglar]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Creature,
        category: Category.Spirit,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Nimble],
        ability: {
            targets: Target.Players,
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
        category: Category.Human,
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
                discardAtRandom: 1,
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
        category: Category.Spirit,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Nimble],
        ability: null,
        sprite: CreatureSpriteIndex.Sprite
    },
    [CardType.Gardening]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                searchForLand: CardType.Forest,
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
                lookAtTop3Choose1: true,
                shuffle: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Giant
    },
    [CardType.Dragonling]: {
        color:Color.Blue,
        defaultAtk: 2,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Creature,
        category: Category.Beastkin,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Nimble],
        ability: {
            targets: Target.Self,
            effect: {
                draw: 1,
                discardAtRandom: 1,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Dragonling
    },
    [CardType.Treant]: {
        color:Color.Green,
        defaultAtk: 3,
        defaultDef: 4,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        category: Category.Elemental,
        defaultMoves: 1,
        ability: {
            required: true,
            targets: Target.LandsYouControl,
            withColor: Color.Green,
            maxOfOne: true,
            effect:{
                destroy: true,
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
    [CardType.DesertAsetic]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        category: Category.Human,
        ability: {
            targets: Target.Self,
            effect: {
                hpPerLand: CardType.Desert,
                hpUp: 2,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.DesertAsetic
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
    [CardType.HoldTheLine]: {
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
    [CardType.Falconer]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 2,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Creature,
        defaultAttributes:[Modifier.Nimble],
        defaultMoves: 1,
        ability: null,
        sprite: CreatureSpriteIndex.Falconer
    },
    [CardType.BloomingEarth]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                playExtraLand: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Truce]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreaturesAndPlayers,
            effect: {
                draw: 1,
                hpUp: 2,
                tap: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Scroll
    },
    [CardType.OminousSigns]: {
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
    [CardType.GuerillaTactics]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Enchantment,
        ability: {
            targets: Target.CreatureYouControl,
            effect: {
                sprite: IconIndex.Buff,
                addAttributes: [Modifier.Taunt]
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Fog]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                sprite: IconIndex.Debuff,
                removeAttribute: Modifier.Nimble,
                duration: 2
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
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
                addAttributes:[Modifier.Taunt],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.AngelicTouch]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                atkUp:3,
                defUp:3,
                duration:1,
                addAttributes:[Modifier.Nimble],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.PiercingStare]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                lookAtHand:true,
                drawForDeserts:true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.FlashOfLight]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            withoutColor:Color.White,
            effect: {
                tap:true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.StreetThugs]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultAttributes:[Modifier.CityWalk],
        sprite: CreatureSpriteIndex.Thug,
        ability:null
    },
    [CardType.BorderWatch]: {
        color:Color.White,
        defaultAtk:1,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultAttributes: [Modifier.Defender],
        sprite: CreatureSpriteIndex.Guard,
        ability:null
    },
    [CardType.SorcererApprentice]: {
        color:Color.Blue,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Apprentice,
        defaultAttributes:[Modifier.TowerAffinity],
        ability:{
            targets:Target.CreaturesOrPlayers,
            trigger: Triggers.AtWill,
            tap:true,
            effect:{
                dmg:1,
                sprite: IconIndex.Damage
            }
        }
    },
    [CardType.MountedPaladin]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Knight2,
        ability:{
            targets:Target.ThisCreature,
            trigger:Triggers.OnCombat,
            effect:{ 
                defUp:3,
                duration:1,
                sprite: IconIndex.Buff
            }
        }
    },
    [CardType.SpiritCloud]: {
        color:Color.Blue,
        defaultAtk:3,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.SpiritCloud,
        defaultAttributes:[Modifier.Nimble, Modifier.Timid],
        ability: null
    },
    [CardType.Banish]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                returnToHand: true,
                repeat: 2,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.TwistedGiant]: {
        color:Color.Red,
        defaultAtk:4,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.TwistedGiant,
        defaultAttributes:[Modifier.Timid],
        ability: null
    },
    [CardType.DeceptiveContract]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:3}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                draw: 4,
                dmg: 8,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Taskmaster]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                searchCardForTop: true,
                dmg: 2,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.DoubleCast]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                sorceryToHandFromGY: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.DruidicWarrior]: {
        color:Color.Green,
        defaultAtk:2,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.DruidicWarrior,
        defaultAttributes:[Modifier.ForestWalk],
        ability: null
    },
    [CardType.DruidicAmbusher]: {
        color:Color.Green,
        defaultAtk:4,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        defaultAttributes:[Modifier.Ranged],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.DruidicAmbusher,
        ability: null
    },
    [CardType.Roaches]: {
        color:Color.Black,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Roaches,
        defaultAttributes: [Modifier.Undying]
    },
    [CardType.Thunderclap]: {
        color:Color.Blue,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllOpponentCreatures,
            effect: {
                tap: true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.ShadowForm]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.ShadowForm,
        ability:null,
        defaultAttributes:[Modifier.Nimble] 
    },
    [CardType.FireImp]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.FireImp,
        ability:{
            targets: Target.Creature,
            effect: {
                dmg: 2,
                sprite: IconIndex.Damage
            }
        },
    },
    [CardType.Cycle]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllPlayers,
            effect: {
                discardToDraw:true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Gorilla]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        category: Category.Beast,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Gorilla,
        ability:null
    },
    [CardType.CullWeaklings]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            def3orLess: true,
            effect: {
                destroy:true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Justice]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                damageReflect: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.ArmoredTortoise]: {
        color:Color.Blue,
        defaultAtk:1,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.ArmoredTortoise,
        ability:null
    },
    [CardType.ContractKiller]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                atkUp: 4,
                duration: 1,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Longbowmen]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Longbowmen,
        defaultAttributes:[Modifier.Ranged],
        ability:null
    },
    [CardType.Assassin]: {
        color:Color.Black,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:0,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        defaultAttributes: [Modifier.Defender],
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.TappedCreatures,
            trigger: Triggers.AtWill,
            tap: true,
            def3orLess: true,
            effect: {
                sprite: IconIndex.Damage,
                destroy: true
            }
        }
    },
    [CardType.Sophist]: {
        color:Color.Blue,
        defaultAtk:2,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.Creature,
            effect: {
                returnToHand: true,
                sprite: IconIndex.Debuff
            }
        }
    },
    [CardType.Mercenary]: {
        color:Color.Black,
        defaultAtk:4,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.CreatureYouControl,
            effect: {
                destroyOrReturnThis: true,
                sprite: IconIndex.Debuff
            }
        }
    },
    [CardType.Hypnotize]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                discardAtRandom: 2,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.MinotaurServant]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        category: Category.Beastkin,
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.ForceOfWill]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.TappedCreatures,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.ForestSense]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreatureYouControl,
            effect: {
                duration:1,
                addAttributes:[Modifier.ForestWalk],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Pathfinding]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreaturesYouControl,
            effect: {
                addAttributes: [Modifier.ForestWalk],
                duration: 1,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Hailstorm]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            withAttribute: Modifier.Nimble,
            effect: {
                dmg: 4,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.CursedToad]: {
        color:Color.Black,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.DementiaCloud]
    },
    [CardType.PSIWarrior]: {
        color:Color.Blue,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.Unblockable]
    },
    [CardType.LabSpecimen]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Fearsome,Modifier.Timid],
        ability:null
    },
    [CardType.Cougar]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Haste],
        ability:null
    },
    [CardType.AcidRain]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Lands,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Unicorn]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes:[Modifier.ProtectionFromBlack]
    },
    [CardType.CultLeader]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.Self,
            effect:{
                dmg: 3,
                sprite: IconIndex.Damage
            }
        },
        defaultAttributes:[Modifier.ProtectionFromWhite]
    },
    [CardType.FieldMarshal]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            tap: true,
            targets: Target.Creature,
            trigger: Triggers.AtWill,
            effect:{
                duration: 1,
                atkUp: 2,
                defUp: 2,
                sprite: IconIndex.Buff
            }
        }
    },
    [CardType.Sinkhole]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Lands,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.HolySymbol]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                returnToHand: true,
                draw: 1,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Premonition]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                drawForTappedOpponent: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.VexingRiddle]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Enchantment,
        ability: {
            targets: Target.Creature,
            effect: {
                addAttributes:[Modifier.Defender],
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.BurrowingWurm]: {
        color:Color.Green,
        defaultAtk:4,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.BurrowingWurm,
        ability:{
            required: true,
            targets: Target.LandsYouControl,
            withColor: Color.Green,
            maxOfOne: true,
            effect:{
                destroy: true,
                sprite: IconIndex.Buff
            }
        }
    },
    [CardType.Slow]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                returnToHand: true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.HiddenGrove]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                searchForLand: CardType.Forest,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.RighteousCharge]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            withColor: Color.White,
            effect: {
                atkUp: 2,
                duration: 1,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.DebtCollection]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                dmg: 2,
                casterHpUp: 2,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.VenerableMonk]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.Self,
            effect:{
                hpUp: 2,
                sprite: IconIndex.Buff
            }
        }
    },
    [CardType.Collectivization]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            withColor: Color.White,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.GraniteWall]: {
        color:Color.Red,
        defaultAtk:0,
        defaultDef:7,
        defaultMoves:0,
        defaultAttributes: [Modifier.Defender],
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.BattlePrayer]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreatureYouControl,
            effect: {
                atkUp: 1,
                defUp: 1,
                duration: 1,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Conspiracy]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            withoutColor: Color.Black,
            effect: {
                repeat: 2,
                destroy: true,
                casterDmg: 3,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.AirDrake]: {
        color:Color.Blue,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.Nimble]
    },
    [CardType.Blizzard]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Lands,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Blizzard
    },
    [CardType.DruidLoremaster]: {
        color:Color.Green,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.Self,
            effect: {
                sprite: IconIndex.Buff,
                searchForLand: CardType.Forest,
                shuffle: true
            }
        }
    },
    [CardType.Anaconda]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.CityWalk]
    },
    [CardType.Reckoning]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllLands,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.BeeSwarm]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Enchantment,
        ability: {
            targets: Target.LandsYouControl,
            effect: {
                addAttributes: [Modifier.BeeSting],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Boggart]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.CityWalk]
    },
    [CardType.VolcanicVent]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllLands,
            withColor: Color.Blue,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Fear]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreaturesYouControl,
            withColor: Color.Black,
            effect: {
                duration: 1,
                sprite: IconIndex.Damage,
                addAttributes:[Modifier.Unblockable]
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.LastGasp]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                dmgAsCreaturePower: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Resurrection]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesYourGraveyard,
            effect: {
                sprite: IconIndex.Buff,
                returnToBattle: true
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.DruidicScholar]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.TowerWalk]
    },
    [CardType.DustDevil]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        category: Category.Elemental,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.Nimble]
    },
    [CardType.SecretCache]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.YourGraveyard,
            effect: {
                sprite: IconIndex.Buff,
                returnToHand: true
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.AshCloud]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllLands,
            withColor: Color.White,
            effect: {
                sprite: IconIndex.Buff,
                destroy: true,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.FootSoldier]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
    },
    [CardType.Lightning]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                sprite: IconIndex.Damage,
                lightningSpecial: true
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.SquidLord]: {
        color:Color.Blue,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
    },
    [CardType.GiantSpider]: {
        color:Color.Green,
        defaultAtk:2,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes:[Modifier.Taunt]
    },
    [CardType.Graverobber]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.CreaturesYourGraveyard,
            effect: {
                sprite: IconIndex.Buff,
                creatureToHandFromGY: true
            }
        },
    },
    [CardType.LivingStones]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.RockTroll]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.LizardWarrior]: {
        color:Color.Red,
        defaultAtk:4,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.CircleOfLife]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
                creatureToHandFromLibrary: true
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.WayOfPeace]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
                hpToOwner:4
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.NomadicRaiders]: {
        color:Color.Red,
        defaultAtk:5,
        defaultDef:5,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.Self,
            effect: {
                sprite: IconIndex.Damage,
                discardAtRandom: 1
            }
        }
    },
    [CardType.Minotaur]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:2,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null
    },
    [CardType.RowanTreant]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:4,
        defaultMoves:1,
        category: Category.Spirit,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null
    },
    [CardType.VeteranExorcist]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes: [Modifier.ProtectionFromBlack]
    },
    [CardType.MasterTactician]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.Creature,
            trigger: Triggers.AtWill,
            effect: {
                tap: true,
                sprite:IconIndex.Debuff
            }
        },
    },
    [CardType.Addict]: {
        color:Color.Black,
        defaultAtk:5,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        category: Category.Human,
        ability: {
            targets: Target.ThisCreature,
            conditionalSpend: Color.Black,
            effect: {
                sprite: IconIndex.Buff,
                addAttributes:[Modifier.Haste]
            }
        },
    },
    [CardType.ProtoDrake]: {
        color:Color.Blue,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes:[Modifier.Nimble]
    },
    [CardType.ElderGriffin]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes:[Modifier.Nimble]
    },
    [CardType.SavannaLion]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes:[Modifier.ForestWalk]
    },
    [CardType.FlashOfInsight]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                draw: 2,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.CartelEnforcer]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Undying]
    },
    [CardType.Retribution]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                retribution: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.SwordWall]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:5,
        defaultMoves:0,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Nimble, Modifier.Defender],
        ability:null
    },
    [CardType.Judgement]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.CollectiveMemory]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:3},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                draw: 7,
                discard: 5,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.SteadfastMonk]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:5,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Vigilant],
        ability:null
    },
    [CardType.SavyPolitico]: {
        color:Color.Black,
        defaultAtk:4,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Nimble],
        ability:null
    },
    [CardType.Meritocracy]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                drawIfFewerCards: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Riot]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Riot,
        ability: {
            targets: Target.ThisCreature,
            whenAttackingLand: CardType.City,
            effect: {
                sprite: IconIndex.Buff,
                atkUp: 2
            }
        }
    },
    [CardType.RhinoCharge]: {
        color:Color.Green,
        defaultAtk:4,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes:[Modifier.Fearsome]
    },
    [CardType.SealFate]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                arrangeTop5Remove1: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Salamander]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:4}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.Lands,
            trigger: Triggers.OnDeath,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage
            }
        },
    },
    [CardType.WanderingSpirit]: {
        color:Color.Red,
        defaultAtk:5,
        defaultDef:5,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes: [Modifier.Timid]
    },
    [CardType.MagmaBurst]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                dmg: 5,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.ShiftingSands]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreatureOrLand,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.DeepSprings]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                hpUp: 8,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.WerewolfRaider]: {
        color:Color.Green,
        defaultAtk:6,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null
    },
    [CardType.SpiritsOfWorldTree]: {
        color:Color.Green,
        defaultAtk:8,
        defaultDef:8,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:3},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.SpiritsOfWorldTree,
        ability: {
            required: true,
            targets: Target.LandsYouControl,
            withColor: Color.Green,
            maxOfOne: true,
            effect: {
                sprite: IconIndex.Damage,
                destroy: true,
                repeat: 2
            }
        }
    },
    [CardType.RedwoodTreant]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:6,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null
    },
    [CardType.HoodooHealer]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.Creature,
            withoutColor: Color.Black,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage
            }
        }
    },
    [CardType.LifeSteal]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                hpUp: 3,
                dmg: 3,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Grizzly]: {
        color:Color.Green,
        defaultAtk:5,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        category: Category.Beast,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null
    },
    [CardType.GuardianAngel]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        category: Category.Celestial,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.Self,
            effect: {
                sprite: IconIndex.Buff,
                hpUp: 4
            }
        }
    },
    [CardType.ShroudedApostle]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Fearsome, Modifier.ProtectionFromBlack],
        ability: null
    },
    [CardType.Phoenix]: {
        color:Color.White,
        defaultAtk:4,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Nimble, Modifier.Undying]
    },
    [CardType.BlueDragon]: {
        color:Color.Blue,
        defaultAtk:5,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:5}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Nimble, Modifier.TowerAffinity],
        ability: null
    },
    [CardType.Megoladon]: {
        color:Color.Blue,
        defaultAtk:5,
        defaultDef:5,
        defaultMoves:0,
        defaultAttributes: [Modifier.Defender],
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:4}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null
    },
    [CardType.ChaosServant]: {
        color:Color.Black,
        defaultAtk:6,
        defaultDef:5,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        category: Category.Infernal,
        ability: {
            targets: Target.Self,
            effect: {
                sprite: IconIndex.Damage,
                dmg: 5
            }
        },
        defaultAttributes: [Modifier.Nimble]
    },
    [CardType.SulfurRain]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Lands,
            effect: {
                destroy: true,
                repeat: 2,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Derecho]: {
        color:Color.Red,
        defaultAtk:5,
        defaultDef:5,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:5}],
        defaultAttributes:[Modifier.Haste],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.CreaturesInLane,
            effect: {
                sprite: IconIndex.Damage,
                tap: true
            }
        }
    },
    [CardType.RedDragon]: {
        color:Color.Red,
        defaultAtk:4,
        defaultDef:4,
        defaultMoves:2,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:5}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Nimble],
        ability: null
    },
    [CardType.Archangel]: {
        color:Color.White,
        defaultAtk:5,
        defaultDef:5,
        defaultMoves:2,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:5}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Nimble, Modifier.Vigilant],
        ability: null
    },
    [CardType.Genie]: {
        color:Color.Blue,
        defaultAtk:5,
        defaultDef:6,
        defaultMoves:2,
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:5}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Nimble],
        ability: null
    },
    [CardType.ObsidianGargoyle]: {
        color:Color.Black,
        defaultAtk:5,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:3},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Nimble],
        ability: {
            targets: Target.Players,
            effect: {
                sprite: IconIndex.Debuff,
                discardAtRandom: 1
            }
        }
    },
    [CardType.Firestorm]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:5}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreaturesAndPlayers,
            effect: {
                dmg: 6,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Financier]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:3},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesOrPlayers,
            effect: {
                dmg: 4,
                hpUp: 4,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Erosion]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Lands,
            effect: {
                transformInto: CardType.Desert,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.FeralSpirit]: {
        color:Color.Green,
        defaultAtk:8,
        defaultDef:5,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:3},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Fearsome],
        ability: {
            targets: Target.AllOpponentCreatures,
            effect: {
                tauntPlayer: true,
                sprite: IconIndex.Buff
            }
        },
    },
    [CardType.FireHydra]: {
        color:Color.Red,
        defaultAtk:6,
        defaultDef:6,
        defaultMoves:2,
        cost: [{kind:Color.Red, amount:3},{kind:Color.None, amount:6}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Nimble],
        ability: {
            targets: Target.Creature,
            effect: {
                sprite: IconIndex.Damage,
                dmgAsYourDeserts: true
            }
        }
    },
    [CardType.KnowledgeAssimilator]: {
        color:Color.Blue,
        defaultAtk:5,
        defaultDef:6,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:3},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.Self,
            trigger: Triggers.OnCombat,
            effect: {
                sprite: IconIndex.Damage,
                draw:1
            }
        }
    },
}