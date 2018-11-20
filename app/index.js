import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import App from './components/App'
import app from './core/app'
import appReducer from './reducers/app'
import dispatcher from './core/remote-dispatcher'

const store = createStore(appReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

app.init(dispatcher)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App}/>
    </Router>
  </Provider>, document.getElementById('root'))
