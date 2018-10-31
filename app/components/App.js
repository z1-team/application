import React, {Component} from 'react'

import Library from './FontAwesome'

import Header from './Header'
import Intro from './Intro'
import Main from './Main'
import About from './About'
import UsefullInfo from './UsefullInfo'
import Footer from './Footer'

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header />
				<Intro />
				<Main />
				<About />
				<UsefullInfo />
				<Footer />
			</div>
			)
	}
}

export default App
