import React, {Component} from 'react'

import Library from './FontAwesome'

import Header from './Header'
import Intro from './Intro'
import Main from './Main'
import About from './About'
import UsefullInfo from './UsefullInfo'
import Footer from './Footer'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="app">
					<Intro />
					<Main />
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App