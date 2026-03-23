import { GameObjects, Geom, Scene } from "phaser"
import { CardType, Color, CreatureSpriteIndex, Direction, Layers, Permanents } from "../../enum"
import BattleScene from "../components/scenes/BattleScene"
import { AIPlayers, getCardData, getFreshLands } from "./CardUtils"
import { SAVE_NAMES } from "./UIReducer"
import{ v4 } from 'uuid'
import { store } from "../.."

export const emptyMana = {
    [Color.Black]:0,
    [Color.Blue]:0,
    [Color.Green]:0,
    [Color.Red]:0,
    [Color.White]:0,
    [Color.None]:0
}

export const canAct = () => {
    const state = store.getState()
    if(!state.netAck) return false
    if(!state.saveFile) return false
    if(!state.saveFile.currentMatch) return false
    return state.saveFile.currentMatch.activePlayerId === state.saveFile.myId
}

export const getNewMatch = (s:SaveFile, opponent:PlayerState, startingPlayerId:string):MatchState => {
    const theDeck = s.decks.find(d=>d.id === s.currentDeckId)
    const deck:Deck = {
        id:v4(),
        name: theDeck.name,
        cards: shuffle(Array.from(theDeck.cards))
    }
    const hand = deck.cards.splice(0,5)
    return {
        previousLobbyId:'',
        activePlayerId: startingPlayerId,
        board:[],
        logs:[],
        lands: getFreshLands(),
        players: [
            {
                id:s.myId,
                hp:20,
                dir:startingPlayerId === s.myId ? Direction.SOUTH : Direction.NORTH,
                hand,
                deck,
                discard: [],
                manaPool:{...emptyMana},
                isAI: false,
                hasPlayedLand: false,
                drawAllowed: 1,
                playerSprite: s.playerSprite
            },
            {...opponent, dir: startingPlayerId === s.myId ? Direction.NORTH:Direction.SOUTH}
        ]
    }
}

export const getAIPlayer = (kind:CreatureSpriteIndex):PlayerState => {
    const id = v4()
    const deck = AIPlayers[kind].deck(id)
    const hand = deck.splice(0,5)
    return {
        id,
        hp:AIPlayers[kind].hp,
        dir:null,
        hand,
        deck: {
            id:v4(),
            cards: deck,
            name: 'ai basic'
        },
        discard: [],
        manaPool:{...emptyMana},
        isAI: true,
        drawAllowed: 1,
        hasPlayedLand: false,
        playerSprite: AIPlayers[kind].sprite
    }
}

export const canAfford = (mana:Record<Color,number>, c:Card) => {
    if(c.kind === CardType.MercenaryCaptain || c.kind === CardType.CircleOfLife){
        if(!store.getState().saveFile.currentMatch.board.find(cc=>getCardData(cc).kind === Permanents.Creature && cc.ownerId === c.ownerId)){
            return false
        }
    }
    const cost = getCardData(c).cost
    if(cost){
        const colorlessCost = cost.find(c=>c.kind === Color.None)
        if(!colorlessCost){
            return !cost.find(c=>mana[c.kind] < c.amount)
        }
        else {
            //subtract colored first to get remainder
            let mans = {...mana}
            const invalidAmt = cost.filter(c=>c.kind !== Color.None).find(c=>mans[c.kind]<c.amount)
            if(invalidAmt) return false

            cost.filter(c=>c.kind !== Color.None).forEach(c=>mans[c.kind]-=c.amount)
            const colorless = Object.keys(mans).map((c:Color)=>mans[c]).reduce((sum,next)=>sum+next)
            return colorless >= colorlessCost.amount
        }
    }
    return true
}

export const getColorlessRemain = (mana:Record<Color,number>, c:Card) => {
    const cost = getCardData(c).cost
    //subtract colored first to get remainder
    const mans = {...mana}
    cost.filter(c=>c.kind !== Color.None).forEach(c=>mans[c.kind]-=c.amount)
    const colorless = Object.keys(mans).map((c:Color)=>mans[c]).reduce((sum,next)=>sum+next)
    return colorless
}

export const payCost = (mana:Record<Color,number>, cost?:ManaCost[]):Record<Color,number> => {
    const newMana = {...mana}
    if(!cost) return newMana
    cost.filter(c=>c.kind!==Color.None).forEach(c=>{
        newMana[c.kind]-=c.amount
    })
    const colorless = cost.find(c=>c.kind===Color.None)
    if(colorless){
        let amt = colorless.amount
        while(amt > 0){
            Object.keys(newMana).forEach(color=>{
                if(newMana[color]>0 && amt > 0){
                    newMana[color]--
                    amt--
                } 
            })
        }
    }
    return newMana
}

export const trySaveFile = async (json:string) => {
    // try{
    //     console.log('invoke save')
    //     // await ipcRenderer.invoke('save', json)
    // }
    // catch(e) {
        console.log('saving locally: ')
        localStorage.setItem(SAVE_NAMES[0], json)
    //}
}

export const tryLoadFile = async () => {
    //try{
        // const payload = await ipcRenderer.invoke('load')
        // return JSON.parse(payload) as SaveFile
    //}
    //catch(e){
        console.log('using local save: ')
        return JSON.parse(localStorage.getItem(SAVE_NAMES[0])) as SaveFile
    //}
}

export const isPassableTile = (scene:BattleScene, tileX:number, tileY:number) => {
    const tile = scene.map.getTileAt(tileX, tileY, false, Layers.Earth)
    if(tile)
        return tile.index - tile.tileset.firstgid === 160 || tile.index - tile.tileset.firstgid === 161

    return false
}

export const drawCirclePercent = (x:number, y:number, g:GameObjects.Graphics, percent:number) => {
    let points = new Geom.Ellipse(x, y, 6, 4).getPoints(25)
    g.clear()
    g.lineStyle(4, 0xffffff)
    g.strokePoints(points.slice(0, Math.round(25*percent)))
    g.lineStyle(1, 0x000000)
    g.strokeEllipse(x, y, 10, 8)
    g.strokeEllipse(x, y, 4, 2)
}

export const drawMarchingDashedRect = (
    g:GameObjects.Graphics,
    rect:Geom.Rectangle,
    offset = 0,
) => {
    let {x, y, width, height} = rect
    width-=2
    height-=2
    const dashLength = 5, gapLength = 2
    const perimeter = 2 * (width + height);
    const step = dashLength + gapLength;

    let dist = offset % step;
    if (dist < 0) dist += step;

    while (dist < perimeter) {
        const start = dist;
        const end = Math.min(dist + dashLength, perimeter);

        drawRectSegment(g, x, y, width, height, start, end);
        dist += step;
    }
}


const rect_dim = 32

export const transitionOut = (scene:Scene, nextScene:string, cb:Function) => {
    let rects = []
    let rows = scene.cameras.default.width/rect_dim
    let cols = scene.cameras.default.height/rect_dim
    for(var i=0; i<=rows*2; i++){
        for(var j=0; j<=cols*2; j++){
            let rect = scene.add.image(i*rect_dim, j*rect_dim, 'black')
            rect.setDisplaySize(rect_dim,rect_dim).setDepth(5).setVisible(false)
            rects.push(rect)
        } 
    }
    rects.forEach(r=>{
        scene.time.addEvent({
            delay: Phaser.Math.Between(250,750),
            callback: ()=>{
                r.setVisible(true)
            }
        })
    })
    scene.time.addEvent({
        delay: 800,
        callback:()=>{
            scene.scene.sendToBack(scene.scene.key)
            scene.scene.sleep(scene.scene.key)
            scene.scene.start(nextScene)
            scene.scene.bringToTop(nextScene)
            cb()
            scene.time.addEvent({
                delay:200,
                callback:()=>{
                    rects.forEach(r=>r.destroy())
                }
            })
        }
    })
}

export const transitionIn = (scene:Scene) => {
    let rects = []
    let rows = scene.cameras.default.width/rect_dim
    let cols = scene.cameras.default.height/rect_dim
    for(var i=0; i<=rows; i++){
        for(var j=0; j<=cols; j++){
            let rect = scene.add.image(i*rect_dim, j*rect_dim, 'black')
            rect.setDisplaySize(rect_dim,rect_dim).setDepth(5)
            rects.push(rect)
        } 
    }
    rects.forEach(r=>{
        scene.time.addEvent({
            delay: Phaser.Math.Between(250,750),
            callback: ()=>{
                r.destroy()
            }
        })
    });
    (scene as any).onTransitionIn()
}

export const shuffle = (array:Array<any>) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return Array.from(array);
}

export const drawRectSegment = (graphics, x, y, w, h, start, end) => {
    const edges = [
        { x1: x,     y1: y,     x2: x + w, y2: y     }, // top
        { x1: x + w, y1: y,     x2: x + w, y2: y + h }, // right
        { x1: x + w, y1: y + h, x2: x,     y2: y + h }, // bottom
        { x1: x,     y1: y + h, x2: x,     y2: y     }  // left
    ];

    let edgeStart = 0;

    for (const e of edges) {
        const edgeLength = Phaser.Math.Distance.Between(
            e.x1, e.y1, e.x2, e.y2
        );

        if (start < edgeStart + edgeLength) {
            const s = Math.max(0, start - edgeStart);
            const t = Math.min(edgeLength, end - edgeStart);

            const angle = Math.atan2(e.y2 - e.y1, e.x2 - e.x1);

            graphics.lineBetween(
                e.x1 + Math.cos(angle) * s,
                e.y1 + Math.sin(angle) * s,
                e.x1 + Math.cos(angle) * t,
                e.y1 + Math.sin(angle) * t
            );
        }

        edgeStart += edgeLength;
        if (edgeStart > end) break;
    }
}

