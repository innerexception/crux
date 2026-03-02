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
    PLAYER_JOIN='PLAYER_JOIN'
}

export enum Modal {
    NewGame='ng',SelectSave='SelectSave',Options='Options',SelectLoad='SelectLoad',
    Deckbuilder='Deckbuilder',Graveyard='Graveyard',AnyGraveyard='AnyGraveyard',
    ChooseFromGY='ChooseFromGY',ChooseDiscard='ChooseDiscard',PickNextSorcery='PickNextSorcery',
    GameOver='GameOver',Winner='Winner',ShowLandChoices='ShowLandChoices'
}

export enum Direction {
    NORTH=1,SOUTH=-1
}

export enum EventType {
    Endturn='Endturn', Join='Join'
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
    City=914, Desert=256, Forest=369, Tower=936, Meadow=218, Skypirate=4869,FireCloak=5392,FeatherCloak=5386,
    Sandstorm=1505,Earthquake=1900,PeaceTreaty=2138,HeroicSoldier=4893,FertileSoil=4346,Hurricane=4377,Goblin=4545,
    ForestJackal=4102,Merfolk=3956,Refreshment=2218,BillyGoat=4162,ScavengingRats=4089,Memoize=1964,Brainstorm=2028,
    Necromancy=2095,FierySpear=1997,Sanctuary=385,Player1=4979,CityMage=4881,Knife=2882,Jellyfish=4104,
    ForestCall=2170,Taunt=2153,Dryad=3814,Gryphon=3846,MartyrPrayer=2083,Imp=4238,Brigand=4975,Flood=1481,
    Wilderness=2164,Defiance=1882,Pollution=2132,Monk=4943,Law=2521,Goblin2=3962,Goblin3,Bear=4019,Knight=4371,
    Time=1972,Mind=3834,Giant=2212,Sprite=4035,Treant=4357,Crow=3945,Volcano=1952,Hammer=3118,Lure=2562,Scroll=2800,
    Armor=2117,Heal=2125,Sun=59,Rats=2180,DesertAsetic=2291,Dragonling=3827,Thug=3861,Guard=3897,Apprentice=3889,
    Placeholder=4428,Knight2=3868

}

export enum IconIndex {
    Mana=16, Options=1759, Close=37, Cancel=1734, Ok=1735, Quit=115,Sword=1902,Save=1935,
    Damage=3302,Tap=841,Red=2742,Blue=2751,Green=2722,Black=2741,White=2743,Gray=2736,
    Graveyard=45,Draw=86,Buff=3521,Debuff=3507
}

export enum Color {
    Red='red',Blue='blue',Green='green',Black='black',White='white',None='gray'
}

export enum Permanents {
    Land='Land',Creature='Creature',Enchantment='Enchantment',Sorcery='Sorcery'
}

export enum Target {
    Self='Self',CreaturesYouControl='CreaturesYouControl',Creature='Creature',Lands='Lands',LandsYouControl='LandsYouControl',
    AllCreatures='AllCreatures',CreatureOrLand='CreatureOrLand',CreaturesAndPlayers='CreaturesAndPlayers',Players='Players',
    CreaturesYourGraveyard='CreaturesYourGraveyard',YourGraveyard='YourGraveyard',
    CreaturesOrPlayers='CreaturesOrPlayers',CreaturesAnyGraveyard='CreaturesAnyGraveyard',AttackingCreatures='AttackingCreatures',
    AllPlayers='AllPlayers',AllCreaturesYouControl='AllCreaturesYouControl',ThisCreature='ThisCreature',TappedCreatures='TappedCreatures',
    CreatureAndLand='CreatureAndLand',
}

export enum Triggers {
    OnAttack,OnEnter,OnDeath,OnExit,InEnemyTerritory
}

export enum Modifier {
    Banding=1, //Adds adjacent creatures pwr/def during combat. Damage is assigned to non-banders first.
    ProtectionFromBlack,ProtectionFromWhite,ProtectionFromRed,ProtectionFromGreen,ProtectionFromBlue,
    Nimble, //May tap to displace left or right 1 lane
    CantBlock, //Can't be put in a lane w/ an opposing creature
    DesertWalk, ForestWalk, CityWalk, TowerWalk, TempleWalk, //Opposing land type means this will move over any creature it moves onto instead of triggering combat
    DesertAffinity, ForestAffinity, CityAffinity, TowerAffinity, SanctuaryAffinity, //May only be placed in a lane with this land type
    Haste, //Moves an extra time during movement phase unless combat occurs
    BlockerMaxPwr1, //Non-defender creatures with pwr>1 may not be placed in this lane 
    Taunt, //Creatures may not leave this creature's lane.
    Ranged, //Creature may tap to deal its power to another creature in lane, up to 2 squares away
    Unblockable, //See affinity ability
    Defender, //Does not move during movement phase
    Vigilant, //Cannot be targeted by sorcery or enchantments
    Fearsome //Creatures cannot be placed in this lane
}

export const ModifierDesc:Record<Modifier,string> = {
    [Modifier.Defender]: 'Does not move',
    [Modifier.Unblockable]: 'Unblockable',
    [Modifier.Banding]: 'Banding',
    [Modifier.Haste]: 'Haste',
    [Modifier.Ranged]: 'Ranged',
    [Modifier.CantBlock]: 'Timid',
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
    [Modifier.Nimble]: 'Flying',
    [Modifier.ProtectionFromBlack]: 'Protection from City',
    [Modifier.ProtectionFromBlue]: 'Protection from Spirit',
    [Modifier.ProtectionFromGreen]: 'Protection from Forest',
    [Modifier.ProtectionFromRed]: 'Protection from Desert',
    [Modifier.ProtectionFromWhite]: 'Protection from Holy',
    [Modifier.Taunt]: 'Taunt',
    [Modifier.Fearsome]: 'Fearsome',
    [Modifier.BlockerMaxPwr1]: 'Revered'
}

export const TargetsDesc:Record<Target,string> = {
    [Target.LandsYouControl]: 'A Land you control',
    [Target.ThisCreature]: 'This Creature',
    [Target.AllCreatures]: 'All Creatures',
    [Target.CreatureAndLand]: 'All Creatures & Lands',
    [Target.AllCreaturesYouControl]: 'All Creatures you control',
    [Target.TappedCreatures]: 'Tapped Creatures',
    [Target.AllPlayers]:'All Players',
    [Target.Lands]:'A Land',
    [Target.Self]:'You',
    [Target.Players]:'A Player',
    [Target.Creature]:'A Creature',
    [Target.AttackingCreatures]:'Attacking Creatures',
    [Target.CreaturesAndPlayers]:'All Creatures & Players',
    [Target.CreaturesOrPlayers]:'A Creature or Player',
    [Target.CreatureOrLand]:'A Creature or Land',
    [Target.CreaturesYouControl]:'A Creature you control',
    [Target.CreaturesYourGraveyard]:'A Creature in your graveyard',
    [Target.YourGraveyard]:'A card in your graveyard',
    [Target.CreaturesAnyGraveyard]:'A Creature in any graveyard',
}

export const OtherIcons:Record<Color, IconIndex> = {
    [Color.Red]:IconIndex.Red,
    [Color.Blue]:IconIndex.Blue,
    [Color.Green]:IconIndex.Green,
    [Color.Black]:IconIndex.Black,
    [Color.White]:IconIndex.White,
    [Color.None]:IconIndex.Gray
}


export enum CardType {
    Temple='Temple',Desert='Desert',Tower='Tower',City='City',Forest='Forest',
    Sandstorm='Sandstorm',FireCloak='FireCloak',FeatherCloak='FeatherCloak',
    SkyPirates='SkyPirates',HeroicSoldier='HeroicSoldier',Earthquake='Earthquake',
    PeaceTreaty='PeaceTreaty', FertileSoil='FertileSoil',Hurricane='Hurricane',
    ForestJackal='JunglePanther',Merfolk='Merfolk',Refreshment='Refreshment',
    BillyGoat='BillyGoat', ScavengingRats='ScavengingRats',Memoize='Memoize',
    Brainstorm='Brainstorm', Goblin='Goblin', Necromancy='Necromancy', FierySpear='FierySpear',
    DustStorm='DustStorm', Scry='Scry', ForestCall='ForestCall', Taunt='Taunt',
    WillowSpirit='WillowSpirit', FlashFlood='FlashFlood', VisitingGryphon='VisitingPegasus',
    AssassinKnife='AssassinKnife', MartyrPrayer='MartyrPrayer', RefuseDrone='RefuseDrone',
    JellyFish='ElectricEel', FaithlessKnight='FaithlessKnight', 
    TracklessWilds='TracklessWilds', Defiance='Defiance', Pollution='Pollution', 
    HolyMonk='HolyMonk',LandReform='LandReform',GoblinSargeant='GoblinSargeant',
    BlackBear='BlackBear',FatGoblin='FatGoblin',CatBurglar='CatBurglar',
    FaithfulKnight='FaithfulKnight',DoubleFate='DoubleFate',Dementia='Dementia',
    Overgrowth='Overgrowth',Sprite='Sprite',NaturesPaths='NaturesPaths',
    Omen='Omen',Dragonling='Dragonling',Treant='Treant',Eruption='Eruption',DesertAsetic='DesertAsetic',
    HeavenlyDew='HeavenlyDew', SewerRats='SewerRats',Tremors='Tremors',Sunlight='Sunlight',
    Steadfast='Steadfast',Crow='Crow',BloomingEarth='BloomingEarth',Truce='Truce',
    TidePool='TidePool',TreeClimbers='TreeClimbers',FireHammer='FireHammer',
    CunningLure='CunningLure',AngelicTouch='AngelicTouch',DarkStare='DarkStare',
    FlashOfLight='FlashOfLight',StreetThugs='StreetThugs',BorderWatch='BorderWatch',
    SorcererApprentice='SorcererApprentice',MountedPaladin='MountedPaladin',
    SpiritCloud='SpiritCloud', PowerWordUnsummon='PowerWordUnsummon', TwistedGiant='TwistedGiant',
    CruelContract='CruelContract',CruelMaster='CruelMaster', DoubleCast='DoubleCast',
    JungleCat='JungleCat',Ranger='Ranger',Roaches='Roaches', IceStorm='IceStorm',
    ShadowForm='ShadowForm', FireImp='FireImp', Cycle='Cycle', Gorilla='Gorilla',
    CullWeaklings='CullWeaklings', Justice='Justice', ArmoredTortoise='ArmoredTortoise',
    ContractKiller='ContractKilling', Longbowmen='Longbowmen', Assassin='Assassin',
    SeaJelly='SeaJelly', Mercenary='Mercenary', Hypnotize='Hypnotize', MinotaurServant='MinotaurServant',
    ForceOfWill='ForceOfWill', ForestSense='ForestSense', ForestFires='ForestFires',
    Hailstorm='Hailstorm', CursedToad='CursedToad', PSIWarrior='PSIWarrior',LabSpecimen='LabSpecimen',
    Cougar='Cougar',AcidRain='AcidRain',Unicorn='Unicorn',SetDisciple='SetDisciple',
    FieldMarshal='FieldMarshal', LavaFlow='LavaFlow', HolySymbol='HolySymbol', Premonition='Premonition',
    BurrowingWurm='BurrowingWurm', Slow='Slow', Gardener='Gardener', RighteousCharge='RighteousCharge',
    DebtCollection='DebtCollection', VenerableMonk='VenerableMonk', Collectivization='Collectivization',
    GraniteWall='GraniteWall', BattlePrayer='BattlePrayer', Conspiracy='Conspiracy', AirDrake='AirDrake',
    Blizzard='Blizzard', WoodElf='WoodElf', Anaconda='Anaconda', Reckoning='Reckoning', BeeSwarm='BeeSwarm',
    Boggart='Boggart', VolcanicVent='VolcanicVent', Resurrection='Resurrection', Hippo='Hippo',
    DesertDrake='DesertDrake', Fear='Fear', SecretCache='SecretCache', LastGasp='LastGasp',
    AshCloud='AshCloud', FootSoldier='FootSoldier',Lightning='Lightning',SquidLord='SquidLord',
    GiantSpider='GiantSpider',Graverobber='Graverobber', HilltopGiant='HilltopGiant', Troll='Troll',
    LizardWarrior='LizardWarrior', CircleOfLife='CircleOfLife', WayOfPeace='WayOfPeace',
    MongolHorde='MongolHorde', Minotaur='Minotaur', RowanTreant='RowanTreant', VeteranExorcist='VeteranExorcist', 
    MasterTactician='MasterTactician', Addict='Addict', ProtoDrake='ProtoDrake', ElderGriffin='ElderGriffin',
    SavannaLion='SavannaLion', FlashOfInsight='FlashOfInsight', Shambler='Shambler', Retribution='Retribution',
    SwordWall='SwordWall', Judgement='Judgement', CollectiveMemory='CollectiveMemory', SteadfastMonk='SteadfastMonk',
    VampireSpawn='VampireSpawn', Redistribution='Redistribution', Riot='Riot', RhinoCharge='RhinoCharge',
    SealFate='SealFate', Salamander='Salamander', Cyclops='Cyclops', LavaAxe='LavaAxe', PyroFlow='PyroFlow',
    DeepSprings='DeepSprings', YoungDruid='YoungDruid', TreeSpirits='TreeSpirits', RedwoodTreant='RedwoodTreant',
    WitchDoctor='WitchDoctor', LifeSteal='LifeSteal', Grizzly='Grizzly', GuardianAngel='GuardianAngel',
    Cherubim='Cherubim', WhiteDragon='WhiteDragon', BlueDragon='BlueDragon', Megoladon='Megoladon', DeepOne='DeepOne',
    SulfurRain='SulfurRain', Thunderhorse='Thunderhorse', RedDragon='RedDragon', Archangel='Archangel',
    Comet='Comet', Genie='Genie', BlackDragon='BlackDragon', Firestorm='Firestorm', Financier='Financier',
    ElephantCharge='ElephantCharge', FireHydra='FireHydra', Leviathan='Leviathan'
}
