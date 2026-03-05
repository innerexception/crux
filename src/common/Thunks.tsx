import { store } from "../.."
import { Modal, SceneNames, UIReducerActions } from "../../enum"
import IntroScene from "../components/scenes/IntroScene"
import MapScene from "../components/scenes/MapScene"
import { sendEndTurn, sendLandDeck } from "./Network"
import { getNewMatch, transitionIn, transitionOut, trySaveFile } from "./Utils"

export const onSetLobby = (id:string) => {
    store.dispatch({ type: UIReducerActions.SET_LOBBY, data:id })
}

export const onRecieveMessage = (data:MatchState) => {
    store.dispatch({ type: UIReducerActions.NETWORK_MESSAGE, data })
    store.getState().scene.refresh(data)
}

export const onRecievePlayer = (data:PlayerState) => {
    store.dispatch({ type: UIReducerActions.PLAYER_JOIN, data })
}

export const onEndTurn = (match:MatchState) => {
    if(match.players.find(p=>p.isAI)){
        store.getState().scene.endTurn(match)
    }
    else sendEndTurn(match)
}

export const onUpdateBoardCreature = (cd:Card) => {
    const d = store.getState().saveFile.currentMatch.board.map(c=>c.id === cd.id ? cd : c)
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

export const onInspectCreature = (c:string) => {
    store.dispatch({ type: UIReducerActions.INSPECT_CARD, data: c })
}

export const onSelectCreature = (k:Card) => {
    const state = store.getState()
    if(k){
        state.scene.startPreview(k)
        state.scene.showCardTargets(k)
    }
    else state.scene.hideCardTargets()
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

    store.dispatch({ type: UIReducerActions.SHOW_MODAL, data:Modal.NewGame })
}

export const onSetScene = (scene:MapScene) => {
    store.dispatch({ type: UIReducerActions.SET_SCENE, data: scene })
}

export const onStartMatch = (s:SaveFile, opponent:PlayerState, startingPlayerId:string) => {
    if(!s.currentMatch) s.currentMatch = getNewMatch(s, opponent, startingPlayerId)
    store.dispatch({ type: UIReducerActions.START_NEW_MATCH, data:s.currentMatch })
    const intro = store.getState().scene.scene.get(SceneNames.Intro) as IntroScene
    transitionOut(intro, SceneNames.Main, ()=>transitionIn(store.getState().scene))
    if(startingPlayerId === s.myId){
        sendLandDeck(s.currentMatch.lands)
    }
}

export const onShowModal = (modal:Modal) => {
    store.dispatch({ type: UIReducerActions.SHOW_MODAL, data:modal })
}

export const onSave = () => {
    const uiState = store.getState().saveFile
    trySaveFile(JSON.stringify(uiState))
    onUpdateSave(uiState)
}

