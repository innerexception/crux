import { store } from "../.."
import { CardType, Maps, Modal, SceneNames, UIReducerActions } from "../../enum"
import IntroScene from "../components/scenes/IntroScene"
import MapScene from "../components/scenes/MapScene"
import { transitionIn, transitionOut } from "./Utils"

export const onEndTurn = () => {
    store.getState().scene.endTurn()
}

export const onUpdateBoardCreature = (cd:Card) => {
    const d = store.getState().currentMatch.board.map(c=>c.id === cd.id ? cd : c)
    onUpdateBoard(d)
}

export const onUpdateActivePlayer = (id:string) => {
    store.dispatch({ type: UIReducerActions.UPDATE_PLAYER, data: id })
}

export const onUpdateBoard = (c:Card[]) => {
    store.dispatch({ type: UIReducerActions.UPDATE_BOARD, data: c })
}

export const onUpdatePlayer = (p:PlayerState) => {
    store.dispatch({ type: UIReducerActions.UPDATE_PLAYER, data: p })
}

export const onInspectCreature = (c:string) => {
    store.dispatch({ type: UIReducerActions.INSPECT_CARD, data: c })
}

export const onSelectCreature = (c:string, k:CardType) => {
    if(k){
        const state = store.getState()
        state.scene.startPreview(k)
    }
    store.dispatch({ type: UIReducerActions.SELECT_CARD, data: c })
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

export const onStartMatch = () => {
    store.dispatch({ type: UIReducerActions.START_NEW_MATCH, data:null })
    const intro = store.getState().scene.scene.get(SceneNames.Intro) as IntroScene
    transitionOut(intro, SceneNames.Main, ()=>transitionIn(store.getState().scene))
}


export const onShowModal = (modal:Modal) => {
    store.dispatch({ type: UIReducerActions.SHOW_MODAL, data:modal })
}

export const onSave = (saveName:string) => {
    // const now = new Date()
    // const uiState = store.getState()
    // const mapSave:SaveFile = {
    //     ...uiState.saveFile,
    //     creatures: Object.keys(uiState.scene.creatures).map(id=>uiState.scene.creatures[id].creatureState),
    //     creatureLocations: uiState.scene.creatureLocations,
    //     date: now.getMonth()+'/'+now.getDate()+'/'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()
    // }
    // localStorage.setItem(saveName, JSON.stringify(mapSave))
    // store.dispatch({ type: UIReducerActions.SAVE, data:saveName })
}

