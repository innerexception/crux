import { store } from "../.."
import { Modal, SceneNames, UIReducerActions } from "../../enum"
import IntroScene from "../components/scenes/IntroScene"
import MapScene from "../components/scenes/MapScene"
import { getNewMatch, transitionIn, transitionOut, trySaveFile } from "./Utils"

export const onSetLobby = (id:string) => {
    store.dispatch({ type: UIReducerActions.SET_LOBBY, data:id })
}

export const onRecieveMessage = (data:MatchState) => {
    store.dispatch({ type: UIReducerActions.NETWORK_MESSAGE, data })
}

export const onEndTurn = () => {
    store.getState().scene.endTurn()
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

export const onSelectCreature = (cid:string, k:Card) => {
    const state = store.getState()
    if(k){
        state.scene.startPreview(k)
        state.scene.showCardTargets(true)
    }
    else state.scene.showCardTargets(false)
    store.dispatch({ type: UIReducerActions.SELECT_CARD, data: cid })
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

export const onStartMatch = (s:SaveFile, opponent:PlayerState) => {
    if(!s.currentMatch) s.currentMatch = getNewMatch(s, opponent)
    store.dispatch({ type: UIReducerActions.START_NEW_MATCH, data:s.currentMatch })
    const intro = store.getState().scene.scene.get(SceneNames.Intro) as IntroScene
    transitionOut(intro, SceneNames.Main, ()=>transitionIn(store.getState().scene))
}


export const onShowModal = (modal:Modal) => {
    store.dispatch({ type: UIReducerActions.SHOW_MODAL, data:modal })
}

export const onSave = (saveName:string) => {
    const uiState = store.getState().saveFile
    trySaveFile(JSON.stringify(uiState))
    onUpdateSave(uiState)
}

