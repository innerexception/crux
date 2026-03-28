import { CardType, Category, Color, CreatureSpriteIndex, IconIndex, Modifier, Permanents, Target, Triggers } from "../../../enum";

export const Portal:Record<CardType, CardMeta> = {
    [CardType.City]: {
        color:Color.Black,
        category: null,
        defaultAttributes: null,
        defaultAtk:0,
        defaultDef:0,
        kind: Permanents.Land,
        gold:1,
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
        gold:1,
        defaultAtk:0,
        defaultDef:0,
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
        defaultAtk:0,
        defaultDef:0,
        category: null,
        kind: Permanents.Land,
        gold:1,
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
        defaultAtk:0,
        defaultDef:0,
        category: null,
        kind: Permanents.Land,
        gold:1,
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
        defaultAtk:0,
        defaultDef:0,
        category: null,
        kind: Permanents.Land,
        gold:1,
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
        gold:1,
        
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
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                addAttributes: [Modifier.Nimble],
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.FeatherCloak
    },
    [CardType.StingingWinds]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Enchantment,
        gold:1,
        ability: {
            targets: Target.Land,
            effect: {
                addAttributes: [Modifier.StingingWinds],
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.StingingWinds
    },
    [CardType.Sandstorm]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        category: null,
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.CreatureOrPlayer,
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
        gold:1,
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
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                duration: 2,
                pacifism:true,
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
        gold:1,
        
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
        gold:1,
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
        gold:1,
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
        gold:1,
        
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
        gold:1,
        
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
        gold:1,
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
        gold:1,
        
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
        gold:1,
        
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
        gold:1,
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
        gold:1,
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
        gold:1,
        
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
        gold:1,
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
        gold:1,
        category: null,
        ability: {
            targets: Target.CreatureOrPlayer,
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
        gold:1,
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
        gold:1,
        
        ability: null,
        sprite: CreatureSpriteIndex.Corvian
    },
    [CardType.DustStorm]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        category: null,
        ability: {
            targets: Target.AllCreatures,
            withoutAttribute: Modifier.Defender,
            effect: {
                dmg: 1,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.DustStorm
    },
    [CardType.Scry]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
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
        gold:1,
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
        gold:1,
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
        gold:1,
        
        defaultAttributes:[Modifier.ForestWalk],
        ability: {
            targets: Target.LandYouControl,
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
        gold:1,
        
        defaultAttributes:[Modifier.Nimble],
        ability: null,
        sprite: CreatureSpriteIndex.Gryphon
    },
    [CardType.MartyrPrayer]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Sorcery,
        gold:1,
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
        gold:1,
        
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
        gold:1,
        
        defaultAttributes:[Modifier.Timid],
        ability: null,
        sprite: CreatureSpriteIndex.MercenaryKnight
    },
    [CardType.FlashFlood]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
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
        gold:1,
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
        gold:1,
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
        gold:1,
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
        gold:1,
        category: Category.Human,
        
        defaultAttributes:[Modifier.Fearsome],
        ability: null,
        sprite: CreatureSpriteIndex.Monk
    },
    [CardType.LandReform]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
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
        gold:1,
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
        gold:1,
        category: Category.Beastkin,
        
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
        gold:1,
        category: Category.Beast,
        
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
        gold:1,
        category: Category.Beastkin,
        
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
        gold:1,
        category: Category.Spirit,
        
        defaultAttributes:[Modifier.Nimble],
        ability: {
            targets: Target.Players,
            effect: {
                lookAtHand:true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.CatBurglar
    },
    [CardType.FaithfulKnight]: {
        color:Color.White,
        defaultAtk: 2,
        defaultDef: 2,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        gold:1,
        category: Category.Human,
        
        defaultAttributes:[],
        ability: null,
        sprite: CreatureSpriteIndex.Knight
    },
    [CardType.DoubleFate]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2}],
        kind: Permanents.Sorcery,
        gold:1,
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
        gold:1,
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
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                atkUp:4,
                defUp:4,
                duration: 1,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Overgrowth
    },
    [CardType.Sprite]: {
        color:Color.Green,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        gold:1,
        category: Category.Spirit,
        
        defaultAttributes:[Modifier.Nimble],
        ability: null,
        sprite: CreatureSpriteIndex.Sprite
    },
    [CardType.Omen]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                lookAtTop3Choose1: true,
                shuffle: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.Omen
    },
    [CardType.Dragonling]: {
        color:Color.Blue,
        defaultAtk: 2,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        category: Category.Beastkin,
        
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
        gold:1,
        category: Category.Elemental,
        
        ability: {
            required: true,
            targets: Target.LandYouControl,
            withColor: Color.Green,
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
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                dmg: 2,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Volcano
    },
    [CardType.DesertAscetic]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
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
        gold:1,
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
        gold:1,
        
        ability: null,
        sprite: CreatureSpriteIndex.Rats
    },
    [CardType.Tremors]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                dmgAsDeserts: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.Earthquake
    },
    [CardType.Sunlight]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
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
        gold:1,
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
        gold:1,
        defaultAttributes:[Modifier.Ranged],
        
        ability: null,
        sprite: CreatureSpriteIndex.Falconer
    },
    [CardType.BloomingEarth]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                playExtraLand: true,
                sprite: IconIndex.Buff
            }
        },
        sprite: CreatureSpriteIndex.BloomingEarth
    },
    [CardType.Truce]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
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
        gold:1,
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
        gold:1,
        ability: {
            targets: Target.CreatureYouControl,
            effect: {
                sprite: IconIndex.Buff,
                addAttributes: [Modifier.Taunt]
            }
        },
        sprite: CreatureSpriteIndex.GuerillaTactics
    },
    [CardType.Fog]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                sprite: IconIndex.Debuff,
                removeAttribute: Modifier.Nimble,
                duration: 2
            }
        },
        sprite: CreatureSpriteIndex.Fog
    },
    [CardType.FireHammer]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.CreatureOrPlayer,
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
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                addAttributes:[Modifier.Taunt],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.CunningLure
    },
    [CardType.AngelicTouch]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        gold:1,
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
        sprite: CreatureSpriteIndex.AngelicTouch
    },
    [CardType.PiercingStare]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Players,
            effect: {
                lookAtHand:true,
                drawForDeserts:true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.PiercingStare
    },
    [CardType.FlashOfLight]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            withoutColor:Color.White,
            effect: {
                tap:true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.FlashOfLight
    },
    [CardType.StreetThugs]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        defaultAttributes:[Modifier.CityWalk],
        sprite: CreatureSpriteIndex.Thug,
        ability:null
    },
    [CardType.BorderWatch]: {
        color:Color.White,
        defaultAtk:1,
        defaultDef:4,
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        defaultAttributes: [Modifier.Defender],
        sprite: CreatureSpriteIndex.Guard,
        ability:null
    },
    [CardType.SorcererApprentice]: {
        color:Color.Blue,
        defaultAtk:1,
        defaultDef:1,
        
        cost: [{kind:Color.Blue, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Apprentice,
        defaultAttributes:[Modifier.TowerAffinity],
        ability:{
            targets:Target.CreatureOrPlayer,
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
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
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
        
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.SpiritCloud,
        defaultAttributes:[Modifier.Nimble, Modifier.Timid],
        ability: null
    },
    [CardType.Banish]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                returnToHand: true,
                repeat: 2,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Banish
    },
    [CardType.TwistedGiant]: {
        color:Color.Red,
        defaultAtk:4,
        defaultDef:1,
        
        cost: [{kind:Color.Red, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.TwistedGiant,
        defaultAttributes:[Modifier.Timid],
        ability: null
    },
    [CardType.DeceptiveContract]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:3}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                draw: 4,
                dmg: 8,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.DeceptiveContract
    }, 
    [CardType.Taskmaster]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                searchCardForTop: true,
                dmg: 2,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Taskmaster
    },
    [CardType.DoubleCast]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                sorceryToHandFromGY: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.DoubleCast
    },
    [CardType.DruidicWarrior]: {
        color:Color.Green,
        defaultAtk:2,
        defaultDef:3,
        
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.DruidicWarrior,
        defaultAttributes:[Modifier.ForestWalk],
        ability: null
    },
    [CardType.DruidicAmbusher]: {
        color:Color.Green,
        defaultAtk:4,
        defaultDef:1,
        
        cost: [{kind:Color.Green, amount:2}],
        defaultAttributes:[Modifier.Ranged],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.DruidicAmbusher,
        ability: null
    },
    [CardType.Roaches]: {
        color:Color.Black,
        defaultAtk:1,
        defaultDef:1,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Roaches,
        defaultAttributes: [Modifier.Undying]
    },
    [CardType.Thunderclap]: {
        color:Color.Blue,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllOpponentCreatures,
            effect: {
                tap: true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Thunderclap
    },
    [CardType.ShadowForm]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:1,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.ShadowForm,
        ability:null,
        defaultAttributes:[Modifier.Nimble] 
    },
    [CardType.FireImp]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:1,
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
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
        gold:1,
        ability: {
            targets: Target.AllPlayers,
            effect: {
                discardToDraw:true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Cycle
    },
    [CardType.Gorilla]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:2,
        
        category: Category.Beast,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Gorilla,
        ability:null
    },
    [CardType.CullWeaklings]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            def3orLess: true,
            effect: {
                destroy:true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.CullWeaklings
    },
    [CardType.Justice]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                damageReflect: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Justice
    },
    [CardType.ArmoredTortoise]: {
        color:Color.Blue,
        defaultAtk:1,
        defaultDef:4,
        
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.ArmoredTortoise,
        ability:null
    },
    [CardType.ContractKiller]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                atkUp: 4,
                duration: 1,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.ContractKiller
    },
    [CardType.Longbowmen]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Longbowmen,
        defaultAttributes:[Modifier.Ranged],
        ability:null
    },
    [CardType.Assassin]: {
        color:Color.Black,
        defaultAtk:1,
        defaultDef:1,
        
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        defaultAttributes: [Modifier.Defender],
        sprite: CreatureSpriteIndex.Assassin,
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
        
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Sophist,
        ability:{
            targets: Target.Creature,
            effect: {
                returnToHand: true,
                sprite: IconIndex.Debuff
            }
        }
    },
    [CardType.MercenaryCaptain]: {
        color:Color.Black,
        defaultAtk:4,
        defaultDef:4,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.MercenaryCaptain,
        ability:{
            targets: Target.CreatureYouControl,
            required: true,
            effect: {
                destroy: true,
                sprite: IconIndex.Debuff
            }
        }
    },
    [CardType.Hypnotize]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Players,
            effect: {
                discardAtRandom: 2,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Hypnotize
    },
    [CardType.DrometaurSpearhand]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:3,
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        category: Category.Beastkin,
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.DrometaurSpearhand
    },
    [CardType.ForceOfWill]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.TappedCreatures,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.ForceOfWill
    },
    [CardType.Pathfinding]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreaturesYouControl,
            effect: {
                addAttributes: [Modifier.ForestWalk],
                duration: 1,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Pathfinding
    },
    [CardType.Hailstorm]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            withAttribute: Modifier.Nimble,
            effect: {
                dmg: 4,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Hailstorm
    },
    [CardType.CursedToad]: {
        color:Color.Black,
        defaultAtk:1,
        defaultDef:1,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.CursedToad,
        defaultAttributes: [Modifier.DementiaCloud]
    },
    [CardType.PSIWarrior]: {
        color:Color.Blue,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.PSIWarrior,
        ability:null,
        defaultAttributes: [Modifier.Unblockable]
    },
    [CardType.LabSpecimen]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:2,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.LabSpecimen,
        defaultAttributes:[Modifier.Fearsome,Modifier.Timid],
        ability:null
    },
    [CardType.Cougar]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Cougar,
        defaultAttributes:[Modifier.Haste],
        ability:null
    },
    [CardType.AcidRain]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Land,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.AcidRain
    },
    [CardType.Unicorn]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:3,
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Unicorn,
        ability:null,
        defaultAttributes:[Modifier.ProtectionFromBlack]
    },
    [CardType.CultLeader]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:3,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.CultLeader,
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
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.FieldMarshal,
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
        gold:1,
        ability: {
            targets: Target.Land,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Sinkhole
    },
    [CardType.HolySymbol]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                returnToHand: true,
                draw: 1,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.HolySymbol
    },
    [CardType.Premonition]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:2}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                drawForTappedOpponent: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Premonition
    },
    [CardType.VexingRiddle]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Enchantment,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                addAttributes:[Modifier.Defender],
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.VexingRiddle
    },
    [CardType.BurrowingWurm]: {
        color:Color.Green,
        defaultAtk:4,
        defaultDef:4,
        
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.BurrowingWurm,
        defaultAttributes:[Modifier.Vigilant],
        ability:{
            required: true,
            targets: Target.LandYouControl,
            withColor: Color.Green,
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
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                returnToHand: true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Slow
    },
    [CardType.HiddenGrove]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                searchForLand: CardType.Forest,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Gardening
    },
    [CardType.RighteousCharge]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            withColor: Color.White,
            effect: {
                atkUp: 2,
                duration: 1,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.RighteousCharge
    },
    [CardType.DebtCollection]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Players,
            effect: {
                dmg: 2,
                casterHpUp: 2,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.DebtCollection
    },
    [CardType.VenerableMonk]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.VenerableMonk,
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
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            withColor: Color.White,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Collectivization
    },
    [CardType.GraniteWall]: {
        color:Color.Red,
        defaultAtk:0,
        defaultDef:7,
        
        defaultAttributes: [Modifier.Defender],
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.GraniteWall,
        ability:null
    },
    [CardType.BattlePrayer]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.CreatureYouControl,
            effect: {
                atkUp: 1,
                defUp: 1,
                duration: 1,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.BattlePrayer
    },
    [CardType.Conspiracy]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
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
        sprite: CreatureSpriteIndex.Conspiracy
    },
    [CardType.AirDrake]: {
        color:Color.Blue,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.AirDrake,
        ability:null,
        defaultAttributes: [Modifier.Nimble]
    },
    [CardType.Blizzard]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Land,
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
        
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.OldMage,
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
        
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Anaconda,
        ability:null,
        defaultAttributes: [Modifier.CityWalk]
    },
    [CardType.Reckoning]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllLands,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Reckoning
    },
    [CardType.GreatHive]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Enchantment,
        gold:1,
        ability: {
            targets: Target.LandYouControl,
            effect: {
                addAttributes: [Modifier.BeeSting],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.GreatHive
    },
    [CardType.Boggart]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:3,
        
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Boggart,
        ability:null,
        defaultAttributes: [Modifier.CityWalk]
    },
    [CardType.VolcanicVent]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllLands,
            withColor: Color.Blue,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.VolcanicVent
    },
    [CardType.TheFear]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreaturesYouControl,
            withColor: Color.Black,
            effect: {
                duration: 1,
                sprite: IconIndex.Damage,
                addAttributes:[Modifier.Unblockable]
            }
        },
        sprite: CreatureSpriteIndex.Fear
    },
    [CardType.LastGasp]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.CreatureYouControl,
            effect: {
                dmgAsCreaturePower: true,
                sprite: IconIndex.Damage
            }
        },
        sprite: CreatureSpriteIndex.LastGasp
    },
    [CardType.Resurrection]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.CreaturesYourGraveyard,
            effect: {
                sprite: IconIndex.Buff,
                returnToBattle: true
            }
        },
        sprite: CreatureSpriteIndex.Resurrection
    },
    [CardType.DruidicScholar]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:3,
        
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.DruidicScholar,
        ability:null,
        defaultAttributes: [Modifier.TowerWalk]
    },
    [CardType.DustDevil]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        category: Category.Elemental,
        sprite: CreatureSpriteIndex.DustDevil,
        ability:null,
        defaultAttributes: [Modifier.Nimble]
    },
    [CardType.SecretCache]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.YourGraveyard,
            effect: {
                sprite: IconIndex.Buff,
                returnToHand: true
            }
        },
        sprite: CreatureSpriteIndex.SecretCache
    },
    [CardType.AshCloud]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllLands,
            withColor: Color.White,
            effect: {
                sprite: IconIndex.Buff,
                destroy: true,
            }
        },
        sprite: CreatureSpriteIndex.AshCloud
    },
    [CardType.FootSoldier]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:4,
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.FootSoldier,
        ability:null,
    },
    [CardType.ForkLightning]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.CreatureOrPlayer,
            effect: {
                sprite: IconIndex.Damage,
                repeat:3,
                dmg:1
            }
        },
        sprite: CreatureSpriteIndex.ForkLightning
    },
    [CardType.SquidLord]: {
        color:Color.Blue,
        defaultAtk:3,
        defaultDef:3,
        
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.SquidLord,
        ability:null,
    },
    [CardType.GiantSpider]: {
        color:Color.Green,
        defaultAtk:2,
        defaultDef:4,
        
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.GiantSpider,
        ability:null,
        defaultAttributes:[Modifier.Taunt]
    },
    [CardType.Graverobber]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Graverobber,
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
        
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.LivingStones,
        ability:null
    },
    [CardType.RockTroll]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:3,
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.RockTroll,
        ability:null
    },
    [CardType.LizardWarrior]: {
        color:Color.Red,
        defaultAtk:4,
        defaultDef:2,
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.LizardWarrior,
        ability:null
    },
    [CardType.CircleOfLife]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.CreatureYouControl,
            required: true,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
                creatureToHandFromCodex: true
            }
        },
        sprite: CreatureSpriteIndex.CircleOfLife
    },
    [CardType.WayOfPeace]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
                hpToOwner:4
            }
        },
        sprite: CreatureSpriteIndex.WayOfPeace
    },
    [CardType.MountedHorde]: {
        color:Color.Red,
        defaultAtk:5,
        defaultDef:5,
        
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.MountedHorde,
        ability: {
            targets: Target.Self,
            effect: {
                sprite: IconIndex.Damage,
                discardAtRandom: 1
            }
        }
    },
    [CardType.RowanTreant]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:4,
        
        category: Category.Spirit,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.RowanTreant,
        ability: null
    },
    [CardType.VeteranExorcist]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:2,
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.VeteranExorcist,
        ability: null,
        defaultAttributes: [Modifier.ProtectionFromBlack]
    },
    [CardType.MasterTactician]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.MasterTactician,
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
        
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Addict,
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
        
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.ProtoDrake,
        ability: null,
        defaultAttributes:[Modifier.Nimble]
    },
    [CardType.ElderGriffin]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:3,
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.ElderGriffin,
        ability: null,
        defaultAttributes:[Modifier.Nimble]
    },
    [CardType.SavannaLion]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:3,
        
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.SavannaLion,
        ability: null,
        defaultAttributes:[Modifier.ForestWalk]
    },
    [CardType.FlashOfInsight]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                draw: 2,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.FlashOfInsight
    },
    [CardType.CartelEnforcer]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:2,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.CartelEnforcer,
        defaultAttributes:[Modifier.Undying]
    },
    [CardType.Retribution]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                duration:1,
                addAttributes:[Modifier.Retribution],
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Retribution
    },
    [CardType.SwordWall]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:5,
        
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.SwordWall,
        defaultAttributes: [Modifier.Nimble, Modifier.Defender],
        ability:null
    },
    [CardType.Judgement]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Judgement
    },
    [CardType.CollectiveMemory]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:3},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Self,
            effect: {
                draw: 7,
                discard: 5,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.CollectiveMemory
    },
    [CardType.Stylite]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:5,
        
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Stylite,
        defaultAttributes: [Modifier.Vigilant, Modifier.Defender],
        ability:null
    },
    [CardType.SavyPolitico]: {
        color:Color.Black,
        defaultAtk:4,
        defaultDef:3,
        
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.SavyPolitico,
        defaultAttributes: [Modifier.Nimble],
        ability:null
    },
    [CardType.Meritocracy]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Players,
            effect: {
                drawIfFewerCards: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Meritocracy
    },
    [CardType.Riot]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:3,
        
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
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
        
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.RhinoCharge,
        ability: null,
        defaultAttributes:[Modifier.Fearsome]
    },
    [CardType.SealFate]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Players,
            effect: {
                arrangeTop5Remove1: true,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.SealFate
    },
    [CardType.SandElemental]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:1,
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.SandElemental,
        ability: {
            targets: Target.Land,
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
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.WanderingSpirit,
        ability: null,
        defaultAttributes: [Modifier.Timid]
    },
    [CardType.MagmaBurst]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Players,
            effect: {
                dmg: 5,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.MagmaBurst
    },
    [CardType.ShiftingSands]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1},],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Land,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.ShiftingSands
    },
    [CardType.DeepSprings]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Players,
            effect: {
                hpUp: 8,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.DeepSprings
    },
    [CardType.WerewolfRaider]: {
        color:Color.Green,
        defaultAtk:6,
        defaultDef:3,
        
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.WerewolfRaider,
        ability: null
    },
    [CardType.SpiritsOfWorldTree]: {
        color:Color.Green,
        defaultAtk:8,
        defaultDef:8,
        
        cost: [{kind:Color.Green, amount:3},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.SpiritsOfWorldTree,
        ability: {
            required: true,
            targets: Target.LandYouControl,
            withColor: Color.Green,
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
        
        cost: [{kind:Color.Green, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.RedwoodTreant,
        ability: null
    },
    [CardType.HoodooHealer]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:2,
        
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.HoodooHealer,
        ability: {
            targets: Target.Creature,
            withoutColor: Color.Black,
            effect: {
                destroy: true,
                sprite: IconIndex.Damage
            }
        }
    },
    [CardType.Creditors]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                hpUp: 3,
                dmg: 3,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Creditors
    },
    [CardType.Grizzly]: {
        color:Color.Green,
        defaultAtk:5,
        defaultDef:4,
        
        cost: [{kind:Color.Green, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        category: Category.Beast,
        sprite: CreatureSpriteIndex.Grizzly,
        ability: null
    },
    [CardType.GuardianAngel]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:4,
        
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        category: Category.Celestial,
        sprite: CreatureSpriteIndex.GuardianAngel,
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
        
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.ShroudedApostle,
        defaultAttributes: [Modifier.Fearsome, Modifier.ProtectionFromBlack],
        ability: null
    },
    [CardType.Phoenix]: {
        color:Color.White,
        defaultAtk:4,
        defaultDef:4,
        
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Phoenix,
        defaultAttributes: [Modifier.Nimble, Modifier.Undying]
    },
    [CardType.SteamElemental]: {
        color:Color.Blue,
        defaultAtk:5,
        defaultDef:4,
        
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.SteamElemental,
        defaultAttributes: [Modifier.Nimble, Modifier.Taunt],
        ability: null
    },
    [CardType.IllusoryWall]: {
        color:Color.Blue,
        defaultAtk:2,
        defaultDef:5,
        
        defaultAttributes: [Modifier.Defender],
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.IllusoryWall,
        ability: null
    },
    [CardType.ChaosServant]: {
        color:Color.Black,
        defaultAtk:6,
        defaultDef:5,
        
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.ChaosServant,
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
        gold:1,
        ability: {
            targets: Target.Land,
            effect: {
                destroy: true,
                repeat: 2,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.SulfurRain
    },
    [CardType.Derecho]: {
        color:Color.Red,
        defaultAtk:5,
        defaultDef:5,
        
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:4}],
        defaultAttributes:[Modifier.Haste],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Derecho,
        ability: {
            targets: Target.AllOtherCreatures,
            effect: {
                sprite: IconIndex.Damage,
                tap: true
            }
        }
    },
    [CardType.BallLightning]: {
        color:Color.Red,
        defaultAtk:4,
        defaultDef:4,
        
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.BallLightning,
        defaultAttributes:[Modifier.Nimble, Modifier.Haste],
        ability: null
    },
    [CardType.Archangel]: {
        color:Color.White,
        defaultAtk:5,
        defaultDef:5,
        
        cost: [{kind:Color.White, amount:2},{kind:Color.None, amount:4}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.Archangel,
        defaultAttributes:[Modifier.Nimble, Modifier.Vigilant],
        ability: {
            trigger: Triggers.OnCombat,
            targets: Target.Self,
            effect: {
                sprite: IconIndex.Buff,
                casterHpUpOnKill: 3
            }
        }
    },
    [CardType.BallistaCorps]: {
        color:Color.Blue,
        defaultAtk:5,
        defaultDef:5,
        
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.BallistaCorps,
        defaultAttributes:[Modifier.Seige],
        ability: null
    },
    [CardType.ObsidianGargoyle]: {
        color:Color.Black,
        defaultAtk:5,
        defaultDef:4,
        
        cost: [{kind:Color.Black, amount:3},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.ObsidianGargoyle,
        defaultAttributes:[Modifier.Nimble],
        ability: {
            targets: Target.Players,
            effect: {
                sprite: IconIndex.Debuff,
                discardAtRandom: 1
            }
        }
    },
    [CardType.Escaton]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:4}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreaturesAndPlayers,
            effect: {
                dmg: 6,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Escaton
    },
    [CardType.Erosion]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Land,
            effect: {
                transformInto: CardType.Desert,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Erosion
    },
    [CardType.DivineReach]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                addAttributes: [Modifier.Ranged],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.DivineReach
    },
    [CardType.LavaBeam]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:3},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Creature,
            effect: {
                destroyAllInLane: true,
                playerDamage: 4,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.LavaBeam
    },
    [CardType.Contemplation]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:3},{kind:Color.None, amount:1}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                duration: 2,
                pacifism:true,
                sprite: IconIndex.Damage,
                emptyGraveyard: true
            }
        },
        sprite: CreatureSpriteIndex.Contemplation
    },
    [CardType.HiddenOasis]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        gold:1,
        ability: {
            targets: Target.Land,
            effect: {
                addAttributes:[Modifier.GreenProducer],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.HiddenOasis
    },
    [CardType.FeralSpirit]: {
        color:Color.Green,
        defaultAtk:8,
        defaultDef:5,
        
        cost: [{kind:Color.Green, amount:3},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        gold:1,
        category: Category.Spirit,
        sprite: CreatureSpriteIndex.FeralSpirit,
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
        
        cost: [{kind:Color.Red, amount:3},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.FireHydra,
        defaultAttributes: [Modifier.Nimble],
        ability: {
            targets: Target.Creature,
            effect: {
                sprite: IconIndex.Damage,
                dmgAsDeserts: true
            }
        }
    },
    [CardType.KnowledgeAssimilator]: {
        color:Color.Blue,
        defaultAtk:5,
        defaultDef:6,
        
        cost: [{kind:Color.Blue, amount:3},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.KnowledgeAssimilator,
        ability: {
            targets: Target.Self,
            trigger: Triggers.OnCombat,
            effect: {
                sprite: IconIndex.Damage,
                draw:1
            }
        }
    },
    [CardType.LizardMage]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:3,
        
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        gold:1,
        sprite: CreatureSpriteIndex.LizardMage,
        ability: {
            targets: Target.CreaturesInLane,
            effect: {
                sprite: IconIndex.Damage,
                dmg: 1
            }
        }
    },
    
}