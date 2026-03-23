import { Input } from "phaser"

export enum UIReducerActions {
    UPDATE = 'updt',
    NEW='nu',
    CONTINUE='cont',
    START_NEW_MATCH='LOAD',
    SHOW_MODAL='SHOW_MODAL',
    SAVE='SAVE',
    QUIT='quit',
    SET_SCENE='SET_SCENE',
    INSPECT_CARD='INSPECT_CARD',
    SELECT_CARD='SELECT_CARD',
    UPDATE_PLAYER='UPDATE_PLAYER',
    UPDATE_BOARD='UPDATE_BOARD',
    UPDATE_ACTIVE='UPDATE_ACTIVE',
    UPDATE_LANDS='UPDATE_LANDS',
    NETWORK_MESSAGE='NETWORK_MESSAGE',
    SET_LOBBY='SET_LOBBY',
    PLAYER_JOIN='PLAYER_JOIN',
    SET_ABILITY='SET_ABILITY',
    SET_PROCESSING='SET_PROCESSING',
    SET_NET_ACK='SET_NET_ACK',
    SET_REPEAT='SET_REPEAT',
    ADD_LOG='ADD_LOG',
    FINISH_MATCH='FINISH_MATCH'
}

export enum Modal {
    NewGame='ng',SelectSave='SelectSave',Options='Options',SelectLoad='SelectLoad',
    Deckbuilder='Deckbuilder',AnyGraveyard='AnyGraveyard',
    ChooseFromGY='ChooseFromGY',ChooseDiscard='ChooseDiscard',PickNextCard='PickNextSorcery',
    GameOver='GameOver',Winner='Winner',ShowLandChoices='ShowLandChoices',Lobby='Lobby',
    ViewCards='ViewCards',SelectCreatureForTop='SelectCreatureForTop',DiscardAndDraw='DiscardAndDraw',
    ViewGY='ViewGY',TradeSpells='TradeSpells',CampaignDeckbuilder='CampaignDeckbuilder'
}

export enum Direction {
    NORTH=1,SOUTH=-1
}

export enum NetworkEvent {
    Update='Update', Join='Join', Start='Start',EndTurn='EndTurn', CancelAction='CancelAction',
    AddCard='AddCard',TapLand='TapLand',LandDeck='LandDeck',TriggerAbility='TriggerAbility',
    MoveCard='MoveCard',DamageCard='DamageCard'
}

export enum MapFeature {
    Shop,Duel
}

export enum AIDeck {
    Goblins, Drakes
}

export enum SceneNames {
    Loading='loading', Main='main', Intro='intro',Map='Map'
}

export enum Layers {
    Doodad='doodad',
    Earth='earth',
    Blockers='blockers',
    Creature='creature',
    Entrances='entrances'
}
export const LayerStack = [Layers.Earth,Layers.Doodad,Layers.Blockers,Layers.Entrances,Layers.Creature,]

export enum Maps {
    Tutorial='tutorial',Overworld='overworld'
}

export enum CreatureSpriteIndex {
    City=816, Desert=73, Forest=845, Tower=60, Meadow=218, Skypirate=4869,FireCloak=5392,FeatherCloak=5386,
    Sandstorm=1505,Earthquake=1900,PeaceTreaty=2138,HeroicSoldier=4893,FertileSoil=4355,Hurricane=4377,Goblin=3841,
    ForestJackal=4102,Merfolk=3956,Refreshment=2218,BillyGoat=4163,ScavengingRats=4115,Memoize=1964,Brainstorm=2028,
    Necromancy=2095,FierySpear=1997,Sanctuary=93,Player1=4979,CityMage=4880,Knife=2882,Jellyfish=4104,
    ForestCall=2170,Taunt=2153,Dryad=3814,Gryphon=3846,MartyrPrayer=2083,Imp=4717,Brigand=4975,Flood=1481,
    Wilderness=2164,Defiance=1882,Pollution=2132,Monk=4943,Law=2521,Goblin2=3860,Goblin3=3962,Bear=4091,Knight=4371,
    Time=1972,Mind=3834,Giant=2212,Sprite=4035,Treant=4357,Crow=3945,Volcano=1952,Hammer=3118,Lure=2562,Scroll=2800,
    Armor=2117,Heal=2125,Sun=59,Rats=2180,DesertAsetic=2291,Dragonling=3827,Thug=3910,Guard=4904,Apprentice=3889,
    Placeholder=4428,Knight2=4990,OldMage=4942,LadyMage=4948,Law2=2802,MessengerOwl=4060,Corvian=3874,MercenaryKnight=4233,
    Falconer=4048,SpiritCloud=4379,TwistedGiant=3822,DruidicWarrior=4358,DruidicAmbusher=3955,Roaches=4070,ShadowForm=4241,
    FireImp=4212,Gorilla=4023,ArmoredTortoise=4138,Longbowmen=3783,Scry=1982,Blizzard=2031,Riot=3902,SpiritsOfWorldTree=6038,
    BurrowingWurm=4173,MercenaryCaptain=3854,DrometaurSpearhand=3984,SandElemental=1214,RhinoCharge=4047,BallLightning=1909,
    Stylite=4601,Archangel=4363,LizardMage=3951,SteamElemental=4436,Cycle=2194,GreatHive=4107,Justice=1817,CullWeaklings=3078,
    ContractKiller=2886,Assassin=4742,Sophist=3880,Hypnotize=1964,ForceOfWill=1843,Pathfinding=2326,CursedToad=4018,
    PSIWarrior=3820,LabSpecimen=4840,Cougar=5419,DustStorm=1503,AshCloud=786,FootSoldier=3869,SquidLord=5045,GiantSpider=4149,
    Graverobber=4939,WerewolfRaider=5136,DeepSprings=2158,ShiftingSands=1900,MagmaBurst=1994,WanderingSpirit=4244,SealFate=1748,
    Meritocracy=99,SavyPolitico=4910,CollectiveMemory=2089,Judgement=92,SwordWall=5860,Retribution=2092,CartelEnforcer=3966,
    FlashOfInsight=79,SavannaLion=5420,ElderGriffin=3961,Addict=3791,MasterTactician=4227,VeteranExorcist=3869,RowanTreant=4357,
    Player2=4938,Player3=4941,Player4=4913,Player5=4915,MountedHorde=5074,WayOfPeace=1744,CircleOfLife=2068,LizardWarrior=3948,
    RockTroll=3966,LivingStones=4932,BloomingEarth=2575,BallistaCorps=3144,Derecho=4415,ObsidianGargoyle=5119,Gardening=1661,
    Overgrowth=1884,Omen=85,HoodooHealer=4758,Creditors=1767,CatBurglar=4976,GuerillaTactics=2153,CunningLure=2636,
    AngelicTouch=1819,PiercingStare=4336,FlashOfLight=2024,DeceptiveContract=1983,StingingWinds=2032,Banish=2192,
    Taskmaster=2054,DoubleCast=7,Thunderclap=1847,Hailstorm=4413,AcidRain=1534,Unicorn=4800,CultLeader=4767,FieldMarshal=5062,
    Sinkhole=826,HolySymbol=2053,Premonition=2213,VexingRiddle=2138,Slow=2138,RighteousCharge=813,GraniteWall=997,Collectivization=726,
    BattlePrayer=61,Conspiracy=1864,AirDrake=4325,Anaconda=4163,Boggart=4186,VolcanicVent=384,Fear=1946,Resurrection=2109,
    DustDevil=4247,SecretCache=10,ProtoDrake=4277,Grizzly=4091,GuardianAngel=4363,ShroudedApostle=4979,Phoenix=3942,IllusoryWall=867,
    ChaosServant=4903,SulfurRain=1949,LavaBeam=2002,Contemplation=1963,HiddenOasis=2046,FeralSpirit=4054,FireHydra=4054,
    KnowledgeAssimilator=4968,DebtCollection=1798,VenerableMonk=3803,Reckoning=857,LastGasp=2012,DruidicScholar=4896,Escaton=73,
    Erosion=1494,DivineReach=1834,Fog=1711,ForkLightning=1847,RedwoodTreant=4713,GreenMerchant=4928
}

export const MapFeatures:Partial<Record<CreatureSpriteIndex, FeatureData>> = {
    [CreatureSpriteIndex.GreenMerchant]: {
        kind: MapFeature.Shop
    }
}

export const PlayerAvatars = [CreatureSpriteIndex.Player1, CreatureSpriteIndex.CityMage, CreatureSpriteIndex.OldMage, CreatureSpriteIndex.LadyMage, 
    CreatureSpriteIndex.Player2, CreatureSpriteIndex.Player3, CreatureSpriteIndex.Player4, CreatureSpriteIndex.Player5]

export enum IconIndex {
    Mana=16, Options=1759, Close=37, Cancel=1734, Ok=1735, Quit=115,Sword=1902,Save=1935,
    Damage=3302,Tap=3733,Red=2649,Blue=2667,Green=2674,Black=2663,White=2678,Gray=2666,
    Graveyard=45,Draw=86,Buff=3521,Debuff=3507,Activate=3609,CreateLand=2024
}

export enum Color {
    Red='red',Blue='blue',Green='green',Black='gray',White='white',None='black'
}

export enum Category {
    Human='Human',Elemental='Elemental',Beast='Beast',Celestial='Celestial',Infernal='Infernal',
    Beastkin='Beastkin',Spirit='Spirit'
}

export enum Log {
    AbilityPlayed, CardPlayed, RangedDamage, ExpiredEffect, NimbleActivation,Destroyed
}

export enum Permanents {
    Land='Land',Creature='Creature',Enchantment='Enchantment',Sorcery='Sorcery'
}

export enum Target {
    Self='Self',CreatureYouControl='CreatureYouControl',Creature='Creature',Land='Land',LandYouControl='LandYouControl',
    AllCreatures='AllCreatures',CreatureOrLand='CreatureOrLand',AllCreaturesAndPlayers='AllCreaturesAndPlayers',Players='Players',
    CreaturesYourGraveyard='CreaturesYourGraveyard',YourGraveyard='YourGraveyard',OpponentCreature='OpponentCreature',
    CreatureOrPlayer='CreatureOrPlayer',CreaturesAnyGraveyard='CreaturesAnyGraveyard',AllOpponentCreatures='AllOpponentCreatures',
    AllPlayers='AllPlayers',AllCreaturesYouControl='AllCreaturesYouControl',ThisCreature='ThisCreature',TappedCreatures='TappedCreatures',
    CreatureAndLand='CreatureAndLand',CreaturesInLane='CreaturesInLane',OpponentLand='OpponentLand',TappedCreature='TappedCreature',
    AllLands='AllLands',AllOtherCreatures='AllOtherCreatures'
}

export enum Triggers {
    OnAttack,OnEnter,OnDeath,OnExit,InEnemyTerritory,AtWill,OnCombat
}

export const TriggerNames:Record<Triggers, string> = {
    [Triggers.AtWill]: 'Once during your turn',
    [Triggers.InEnemyTerritory]: 'When moved 2 or more',
    [Triggers.OnAttack]:'When attacking',
    [Triggers.OnDeath]:'When killed',
    [Triggers.OnEnter]:'When summoned',
    [Triggers.OnExit]:'When leaving the field',
    [Triggers.OnCombat]:'During combat'
}

export enum Modifier {
    Banding=1, //Adds adjacent creatures pwr/def during combat. Damage is assigned to non-banders first.
    ProtectionFromBlack,ProtectionFromWhite,ProtectionFromRed,ProtectionFromGreen,ProtectionFromBlue,
    Nimble, //May tap to displace left or right 1 lane
    Timid, //Can't be put in a lane w/ an opposing creature
    DesertWalk, ForestWalk, CityWalk, TowerWalk, TempleWalk, //Opposing land type means this will move over any creature it moves onto instead of triggering combat
    DesertAffinity, ForestAffinity, CityAffinity, TowerAffinity, SanctuaryAffinity, //May only be placed in a lane with this land type
    Haste, //Moves an extra time during movement phase unless combat occurs
    Taunt, //Creatures may not leave this creature's lane.
    Ranged, //Creature may tap to deal its power to another creature in lane, exactly 2 squares away
    Defender, //Does not move during movement phase
    Vigilant, //Cannot be targeted by sorcery or enchantments
    Fearsome, //Creatures cannot be placed in this lane
    Toxic, //Creatures def 3 or less are destroyed in combat with this creature
    Consecrate, //When creature dies, gain 3 life
    Undying, //When dead, returns to hand,
    BeeSting, //Tap to deal 1 to target creature instead of producing mana
    SlowReturn, //Placed on top of deck when destroyed
    DementiaCloud, //discard 1 card on death
    Unblockable,
    GreenProducer,
    Retribution,
    StingingWinds, //If a creature enters this lane, it gains haste. If it leaves it loses haste.
    Seige //Can only move if opposing a tower/city/temple
}

export const ModifierDesc:Record<Modifier,string> = {
    [Modifier.Seige]:'Seige',
    [Modifier.StingingWinds]:'Stinging Winds',
    [Modifier.Retribution]: 'Retribution',
    [Modifier.GreenProducer]: 'Greening',
    [Modifier.Unblockable]: 'Ethereal',
    [Modifier.DementiaCloud]: 'Fumes',
    [Modifier.SlowReturn]: 'Echo',
    [Modifier.BeeSting]: 'Swarming',
    [Modifier.Undying]: 'Undying',
    [Modifier.Consecrate]: 'Consecrated',
    [Modifier.Defender]: 'Defender',
    [Modifier.Banding]: 'Banding',
    [Modifier.Haste]: 'Haste',
    [Modifier.Ranged]: 'Ranged',
    [Modifier.Timid]: 'Timid',
    [Modifier.DesertWalk]: 'Pathfinder - Desert',
    [Modifier.ForestWalk]: 'Pathfinder - Forest',
    [Modifier.CityWalk]: 'Pathfinder - City',
    [Modifier.TowerWalk]: 'Pathfinder - Tower',
    [Modifier.TempleWalk]: 'Pathfinder - Temple',
    [Modifier.CityAffinity]: 'Affinity - City',
    [Modifier.ForestAffinity]: 'Affinity - Forest',
    [Modifier.TowerAffinity]: 'Affinity - Tower',
    [Modifier.DesertAffinity]: 'Affinity - Desert',
    [Modifier.SanctuaryAffinity]: 'Affinity - Sactuary',
    [Modifier.Vigilant]: 'Vigilant',
    [Modifier.Nimble]: 'Nimble',
    [Modifier.ProtectionFromBlack]: 'Protection from City',
    [Modifier.ProtectionFromBlue]: 'Protection from Spirit',
    [Modifier.ProtectionFromGreen]: 'Protection from Forest',
    [Modifier.ProtectionFromRed]: 'Protection from Desert',
    [Modifier.ProtectionFromWhite]: 'Protection from Holy',
    [Modifier.Taunt]: 'Taunt',
    [Modifier.Fearsome]: 'Fearsome',
    [Modifier.Toxic]: 'Toxic'
}

export const TargetsDesc:Record<Target,string> = {
    [Target.AllLands]: "All lands",
    [Target.TappedCreature]: "A tapped creature",
    [Target.CreaturesInLane]: "Creatures in target's lane",
    [Target.LandYouControl]: 'A Land you control',
    [Target.OpponentLand]: "An opponent's land",
    [Target.ThisCreature]: 'This Creature',
    [Target.AllCreatures]: 'All Creatures',
    [Target.AllOtherCreatures]: 'All other Creatures',
    [Target.CreatureAndLand]: 'All Creatures & Lands',
    [Target.AllCreaturesYouControl]: 'All Creatures you control',
    [Target.TappedCreatures]: 'Tapped Creatures',
    [Target.AllPlayers]:'All Players',
    [Target.Land]:'A Land',
    [Target.Self]:'You',
    [Target.Players]:'A Player',
    [Target.Creature]:'A Creature',
    [Target.AllCreaturesAndPlayers]:'All Creatures & Players',
    [Target.CreatureOrPlayer]:'A Creature or Player',
    [Target.CreatureOrLand]:'A Creature or Land',
    [Target.CreatureYouControl]:'A Creature you control',
    [Target.CreaturesYourGraveyard]:'A Creature in your graveyard',
    [Target.YourGraveyard]:'A card in your graveyard',
    [Target.CreaturesAnyGraveyard]:'A Creature in any graveyard',
    [Target.OpponentCreature]:"An opponent's creature",
    [Target.AllOpponentCreatures]:"All opponent's creatures"
}

export const ColorIcons:Record<Color, IconIndex> = {
    [Color.Red]:IconIndex.Red,
    [Color.Blue]:IconIndex.Blue,
    [Color.Green]:IconIndex.Green,
    [Color.Black]:IconIndex.Black,
    [Color.White]:IconIndex.White,
    [Color.None]:IconIndex.Gray
}


export enum CardType {
    Temple='Temple',Desert='Desert',Tower='Tower',City='City',Forest='Forest',
    Sandstorm='Sandstorm',FeatherCloak='FeatherCloak',
    SkyPirates='SkyPirates',HeroicSoldier='HeroicSoldier',Earthquake='Earthquake',
    PeaceTreaty='PeaceTreaty', FertileSoil='FertileSoil',Hurricane='Hurricane',
    ForestJackal='ForestJackal',MessengerOwl='MessengerOwl',Refreshment='Refreshment',
    Bighorn='BillyGoat', ScavengingRats='ScavengingRats',Memorize='Memorize',
    Brainstorm='Brainstorm', GoblinScrounger='GoblinScrounger', Necromancy='Necromancy', FierySpear='FierySpear',
    DustStorm='DustStorm', Scry='Scry', ForestCall='ForestCall', Insult='Insult',
    WillowSpirit='WillowSpirit', FlashFlood='FlashFlood', VisitingGryphon='VisitingGryphon',
    AssassinKnife='AssassinKnife', MartyrPrayer='MartyrPrayer', Homonculus='Homonculus',
    Corvian='Corvian', MercenaryKnight='FaithlessKnight', 
    TracklessWilds='TracklessWilds', Defiance='Defiance', Pollution='Pollution', 
    HolyMonk='HolyMonk',LandReform='LandReform',GoblinSargeant='GoblinSargeant',Consecrate='Consecrate',
    BlackBear='BlackBear',Hobgoblin='Hobgoblin',CatBurglar='CatBurglar',
    FaithfulKnight='FaithfulKnight',DoubleFate='DoubleFate',Dementia='Dementia',
    Overgrowth='Overgrowth',Sprite='Sprite',Omen='Omen',Dragonling='Dragonling',Treant='Treant',Eruption='Eruption',
    DesertAscetic='DesertAsetic',HeavenlyDew='HeavenlyDew', SewerRats='SewerRats',Tremors='Tremors',Sunlight='Sunlight',
    HoldTheLine='HoldTheLine',Falconer='Falconer',BloomingEarth='BloomingEarth',Truce='Truce',
    OminousSigns='OminousSigns',GuerillaTactics='GuerillaTactics',FireHammer='FireHammer',
    CunningLure='CunningLure',AngelicTouch='AngelicTouch',PiercingStare='PiercingStare',
    FlashOfLight='FlashOfLight',StreetThugs='StreetThugs',BorderWatch='BorderWatch',
    SorcererApprentice='SorcererApprentice',MountedPaladin='MountedPaladin',
    SpiritCloud='SpiritCloud', Banish='Banish', TwistedGiant='TwistedGiant',
    DeceptiveContract='DeceptiveContract',Taskmaster='Taskmaster', DoubleCast='DoubleCast',
    DruidicWarrior='DruidicWarrior',DruidicAmbusher='DruidicAmbusher',Roaches='Roaches', Thunderclap='Thunderclap',
    ShadowForm='ShadowForm', FireImp='FireImp', Cycle='Cycle', Gorilla='Gorilla',
    CullWeaklings='CullWeaklings', Justice='Justice', ArmoredTortoise='ArmoredTortoise',
    ContractKiller='ContractKilling', Longbowmen='Longbowmen', Assassin='Assassin',
    Sophist='Sophist', MercenaryCaptain='MercenaryCaptain', Hypnotize='Hypnotize', DrometaurSpearhand='DrometaurSpearhand',
    ForceOfWill='ForceOfWill', Pathfinding='Pathfinding',
    Hailstorm='Hailstorm', CursedToad='CursedToad', PSIWarrior='PSIWarrior',LabSpecimen='LabSpecimen',
    Cougar='Cougar',AcidRain='AcidRain',Unicorn='Unicorn',CultLeader='CultLeader',
    FieldMarshal='FieldMarshal', Sinkhole='Sinkhole', HolySymbol='HolySymbol', Premonition='Premonition',
    BurrowingWurm='BurrowingWurm', Slow='Slow', HiddenGrove='HiddenGrove', RighteousCharge='RighteousCharge',
    DebtCollection='DebtCollection', VenerableMonk='VenerableMonk', Collectivization='Collectivization',
    GraniteWall='GraniteWall', BattlePrayer='BattlePrayer', Conspiracy='Conspiracy', AirDrake='AirDrake',
    Blizzard='Blizzard', DruidLoremaster='DruidLoremaster', Anaconda='Anaconda', Reckoning='Reckoning', GreatHive='GreatHive',
    Boggart='Boggart', VolcanicVent='VolcanicVent', Resurrection='Resurrection', DruidicScholar='DruidicScholar',
    DustDevil='DesertDrake', TheFear='TheFear', SecretCache='SecretCache', LastGasp='LastGasp',
    AshCloud='AshCloud', FootSoldier='FootSoldier',ForkLightning='ForkLightning',SquidLord='SquidLord',
    GiantSpider='GiantSpider',Graverobber='Graverobber', LivingStones='LivingStones', RockTroll='RockTroll',
    LizardWarrior='LizardWarrior', CircleOfLife='CircleOfLife', WayOfPeace='WayOfPeace',
    MountedHorde='MountedHorde', RowanTreant='RowanTreant', VeteranExorcist='VeteranExorcist', 
    MasterTactician='MasterTactician', Addict='Addict', ProtoDrake='ProtoDrake', ElderGriffin='ElderGriffin',
    SavannaLion='SavannaLion', FlashOfInsight='FlashOfInsight', CartelEnforcer='CartelEnforcer', Retribution='Retribution',
    SwordWall='SwordWall', Judgement='Judgement', CollectiveMemory='CollectiveMemory',
    SavyPolitico='SavyPolitico', Meritocracy='Meritocracy', Riot='Riot', RhinoCharge='RhinoCharge',
    SealFate='SealFate', SandElemental='SandElemental', WanderingSpirit='WanderingSpirit', MagmaBurst='MagmaBurst', ShiftingSands='ShiftingSands',
    DeepSprings='DeepSprings', WerewolfRaider='WerewolfRaider', SpiritsOfWorldTree='TreeSpirits', RedwoodTreant='RedwoodTreant',
    HoodooHealer='HoodooHealer', Creditors='Creditors', Grizzly='Grizzly', GuardianAngel='GuardianAngel',
    ShroudedApostle='ShroudedApostle', Phoenix='Phoenix', SteamElemental='SteamElemental', IllusoryWall='IllusoryWall',
    SulfurRain='SulfurRain', Derecho='Derecho', BallLightning='BallLightning', Archangel='Archangel',
    BallistaCorps='BallistaCorps', ObsidianGargoyle='ObsidianGargoyle', Escaton='Escaton',
    FeralSpirit='FeralSpirit', FireHydra='FireHydra', KnowledgeAssimilator='KnowledgeAssimilator',ChaosServant='ChaosServant',
    VexingRiddle='VexingRiddle',Fog='Fog',Erosion='Erosion',DivineReach='DivineReach',Stylite='Stylite',LizardMage='LizardMage',
    LavaBeam='LavaBeam',Contemplation='Contemplation',HiddenOasis='HiddenOasis',StingingWinds='StingingWinds'
}

export const DEFAULT_KEYS = {
    up: Input.Keyboard.KeyCodes.W,
    down: Input.Keyboard.KeyCodes.S,
    left: Input.Keyboard.KeyCodes.A,
    right: Input.Keyboard.KeyCodes.D,
    cancel: Input.Keyboard.KeyCodes.ESC,
    inventory: Input.Keyboard.KeyCodes.I
}