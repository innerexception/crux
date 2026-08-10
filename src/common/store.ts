import { create } from 'zustand'
import { UIReducerActions } from '../../enum'
import appReducer, { getInitialState } from './UIReducer'

type AppAction = {
  type: UIReducerActions
  data?: any
}

type AppStoreState = RState & {
  dispatch: (action: AppAction) => void
}

const useAppStoreBase = create<AppStoreState>()((set) => ({
  ...getInitialState(),
  dispatch: (action: AppAction) => {
    set((state) => appReducer(state, action as any))
  }
}))

export const useAppStore = useAppStoreBase

export const useSelector = <T,>(selector: (state: AppStoreState) => T) =>
  useAppStoreBase((state) => selector(state))

export const store = {
  getState: () => useAppStoreBase.getState(),
  dispatch: (action: AppAction) => useAppStoreBase.getState().dispatch(action)
}

export default useAppStoreBase
