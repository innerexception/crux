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
}

interface CardMeta {
    color:import('./enum').Color
    atk?:number
    def?:number
    moves?:number
    cost?: ManaCost[]
    description?:string
    pumpColor?: import('./enum').Color
    kind: import('./enum').Permanents
    attributes?: import('./enum').Modifier[]
    ability: {
        cost?: ManaCost[]
        tap?: boolean
        targets?: import('./enum').Permanents
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
    hpPerForest?:boolean //entire board
    untap?:boolean
    pillaged?:boolean //does not untap
    searchSorceryForTop?:boolean
    cardToHand?:boolean
    attributes?: import('./enum').Modifier[]
    sprite: import('./enum').IconIndex
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
