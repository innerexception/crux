import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './src/styles/app.css'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import appReducer from './src/common/UIReducer'
import thunk from 'redux-thunk'
import AppContainer from './src/AppContainer'

export const store = createStore(appReducer, applyMiddleware(
    thunk // lets us dispatch() functions
))

ReactDOM.render((
  <Provider store={store}>
        <AppContainer/>
  </Provider>
), document.getElementById('appRoot'))