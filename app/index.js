import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import app from './core/app'
import dispatcher from './core/console-dispatcher'

app.init(dispatcher)

ReactDOM.render(<App/>, document.getElementById('root'))
