import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './src/styles/app.css'

import AppContainer from './src/AppContainer'
import { store } from './src/common/store'

export { store }

ReactDOM.render((
  <AppContainer/>
), document.getElementById('appRoot'))