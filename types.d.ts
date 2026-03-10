interface PhaserResource {
    key:string
    resource: any
    type: string
    data?: any
}

interface ManaCost {
    kind: import('./enum').Color
    amount: number
}

interface StatusEffect {
    id:string
    duration: number
    status: CardEffect
}

interface Card {
    id:string
    ownerId:string
    kind: import('./enum').CardType
    status: StatusEffect[]
    tapped:boolean
    tileX:number
    tileY:number
    atk:number
    def:number
    attributes: import('./enum').Modifier[]
    moves:number
}

interface CardMeta {
    color:import('./enum').Color
    category?: import('./enum').Category
    defaultAtk?:number
    defaultDef?:number
    defaultMoves?:number
    cost?: ManaCost[]
    description?:string
    pumpColor?: import('./enum').Color
    kind: import('./enum').Permanents
    defaultAttributes?: import('./enum').Modifier[]
    ability?: CardAbility
    sprite: import('./enum').CreatureSpriteIndex
}

interface CardAbility  {
    cost?: ManaCost[]
    tap?: boolean
    targets: import('./enum').Target
    withoutColor?:import('./enum').Color //does not affect cards of this color
    withoutAttribute?: import('./enum').Modifier
    withColor?:import('./enum').Color //only affect cards of this color
    withAttribute?: import('./enum').Modifier
    withCategory?: import('./enum').Category
    def3orLess?:boolean //targets creatures with def 3 or less
    trigger?: import('./enum').Triggers //default is onEnter
    conditionalSpend?: import('./enum').Color //ability only triggers if this color was spent
    effect: CardEffect
}

interface CardEffect {
    addMana?:import('./enum').Color
    dmg?:number
    damageReflect?:boolean //Damage done to player is applied to creature owner as well
    dmgX?:boolean
    dmgAsCreaturePower?:true //Damage based on sacrificed creature power
    dmgAsYourDeserts?:boolean
    destroy?:boolean
    destroyAll?:boolean //all of target type
    destroy2Creatures?:boolean
    destroyForest?:boolean
    destroyTower?:boolean
    destroyOnEnter?:boolean //destroy a land you control
    duration?: number //777 = until discarded
    atkUp?:number
    defUp?:number
    whenDamaged?:boolean //procs when damage is applied to this creature
    draw?:number
    drawX?:boolean
    drawForDeserts?:boolean
    draw3TemplesIfLessLand?:boolean
    drawIfFewerCards?:boolean
    drawForTappedOpponent?:boolean //draw 1 for each tapped creature of opponent
    discard?:number
    discardToDraw?:boolean //Discard any number to draw that number
    discardAllAndDraw?:boolean
    pacifism?:boolean //Tap targets for a duration
    pacifyAllOfPlayer?:boolean //Creatures and lands are tapped until next untap phase
    hpPerLand?:import('./enum').CardType //entire board
    hpUp?:number
    hpToOwner?:number
    hpPerAttacker?:boolean
    untap?:boolean
    tap?:boolean //tapped creatures do not advance, can't use abilities
    repeat?:number
    removeAttribute?: import('./enum').Modifier
    snare?:boolean //does not untap
    searchSorceryForTop?:boolean
    searchCreatureForTop?:boolean
    searchCardForTop?:boolean
    creatureToHandFromLibrary?:boolean
    cardToHandFromGY?:boolean
    creatureToLibrary?:boolean //from board to top of owner library
    sorceryToHandFromGY?:boolean
    creatureToHandFromGY?:boolean
    arrangeTop5Remove1?:boolean
    addAttributes?: import('./enum').Modifier[]
    sprite: import('./enum').IconIndex
    returnToHand?:boolean
    returnToBattle?:boolean
    playExtraLand?:boolean
    searchForForest?:boolean //Goes into play instantly
    taunt?:boolean //creatures may not leave this creature's lane
    tauntPlayer?:boolean //new creatures must be placed in an open lane
    resetMovement?:boolean //send all targets to starting tiles
    shuffle?:boolean
    putForestInPlay?:boolean
    lookAtTop3?:boolean
    lookAtHand?:boolean
    extraTurn?:boolean //extra turn and then you lose 
    hp3perBlackCreature?:boolean
    lightningSpecial?:boolean
    retribution?:boolean //creatures that destroy a creature during the next combat are destroyed
}

interface Deck {
    id:string
    name:string
    cards: Card[]
}

interface PlayerState {
    id:string
    hp:number
    dir: import('./enum').Direction
    hand: Card[]
    deck: Deck
    discard: Card[]
    manaPool: Record<import('./enum').Color,number>
    isAI:boolean
    hasPlayedLand:boolean
    drawAllowed:number
    playerSprite: import('./enum').CreatureSpriteIndex
}

interface MatchState {
    previousLobbyId:string
    activePlayerId:string
    players: PlayerState[]
    board:Card[]
    lands:Card[]
}

interface RState {
    previewAbility: CardAbility
    activeModal: import('./enum').Modal
    modalData: ModalData
    isLoaded:boolean
    turnProcessing:boolean
    saveFile:SaveFile
    lobbyId:string
    joinedPlayer: PlayerState
    selectedSaveName: string
    inspectCardId: string
    selectedCardId: string
    scene: import('./src/components/scenes/MapScene').default
}

interface ModalData { 
    cards:Card[]
} 

interface SaveFile {
    myId:string
    playerSprite: import('./enum').CreatureSpriteIndex
    name:string
    decks:Deck[]
    currentDeckId: string
    cards:Card[]
    currentMatch:MatchState
}
