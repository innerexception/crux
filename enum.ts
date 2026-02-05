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
    Deckbuilder='Deckbuilder',Graveyard='Graveyard'
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

export enum CardType {
    Goblin='Goblin',GoblinKing='Goblin King',Mountain='Mountain'
}

export enum StatusEffect {
    Pillaged='Pillaged'
}

export enum CreatureSpriteIndex {
    Grass=321, Tree=322, Moss=235, Vicevine=238, Mushroom=234, Shroomling=233, Eagle=164, Rat=152, Cyclops=74, Unicorn=147, Soil=339, 
    DeadMatter=368, Snake=150, Grub=252, Catapillar=245, Butterfly=111, TwoHeadedCyclops=73, Zombie=97, Eyeball=104, TROLL=39, SERAPH=32,
    MEGAWASP=42, BEHOLDER=23, FIRE_ELEMENTAL=9, DEATH_VINE=16, ELDER_DRAGON=3, MAMMOTH=6, Elephant=156, Ratman=62, Protodrake=240,
    YIGGTREE=14, Mandrake=323, Ape=157,Adventurer1=16,Adventurer2=6,Adventurer3=9,Adventurer4=2
}

export enum IconIndex {
    Selected=14, Mana=63, Hunger=79, Summon=98, Options=96, Close=37, Herbivore=15, Carnivore=79, DeadMatter=16, Soil=76,
    Quit=38,Save=99,Bored=40, Adventurer=53, Smite=65, Monitor=104, Sword=3
}

export enum Color {
    Red='red',Blue='blue',Green='green',Black='black',White='white',None='gray'
}

export enum Modifier {
    Banding=1,ProtectionFromBlack,ProtectionFromWhite,ProtectionFromRed,ProtectionFromGreen,ProtectionFromBlue,FirstStrike
}

export enum Permanents {
    Land='Land',Creature='Creature',Enchantment='Enchantment',Any='Any',Sorcery='Sorcery'
}