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
    UPDATE_ACTIVE='UPDATE_ACTIVE'
}

export enum Modal {
    NewGame='ng',SelectSave='SelectSave',Options='Options',SelectLoad='SelectLoad',
    Deckbuilder='Deckbuilder',Graveyard='Graveyard',AnyGraveyard='AnyGraveyard',
    ChooseFromGY='ChooseFromGY',ChooseDiscard='ChooseDiscard',PickNextSorcery='PickNextSorcery',
    GameOver='GameOver',Winner='Winner'
}

export enum Direction {
    NORTH=1,SOUTH=-1
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
    Sandstorm=1505,Earthquake=1900,PeaceTreaty=2138,HeroicSoldier=4893,FertileSoil=2483,Hurricane=4377,Goblin=4545,
    ForestJackal=4102,Merfolk=3956,Refreshment=2218,BillyGoat=4162,ScavengingRats=4089,Memoize=1964,Brainstorm=2028,
    Necromancy=2095,FierySpear=1997,Sanctuary=385
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
    Land='Land',Creature='Creature',Enchantment='Enchantment',Any='Any',Sorcery='Sorcery',Self='Self',CreaturesYouControl='CreaturesYouControl',
    CreaturesAndPlayers='CreaturesAndPlayers',Players='Players',CreaturesYourGraveyard='CreaturesYourGraveyard',CreaturesOrPlayers='CreaturesOrPlayers',
    CreaturesAnyGraveyard='CreaturesAnyGraveyard'
}

export enum Modifier {
    Banding=1,ProtectionFromBlack,ProtectionFromWhite,ProtectionFromRed,ProtectionFromGreen,ProtectionFromBlue,FirstStrike,
    Flying,OnlyFlying,CantBlock, //Can't be put in a lane w/ an opposing creature
    DesertWalk, //Ghostly in lane that ends in a desert
    Berserk //Haste
}

export const ModifierDesc:Record<Modifier,string> = {
    [Modifier.Banding]: 'Banding',
    [Modifier.Berserk]: 'Berserk',
    [Modifier.CantBlock]: 'Timid',
    [Modifier.DesertWalk]: 'Pathfinder - Desert',
    [Modifier.FirstStrike]: 'Ambush',
    [Modifier.Flying]: 'Flying',
    [Modifier.OnlyFlying]: 'Airborn',
    [Modifier.ProtectionFromBlack]: 'Protection from City',
    [Modifier.ProtectionFromBlue]: 'Protection from Spirit',
    [Modifier.ProtectionFromGreen]: 'Protection from Forest',
    [Modifier.ProtectionFromRed]: 'Protection from Desert',
    [Modifier.ProtectionFromWhite]: 'Protection from Holy'
}

export const PermanentsDesc:Record<Permanents,string> = {
    [Permanents.Any]:'',
    [Permanents.Sorcery]:'',
    [Permanents.Creature]:'Creatures',
    [Permanents.CreaturesAndPlayers]:'Creatures & Players',
    [Permanents.CreaturesOrPlayers]:'Creatures or Players',
    [Permanents.CreaturesYouControl]:'Creatures you control',
    [Permanents.CreaturesYourGraveyard]:'Creatures in your graveyard',
    [Permanents.CreaturesAnyGraveyard]:'Creatures in any graveyard',
    [Permanents.Enchantment]:'Enchantments',
    [Permanents.Land]:'Lands',
    [Permanents.Players]:'Any Player',
    [Permanents.Self]:'You'
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
    Sanctuary='Sanctuary',Desert='Desert',Tower='Tower',City='City',Forest='Forest',
    Sandstorm='Sandstorm',FireCloak='FireCloak',FeatherCloak='FeatherCloak',
    SkyPirates='SkyPirates',HeroicSoldier='HeroicSoldier',Earthquake='Earthquake',
    PeaceTreaty='PeaceTreaty', FertileSoil='FertileSoil',Hurricane='Hurricane',
    ForestJackal='JunglePanther',Merfolk='Merfolk',Refreshment='Refreshment',
    BillyGoat='BillyGoat', ScavengingRats='ScavengingRats',Memoize='Memoize',
    Brainstorm='Brainstorm', Goblin='Goblin', Necromancy='Necromancy', FierySpear='FierySpear',

}
