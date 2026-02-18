import { CardType, Color, CreatureSpriteIndex, IconIndex, Modifier, Permanents, Target, Triggers } from "../../../enum";

export const Portal:Record<CardType, CardMeta> = {
    [CardType.City]: {
        color:Color.Black,
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
                addAttributes: [Modifier.Flying],
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
                withAttribute: Modifier.Flying,
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
    [CardType.Dragonling]: {
        color:Color.Blue,
        defaultAtk: 1,
        defaultDef: 1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount: 1}],
        kind: Permanents.Creature,
        defaultMoves: 1,
        defaultAttributes:[Modifier.Flying],
        ability: {
            targets: Target.Self,
            effect: {
                draw: 1,
                discard: 1,
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
        defaultMoves: 1,
        ability: {
            targets: Target.Self,
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
    [CardType.DesertAsetic]: {
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
                addAttributes: [Modifier.BlockFlying]
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
                addAttributes:[Modifier.Flying],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Lure
    },
    [CardType.DarkStare]: {
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
        sprite: CreatureSpriteIndex.Lure
    },
    [CardType.FlashOfLight]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                tap:true,
                ignoreColor:Color.White,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Lure
    },
    [CardType.StreetThugs]: {
        color:Color.Black,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
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
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Guard,
        ability:null
    },
    [CardType.SorcererApprentice]: {
        color:Color.Blue,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Apprentice,
        ability:{
            targets:Target.CreaturesOrPlayers,
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
        defaultMoves:2,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Knight2,
        ability:{
            targets:Target.ThisCreature,
            effect:{ 
                defUp:3,
                duration:1,
                whenDamaged: true,
                sprite: IconIndex.Buff
            }
        }
    },
    [CardType.SpiritCloud]: {
        color:Color.Blue,
        defaultAtk:3,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Flying, Modifier.OnlyFlying],
        ability: null
    },
    [CardType.PowerWordUnsummon]: {
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
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.CantBlock],
        ability: null
    },
    [CardType.CruelContract]: {
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
    [CardType.CruelMaster]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
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
    [CardType.JungleCat]: {
        color:Color.Green,
        defaultAtk:2,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.ForestWalk],
        ability: null
    },
    [CardType.Ranger]: {
        color:Color.Green,
        defaultAtk:4,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null
    },
    [CardType.Roaches]: {
        color:Color.Black,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.ThisCreature,
            trigger: Triggers.OnDeath,
            effect:{
                returnToHand: true,
                sprite: IconIndex.Buff
            }
        }
    },
    [CardType.IceStorm]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                pacifyAllOfPlayer: true,
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
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes:[Modifier.Flying] 
    },
    [CardType.FireImp]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.ThisCreature,
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
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.Downsizing]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Creature,
            effect: {
                destroy:true,
                ignoreColor: Color.Black,
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
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
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
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.BlockFlying],
        ability:null
    },
    [CardType.Assassin]: {
        color:Color.Black,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:0,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.TappedCreatures,
            tap: true,
            effect: {
                sprite: IconIndex.Damage,
                destroy: true
            }
        }
    },
    [CardType.SeaJelly]: {
        color:Color.Blue,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
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
            targets: Target.Creature,
            effect: {
                destroyOnEnter: true,
                sprite: IconIndex.Debuff
            }
        }
    },
    [CardType.MindThief]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                discard: 2,
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
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.ForceOfWill]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:1},],
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
            targets: Target.CreaturesYouControl,
            effect: {
                duration:1,
                addAttributes:[Modifier.ForestWalk],
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.ForestFires]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                destroy: true,
                onlyColor: Color.Green,
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
            effect: {
                dmg: 4,
                withAttribute: Modifier.Flying,
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
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            trigger: Triggers.OnDeath,
            targets: Target.AllPlayers,
            effect: {
                discard:1,
                sprite: IconIndex.Debuff
            }
        }
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
    [CardType.SewerSnake]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.Cougar]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:1}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes:[Modifier.Berserk],
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
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.SetDisciple]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.Self,
            effect:{
                dmg: 3,
                sprite: IconIndex.Damage
            }
        }
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
            effect:{
                duration: 1,
                atkUp: 2,
                defUp: 2,
                sprite: IconIndex.Buff
            }
        }
    },
    [CardType.LavaFlow]: {
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
    [CardType.DreamThief]: {
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
    [CardType.BurrowingWurm]: {
        color:Color.Green,
        defaultAtk:4,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.Lands,
            effect:{
                destroyOnEnter: true,
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
                creatureToLibrary: true,
                sprite: IconIndex.Debuff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Gardener]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
            effect: {
                searchForForest: true,
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
            effect: {
                atkUp: 2,
                duration: 1,
                onlyColor: Color.White,
                sprite: IconIndex.Buff,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.WitherTouch]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Players,
            effect: {
                dmg: 2,
                hpUp: 2,
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
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.Self,
            effect:{
                hpOnEnter: 2,
                sprite: IconIndex.Buff
            }
        }
    },
    [CardType.WordOfHate]: {
        color:Color.Black,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.AllCreatures,
            effect: {
                destroy: true,
                onlyColor: Color.White,
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
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.BattlePrayer]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:2},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesYouControl,
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
            targets: Target.Self,
            effect: {
                destroy2Creatures: true,
                dmg: 5,
                ignoreColor: Color.Black,
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
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.Flying]
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
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.WoodElf]: {
        color:Color.Green,
        defaultAtk:1,
        defaultDef:1,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:{
            targets: Target.Self,
            effect: {
                sprite: IconIndex.Buff,
                searchForForest: true,
                shuffle: true
            }
        }
    },
    [CardType.Anaconda]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:3}],
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
            targets: Target.Lands,
            effect: {
                destroyAll: true,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.BeeSwarm]: {
        color:Color.Green,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.CreaturesOrPlayers,
            effect: {
                dmg: 2,
                sprite: IconIndex.Damage,
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.Boggart]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
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
            targets: Target.Lands,
            effect: {
                destroyAll: true,
                onlyColor: Color.Blue,
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
            targets: Target.CreaturesYouControl,
            effect: {
                onlyColor: Color.Black,
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
    [CardType.Hippo]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.TowerWalk]
    },
    [CardType.DesertDrake]: {
        color:Color.Red,
        defaultAtk:2,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null,
        defaultAttributes: [Modifier.Flying]
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
            targets: Target.Lands,
            effect: {
                sprite: IconIndex.Buff,
                destroyAll: true,
                onlyColor: Color.White
            }
        },
        sprite: CreatureSpriteIndex.Placeholder
    },
    [CardType.FootSoldier]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3}],
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
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:3}],
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
        defaultAttributes:[Modifier.BlockFlying]
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
    [CardType.HilltopGiant]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:4,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:2}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.Troll]: {
        color:Color.Red,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability:null
    },
    [CardType.LizardWarrior]: {
        color:Color.Red,
        defaultAtk:4,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:3}],
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
    [CardType.MongolHorde]: {
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
                discard: 1
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
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null
    },
    [CardType.VeteranPriest]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3}],
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
            trigger: Triggers.OnAttack,
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
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
    },
    [CardType.ProtoDrake]: {
        color:Color.Blue,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes:[Modifier.Flying]
    },
    [CardType.ElderGriffin]: {
        color:Color.White,
        defaultAtk:2,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes:[Modifier.Flying]
    },
    [CardType.SavannaLion]: {
        color:Color.Green,
        defaultAtk:3,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Green, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes:[Modifier.BlockerMax1]
    },
    [CardType.FlashOfInsight]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:3},],
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
    [CardType.Shambler]: {
        color:Color.Black,
        defaultAtk:3,
        defaultDef:2,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.ThisCreature,
            trigger: Triggers.OnDeath,
            effect: {
                sprite: IconIndex.Buff,
                creatureToLibrary: true
            }
        },
    },
    [CardType.Retribution]: {
        color:Color.White,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3},],
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
    [CardType.SwordWall]: {
        color:Color.White,
        defaultAtk:3,
        defaultDef:5,
        defaultMoves:0,
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Flying],
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
        cost: [{kind:Color.White, amount:1},{kind:Color.None, amount:4}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.CantBeTapped],
        ability:null
    },
    [CardType.VampireSpawn]: {
        color:Color.Black,
        defaultAtk:4,
        defaultDef:3,
        defaultMoves:1,
        cost: [{kind:Color.Black, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        defaultAttributes: [Modifier.Flying],
        ability:null
    },
    [CardType.Redistribution]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:2},{kind:Color.None, amount:3},],
        kind: Permanents.Sorcery,
        ability: {
            targets: Target.Self,
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
        cost: [{kind:Color.Black, amount:1},{kind:Color.None, amount:4}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: {
            targets: Target.ThisCreature,
            trigger: Triggers.OnAttack,
            effect: {
                sprite: IconIndex.Buff,
                atkUp: 2,
                duration: 1
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
        defaultAttributes:[Modifier.BlockerMax1]
    },
    [CardType.SealFate]: {
        color:Color.Blue,
        cost: [{kind:Color.Blue, amount:1},{kind:Color.None, amount:4},],
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
    [CardType.Cyclops]: {
        color:Color.Red,
        defaultAtk:5,
        defaultDef:5,
        defaultMoves:1,
        cost: [{kind:Color.Red, amount:2},{kind:Color.None, amount:3}],
        kind: Permanents.Creature,
        sprite: CreatureSpriteIndex.Placeholder,
        ability: null,
        defaultAttributes: [Modifier.CantBlock]
    },
    [CardType.LavaAxe]: {
        color:Color.Red,
        cost: [{kind:Color.Red, amount:1},{kind:Color.None, amount:4},],
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
    [CardType.PyroFlow]: {
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
    
}
