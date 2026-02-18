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
    newSummon:boolean
    tileX:number
    tileY:number
    atk:number
    def:number
    attributes: import('./enum').Modifier[]
    moves:number
}

interface CardMeta {
    color:import('./enum').Color
    defaultAtk?:number
    defaultDef?:number
    defaultMoves?:number
    cost?: ManaCost[]
    description?:string
    pumpColor?: import('./enum').Color
    kind: import('./enum').Permanents
    defaultAttributes?: import('./enum').Modifier[]
    ability: {
        cost?: ManaCost[]
        tap?: boolean
        targets: import('./enum').Target
        trigger?: import('./enum').Triggers //default is onEnter
        effect: CardEffect
    }
    sprite: import('./enum').CreatureSpriteIndex
}

interface CardEffect {
    addMana?:import('./enum').Color
    dmg?:number
    damageReflect?:boolean //Damage done to player is applied to creature owner as well
    dmgX?:boolean
    dmgAsCreaturePower?:true //Damage based on sacrificed creature power
    removal?:boolean
    destroy?:boolean
    destroyAll?:boolean //all of target type
    destroy2Creatures?:boolean
    destroyOnEnter?:boolean //destroy a land you control
    duration?: number
    atkUp?:number
    defUp?:number
    whenDamaged?:boolean //procs when damage is applied to this creature
    draw?:number
    drawX?:boolean
    draw3TemplesIfLessLand?:boolean
    drawIfFewerCards?:boolean
    drawForTappedOpponent?:boolean //draw 1 for each tapped creature of opponent
    discard?:number
    discardToDraw?:boolean //Discard any number to draw that number
    pacifism?:boolean //Creatures you control do not move in their lanes
    pacifyAllOfPlayer?:boolean //Creatures and lands are tapped until next untap phase
    hpPerLand?:import('./enum').CardType //entire board
    hpUp?:number
    hpToOwner?:number
    untap?:boolean
    tap?:boolean //tapped creatures do not advance, can't use abilities
    ignoreColor?:import('./enum').Color //does not affect cards of this color
    onlyColor?:import('./enum').Color //only affect cards of this color
    withAttribute?: import('./enum').Modifier
    repeat?:number
    pillaged?:boolean //does not untap
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
    play3Land?:boolean
    destroyForest?:boolean
    searchForForest?:boolean //Goes into play instantly
    viewHand?:boolean
    taunt?:boolean //new non-defender creatures must be placed in this creatures lane next turn
    tauntPlayer?:boolean //new non-defender creatures must be placed in an open lane next turn
    hpPerAttacker?:boolean
    discardAllAndDraw?:boolean
    resetMovement?:boolean //send all targets to starting tiles
    shuffle?:boolean
    putForestInPlay?:boolean
    viewTop3?:boolean
    lookAtHand?:boolean
    drawForDeserts?:boolean
    extraTurn?:boolean //extra turn and then you lose 
    hp3perBlackCreature?:boolean
    dmgAsYourDeserts?:boolean
    lightningSpecial?:boolean
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
    sprite: import('./enum').CreatureSpriteIndex
}

interface MatchState {
    activePlayerId:string
    players: PlayerState[]
    board:Card[]
}

interface RState {
    activeModal: import('./enum').Modal
    isLoaded:boolean
    saveFile:SaveFile
    selectedSaveName: string
    inspectCardId: string
    selectedCardId: string
    scene: import('./src/components/scenes/MapScene').default
}

interface SaveFile {
    myId:string
    name:string
    decks:Deck[]
    currentDeckId: string
    cards:Card[]
    currentMatch:MatchState
}
