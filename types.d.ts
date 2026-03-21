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
    required?:boolean
    targets: import('./enum').Target
    withoutColor?:import('./enum').Color //does not affect cards of this color
    withoutAttribute?: import('./enum').Modifier
    withColor?:import('./enum').Color //only affect cards of this color
    withAttribute?: import('./enum').Modifier
    withCategory?: import('./enum').Category
    whenAttackingLand?: import('./enum').CardType
    def3orLess?:boolean //targets creatures with def 3 or less
    trigger?: import('./enum').Triggers //default is onEnter
    conditionalSpend?: import('./enum').Color //ability only triggers if this color was spent
    effect: CardEffect
}

interface CardEffect {
    addMana?:import('./enum').Color
    dmg?:number
    casterDmg?:number
    casterHpUp?:number
    damageReflect?:boolean //Damage done to player is applied to creature owner as well
    dmgX?:boolean
    dmgAsCreaturePower?:true //Damage based on sacrificed creature power
    dmgAsDeserts?:boolean
    destroy?:boolean
    destroyAllInLane?:boolean
    playerDamage?:number //Also deal damage to players from a creature targeting effect
    duration?: number //777 = until discarded
    emptyGraveyard?:boolean //move GY to codex
    atkUp?:number
    defUp?:number
    draw?:number
    discard?:number
    drawX?:boolean
    drawForDeserts?:boolean
    drawLandIfLess?:boolean
    drawIfFewerCards?:boolean
    drawForTappedOpponent?:boolean //draw 1 for each tapped creature of opponent
    discardAtRandom?:number
    discardToDraw?:boolean //Discard any number to draw that number
    discardAllAndDraw?:boolean
    pacifism?:boolean //Tap targets for a duration
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
    searchForLand?: import('./enum').CardType //Goes into play instantly
    sorceryToHandFromGY?:boolean
    creatureToHandFromCodex?:boolean
    cardToHandFromGY?:boolean
    creatureToHandFromGY?:boolean
    arrangeTop5Remove1?:boolean
    addAttributes?: import('./enum').Modifier[]
    sprite: import('./enum').IconIndex
    casterHpUpOnKill?:number
    returnToHand?:boolean
    returnToBattle?:boolean
    playExtraLand?:boolean
    tauntPlayer?:boolean //new creatures must be placed in an open lane
    resetMovement?:boolean //send all targets to starting tiles
    shuffle?:boolean
    lookAtTop3?:boolean
    lookAtTop3Choose1?:boolean
    lookAtHand?:boolean
    extraTurn?:boolean //extra turn and then you lose 
    hp3perBlackCreature?:boolean
    lightningSpecial?:boolean
    transformInto?: import('./enum').CardType
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
    damageReflect?:number
}

interface MatchState {
    previousLobbyId:string
    activePlayerId:string
    players: PlayerState[]
    board:Card[]
    lands:Card[]
    logs:LogEntry[]
}

interface RState {
    repeatCount:number
    netAck:boolean
    previewAbility: CardAbility
    activeModal: import('./enum').Modal
    modalData: ModalData
    isLoaded:boolean
    turnProcessing:boolean
    saveFile:SaveFile
    lobbyId:string
    joinedPlayer: PlayerState
    selectedSaveName: string
    inspectCard: Card
    selectedCardId: string
    scene: import('./src/components/scenes/MapScene').default
}

interface LogEntry {
    kind: import('./enum').Log
    card: Card
    target?: Card
    effect?: StatusEffect
}

interface ModalData { 
    cards:Card[]
    targetPlayerId:string
    keep?:number
    play?:boolean
    discard?: number
    chooseType?: import('./enum').Permanents
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
