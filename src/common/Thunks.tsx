import { store } from "../.."
import { Modal, SceneNames, UIReducerActions } from "../../enum"
import IntroScene from "../components/scenes/IntroScene"
import BattleScene from "../components/scenes/BattleScene"
import { net_cancelPendingAction, net_endTurn, sendCancelAction, sendEndTurn, sendLandDeck } from "./Network"
import { getNewMatch, transitionIn, transitionOut, trySaveFile } from "./Utils"
import MapScene from "../components/scenes/MapScene"

export const addLogEntry = (data:LogEntry) => {
    store.dispatch({ type: UIReducerActions.ADD_LOG, data })
}

export const onSetRepeatingCardAbility = (times:number) => {
    store.dispatch({ type: UIReducerActions.SET_REPEAT, data:times })
}

export const onSetActionAcknowledge = (state:boolean) => {
    store.dispatch({ type: UIReducerActions.SET_NET_ACK, data:state })
}

export const onShowAbilityPreview = (ability:CardAbility) => {
    store.dispatch({ type: UIReducerActions.SET_ABILITY, data:ability })
}

export const onSetLobby = (id:string) => {
    store.dispatch({ type: UIReducerActions.SET_LOBBY, data:id })
}

export const onRecieveMessage = (data:{match: MatchState}) => {
    store.dispatch({ type: UIReducerActions.NETWORK_MESSAGE, data: data.match })
}

export const onRecievePlayer = (data:PlayerState) => {
    store.dispatch({ type: UIReducerActions.PLAYER_JOIN, data })
}

export const onEndTurn = async (match:MatchState) => {
    if(match.players.find(p=>p.isAI)){
        await net_endTurn(match)
    }
    else sendEndTurn(match)
}

export const onTurnProcessing = (state:boolean) => {
    store.dispatch({ type: UIReducerActions.SET_PROCESSING, data:state })
}

export const onUpdateBoardCreature = (cd:Card) => {
    const d = store.getState().saveFile.currentMatch.board.map(c=>c.id === cd.id ? cd : c)
    const spr = store.getState().scene.creatures.find(c=>c.id === cd.id)
    if(cd.tapped) spr.tap()
    onUpdateBoard(d)
}

export const onUpdateActivePlayer = (id:string) => {
    store.dispatch({ type: UIReducerActions.UPDATE_ACTIVE, data: id })
}

export const onUpdateBoard = (c:Card[]) => {
    store.dispatch({ type: UIReducerActions.UPDATE_BOARD, data: c })
}

export const onUpdateLands = (c:Card[]) => {
    store.dispatch({ type: UIReducerActions.UPDATE_LANDS, data: c })
}

export const onUpdatePlayer = (p:PlayerState) => {
    store.dispatch({ type: UIReducerActions.UPDATE_PLAYER, data: p })
}

export const onInspectCreature = (c:Card) => {
    store.dispatch({ type: UIReducerActions.INSPECT_CARD, data: c })
}

export const onSelectCard = (k:Card) => {
    const state = store.getState()
    if(k){
        state.scene.startPreview(k)
        state.scene.showCardTargets(k)
        store.dispatch({ type: UIReducerActions.SELECT_CARD, data: k.id })
    }
    else{
        state.scene.hideCardTargets()
        store.dispatch({ type: UIReducerActions.SELECT_CARD, data: null })
    } 
}

export const onSelectBoardCard = (k:Card) => {
    store.dispatch({ type: UIReducerActions.SELECT_CARD, data: k.id })
}

export const onUpdateSave = (s:SaveFile) => {
    store.dispatch({ type: UIReducerActions.UPDATE, data: s })
}

export const onQuit = () => {
    store.getState().scene.sound.stopAll()
    store.getState().scene.scene.transition({
        target: SceneNames.Intro,
        duration: 3000,
        sleep: true,
        remove: false,
        allowInput: false,
        moveAbove: true,
        data: null
    })
    //const intro = store.getState().scene.scene.get(SceneNames.Intro) as IntroScene
    //intro.sound.get(SoundEffects.Intro).play()
    onShowModal(Modal.NewGame)
}

export const onSetScene = (scene:BattleScene) => {
    store.dispatch({ type: UIReducerActions.SET_SCENE, data: scene })
}

export const onShowCampaign = () => {
    const intro = store.getState().scene.scene.get(SceneNames.Intro) as IntroScene
    const map = store.getState().scene.scene.get(SceneNames.Map) as MapScene
    transitionOut(intro, SceneNames.Map, ()=>transitionIn(map))
}

export const onStartMatch = (s:SaveFile, opponent:PlayerState, startingPlayerId:string) => {
    if(!s.currentMatch) s.currentMatch = getNewMatch(s, opponent, startingPlayerId)
    store.dispatch({ type: UIReducerActions.START_NEW_MATCH, data:s.currentMatch })
    const intro = store.getState().scene.scene.get(SceneNames.Intro) as IntroScene
    transitionOut(intro, SceneNames.Main, ()=>transitionIn(store.getState().scene))
    if(startingPlayerId === s.myId && !opponent.isAI){
        sendLandDeck(s.currentMatch.lands)
    }
}

export const onStartCampaignMatch = (s:SaveFile, opponent:PlayerState, startingPlayerId:string) => {
    s.currentMatch = getNewMatch(s, opponent, startingPlayerId)
    store.dispatch({ type: UIReducerActions.START_NEW_MATCH, data:s.currentMatch })
    const intro = store.getState().scene.scene.get(SceneNames.Map) as MapScene
    const btl = store.getState().scene.scene.get(SceneNames.Main) as BattleScene
    transitionOut(intro, SceneNames.Main, ()=>transitionIn(btl))
    if(startingPlayerId === s.myId && !opponent.isAI){
        sendLandDeck(s.currentMatch.lands)
    }
}

export const onCancelAction = () =>{
    if(store.getState().saveFile.currentMatch.players.find(p=>p.isAI)){
        net_cancelPendingAction()
    }
    else sendCancelAction()
}

export const onShowModal = (modal:Modal, data?:ModalData) => {
    store.dispatch({ type: UIReducerActions.SHOW_MODAL, data:{modal,data} })
}

export const onSave = () => {
    const uiState = store.getState().saveFile
    trySaveFile(JSON.stringify(uiState))
    onUpdateSave(uiState)
}

