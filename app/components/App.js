import React, {Component} from 'react'

import Library from './FontAwesome'

import Header from './Header'
import Intro from './Intro'
import Content from './Content'
import About from './About'
import UsefullInfo from './UsefullInfo'
import Footer from './Footer'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
	componentDidMount(){
		const ele = document.getElementById('preloader')
		if(ele){
			setTimeout(() => {
				ele.classList.add('fadeOut')
			}, 3000)
			setTimeout(() => {
				ele.outerHTML = ''
			}, 3800)
		}
	}

	render() {
		return (
			<Router>
				<div className="app">
					<Intro />
					<Route path="/:id" component={Content} />
					<Route path="/:id" component={UsefullInfo} />
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App