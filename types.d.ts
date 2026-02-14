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
        targets?: import('./enum').Target
        effect?: CardEffect
    }
    sprite: import('./enum').CreatureSpriteIndex
}

interface CardEffect {
    dmg?:number
    dmgX?:boolean
    removal?:boolean
    destroy?:boolean
    duration?: number
    atkUp?:number
    defUp?:number
    draw?:number
    drawX?:boolean
    discard?:number
    pacifism?:boolean //Creatures you control do not move in their lanes
    hpPerLand?:import('./enum').CardType //entire board
    hpUp?:number
    untap?:boolean
    tap?:boolean
    repeat?:number
    pillaged?:boolean //does not untap
    searchSorceryForTop?:boolean
    searchCreatureForTop?:boolean
    cardToHandFromGY?:boolean
    attributes?: import('./enum').Modifier[]
    sprite: import('./enum').IconIndex
    viewHand?:boolean
    taunt?:boolean //new non-defender creatures must be placed in this creatures lane next turn
    tauntPlayer?:boolean //new non-defender creatures must be placed in an open lane next turn
    hpPerAttacker?:boolean
    discardAllAndDraw?:boolean
    resetMovement?:boolean //send all targets to starting tiles
    draw3TemplesIfLessLand?:boolean
    shuffle?:boolean
    lookAtHand?:boolean
    extraTurn?:boolean //extra turn and then you lose 
    hp3perBlackCreature?:boolean
    dmgAsYourDeserts?:boolean
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
