import { UIReducerActions } from "../../enum";
import { getNewMatch } from "./Utils";

export const SAVE_NAMES = ['crux_save_1','crux_save_2','crux_save_3']

interface DispatchAction {
    type: UIReducerActions
    data?: any
}

const appReducer = (state:RState = getInitialState(), action: DispatchAction): RState => {
    switch (action.type) {
        case UIReducerActions.UPDATE:
            return { ...state, saveFile: action.data }
        case UIReducerActions.SHOW_MODAL: 
            return { ...state, activeModal: action.data }
        case UIReducerActions.START_NEW_MATCH:
            return { ...state, saveFile: {...state.saveFile, currentMatch: action.data}, activeModal:null, isLoaded: true }
        case UIReducerActions.SAVE:
            return { ...state, selectedSaveName: action.data, activeModal: null }
        case UIReducerActions.INSPECT_CARD:
            return { ...state, inspectCardId: action.data }
        case UIReducerActions.SELECT_CARD:
            return { ...state, selectedCardId: action.data }
        case UIReducerActions.NETWORK_MESSAGE:
            return { ...state, saveFile: {...state.saveFile, currentMatch: action.data }}
        case UIReducerActions.SET_SCENE:
            return { ...state, scene: action.data }
        case UIReducerActions.UPDATE_ACTIVE:
            return { ...state, saveFile: {...state.saveFile, currentMatch: {...state.saveFile.currentMatch, activePlayerId: action.data }}}
        case UIReducerActions.UPDATE_BOARD:
            return { ...state, saveFile: {...state.saveFile, currentMatch: {...state.saveFile.currentMatch, board: action.data }}}
        case UIReducerActions.UPDATE_LANDS:
            return { ...state, saveFile: {...state.saveFile, currentMatch: {...state.saveFile.currentMatch, lands: action.data }}}
        case UIReducerActions.UPDATE_PLAYER:
            return { ...state, saveFile: {...state.saveFile, currentMatch: {...state.saveFile.currentMatch, players: state.saveFile.currentMatch.players.map(p=>p.id === action.data.id ? {...action.data} : p)}}}
        default:
            return state
    }
};

const getInitialState = () => {
    return {
        activeModal: null,
        isLoaded:false,
        saveFile: null,
        selectedSaveName: '',
        currentMatch: null,
        scene: null,
        selectedCardId: '',
        inspectCardId:'',
        currentDeckId:''
    }
}

export default appReducer;