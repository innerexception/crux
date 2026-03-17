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
    SET_REPEAT='SET_REPEAT'
}

export enum Modal {
    NewGame='ng',SelectSave='SelectSave',Options='Options',SelectLoad='SelectLoad',
    Deckbuilder='Deckbuilder',AnyGraveyard='AnyGraveyard',
    ChooseFromGY='ChooseFromGY',ChooseDiscard='ChooseDiscard',PickNextCard='PickNextSorcery',
    GameOver='GameOver',Winner='Winner',ShowLandChoices='ShowLandChoices',Lobby='Lobby',
    ViewCards='ViewCards',SelectCreatureForTop='SelectCreatureForTop'
}

export enum Direction {
    NORTH=1,SOUTH=-1
}

export enum NetworkEvent {
    Update='Update', Join='Join', Start='Start',EndTurn='EndTurn', CancelAction='CancelAction',
    AddCard='AddCard',TapLand='TapLand',LandDeck='LandDeck',TriggerAbility='TriggerAbility',
    MoveCard='MoveCard',DamageCard='DamageCard'
}

export enum SceneNames {
    Loading='loading', Main='main', Intro='intro'
}

export enum Layers {
    Water='water',
    Earth='earth',
    Creature='creature',
    Entrances='entrances'
}
export const LayerStack = [Layers.Water, Layers.Earth]

export enum Maps {
    Tutorial='tutorial'
}

export enum CreatureSpriteIndex {
    City=816, Desert=73, Forest=845, Tower=60, Meadow=218, Skypirate=4869,FireCloak=5392,FeatherCloak=5386,
    Sandstorm=1505,Earthquake=1900,PeaceTreaty=2138,HeroicSoldier=4893,FertileSoil=4355,Hurricane=4377,Goblin=3841,
    ForestJackal=4102,Merfolk=3956,Refreshment=2218,BillyGoat=4163,ScavengingRats=4115,Memoize=1964,Brainstorm=2028,
    Necromancy=2095,FierySpear=1997,Sanctuary=93,Player1=4979,CityMage=4881,Knife=2882,Jellyfish=4104,
    ForestCall=2170,Taunt=2153,Dryad=3814,Gryphon=3846,MartyrPrayer=2083,Imp=4717,Brigand=4975,Flood=1481,
    Wilderness=2164,Defiance=1882,Pollution=2132,Monk=4943,Law=2521,Goblin2=3860,Goblin3=3962,Bear=4091,Knight=4371,
    Time=1972,Mind=3834,Giant=2212,Sprite=4035,Treant=4357,Crow=3945,Volcano=1952,Hammer=3118,Lure=2562,Scroll=2800,
    Armor=2117,Heal=2125,Sun=59,Rats=2180,DesertAsetic=2291,Dragonling=3827,Thug=3910,Guard=4904,Apprentice=3889,
    Placeholder=4428,Knight2=4990,OldMage=4942,LadyMage=4948,Law2=2802,MessengerOwl=4060,Corvian=3874,MercenaryKnight=4233,
    Falconer=4048,SpiritCloud=4379,TwistedGiant=3822,DruidicWarrior=4358,DruidicAmbusher=3955,Roaches=4070,ShadowForm=4749,
    FireImp=4212,Gorilla=4023,ArmoredTortoise=4139,Longbowmen=3783,Scry=1982,Blizzard=2031,Riot=3902,SpiritsOfWorldTree=6038,
    BurrowingWurm=4075,MercenaryCaptain=3854,DrometaurSpearhand=3984,SandElemental=1214,RhinoCharge=4047,BallLightning=4378,
    Stylite=4601,Archangel=4363,LizardMage=3951
}

export const PlayerAvatars = [CreatureSpriteIndex.Player1, CreatureSpriteIndex.CityMage, CreatureSpriteIndex.OldMage, CreatureSpriteIndex.LadyMage]

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

export enum Permanents {
    Land='Land',Creature='Creature',Enchantment='Enchantment',Sorcery='Sorcery'
}

export enum Target {
    Self='Self',CreatureYouControl='CreatureYouControl',Creature='Creature',Lands='Lands',LandsYouControl='LandsYouControl',
    AllCreatures='AllCreatures',CreatureOrLand='CreatureOrLand',AllCreaturesAndPlayers='AllCreaturesAndPlayers',Players='Players',
    CreaturesYourGraveyard='CreaturesYourGraveyard',YourGraveyard='YourGraveyard',OpponentCreature='OpponentCreature',
    CreaturesOrPlayers='CreaturesOrPlayers',CreaturesAnyGraveyard='CreaturesAnyGraveyard',AllOpponentCreatures='AllOpponentCreatures',
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
    StingingWinds //If a creature enters this lane, it gains haste. If it leaves it loses haste.
}

export const ModifierDesc:Record<Modifier,string> = {
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
    [Target.LandsYouControl]: 'A Land you control',
    [Target.OpponentLand]: "An opponent's land",
    [Target.ThisCreature]: 'This Creature',
    [Target.AllCreatures]: 'All Creatures',
    [Target.AllOtherCreatures]: 'All other Creatures',
    [Target.CreatureAndLand]: 'All Creatures & Lands',
    [Target.AllCreaturesYouControl]: 'All Creatures you control',
    [Target.TappedCreatures]: 'Tapped Creatures',
    [Target.AllPlayers]:'All Players',
    [Target.Lands]:'A Land',
    [Target.Self]:'You',
    [Target.Players]:'A Player',
    [Target.Creature]:'A Creature',
    [Target.AllCreaturesAndPlayers]:'All Creatures & Players',
    [Target.CreaturesOrPlayers]:'A Creature or Player',
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
    Corvian='ElectricEel', MercenaryKnight='FaithlessKnight', 
    TracklessWilds='TracklessWilds', Defiance='Defiance', Pollution='Pollution', 
    HolyMonk='HolyMonk',LandReform='LandReform',GoblinSargeant='GoblinSargeant',Consecrate='Consecrate',
    BlackBear='BlackBear',Hobgoblin='Hobgoblin',CatBurglar='CatBurglar',
    FaithfulKnight='FaithfulKnight',DoubleFate='DoubleFate',Dementia='Dementia',
    Overgrowth='Overgrowth',Sprite='Sprite',Gardening='Gardening',
    Omen='Omen',Dragonling='Dragonling',Treant='Treant',Eruption='Eruption',DesertAscetic='DesertAsetic',
    HeavenlyDew='HeavenlyDew', SewerRats='SewerRats',Tremors='Tremors',Sunlight='Sunlight',
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
    ForceOfWill='ForceOfWill', ForestSense='ForestSense', Pathfinding='Pathfinding',
    Hailstorm='Hailstorm', CursedToad='CursedToad', PSIWarrior='PSIWarrior',LabSpecimen='LabSpecimen',
    Cougar='Cougar',AcidRain='AcidRain',Unicorn='Unicorn',CultLeader='CultLeader',
    FieldMarshal='FieldMarshal', Sinkhole='Sinkhole', HolySymbol='HolySymbol', Premonition='Premonition',
    BurrowingWurm='BurrowingWurm', Slow='Slow', HiddenGrove='HiddenGrove', RighteousCharge='RighteousCharge',
    DebtCollection='DebtCollection', VenerableMonk='VenerableMonk', Collectivization='Collectivization',
    GraniteWall='GraniteWall', BattlePrayer='BattlePrayer', Conspiracy='Conspiracy', AirDrake='AirDrake',
    Blizzard='Blizzard', DruidLoremaster='DruidLoremaster', Anaconda='Anaconda', Reckoning='Reckoning', BeeSwarm='BeeSwarm',
    Boggart='Boggart', VolcanicVent='VolcanicVent', Resurrection='Resurrection', DruidicScholar='DruidicScholar',
    DustDevil='DesertDrake', Fear='Fear', SecretCache='SecretCache', LastGasp='LastGasp',
    AshCloud='AshCloud', FootSoldier='FootSoldier',Lightning='Lightning',SquidLord='SquidLord',
    GiantSpider='GiantSpider',Graverobber='Graverobber', LivingStones='LivingStones', RockTroll='RockTroll',
    LizardWarrior='LizardWarrior', CircleOfLife='CircleOfLife', WayOfPeace='WayOfPeace',
    NomadicRaiders='NomadicRaiders', Minotaur='Minotaur', RowanTreant='RowanTreant', VeteranExorcist='VeteranExorcist', 
    MasterTactician='MasterTactician', Addict='Addict', ProtoDrake='ProtoDrake', ElderGriffin='ElderGriffin',
    SavannaLion='SavannaLion', FlashOfInsight='FlashOfInsight', CartelEnforcer='CartelEnforcer', Retribution='Retribution',
    SwordWall='SwordWall', Judgement='Judgement', CollectiveMemory='CollectiveMemory',
    SavyPolitico='SavyPolitico', Meritocracy='Meritocracy', Riot='Riot', RhinoCharge='RhinoCharge',
    SealFate='SealFate', SandElemental='SandElemental', WanderingSpirit='WanderingSpirit', MagmaBurst='MagmaBurst', ShiftingSands='ShiftingSands',
    DeepSprings='DeepSprings', WerewolfRaider='WerewolfRaider', SpiritsOfWorldTree='TreeSpirits', RedwoodTreant='RedwoodTreant',
    HoodooHealer='HoodooHealer', LifeSteal='LifeSteal', Grizzly='Grizzly', GuardianAngel='GuardianAngel',
    ShroudedApostle='ShroudedApostle', Phoenix='Phoenix', BlueDragon='BlueDragon', Megoladon='Megoladon',
    SulfurRain='SulfurRain', Derecho='Derecho', BallLightning='BallLightning', Archangel='Archangel',
    Genie='Genie', ObsidianGargoyle='ObsidianGargoyle', Escaton='Escaton', Financier='Financier',
    FeralSpirit='FeralSpirit', FireHydra='FireHydra', KnowledgeAssimilator='KnowledgeAssimilator',ChaosServant='ChaosServant',
    VexingRiddle='VexingRiddle',Fog='Fog',Erosion='Erosion',DivineReach='DivineReach',Stylite='Stylite',LizardMage='LizardMage',
    LavaBeam='LavaBeam',Contemplation='Contemplation',HiddenOasis='HiddenOasis',StingingWinds='StingingWinds'
}
