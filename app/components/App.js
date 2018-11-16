import React, {Component} from 'react'

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
	constructor(props) {
		super(props)

		this.state = {
			category: null
		}

		this.handleCategory = this.handleCategory.bind(this)
		this.clearCategory = this.clearCategory.bind(this)
		this.hideCategories = this.hideCategories.bind(this)
	}

	componentDidMount(){
		const ele = document.getElementById('preloader')
		if(ele){
			setTimeout(() => {
				document.getElementById('loading-percent').innerHTML = '100%';
				document.getElementById('loading-bar').style.width = '100%';
			}, 2300)
			setTimeout(() => {
				ele.classList.add('fadeOut')
			}, 2500)
			setTimeout(() => {
				ele.outerHTML = ''
			}, 3300)
		}
	}

	handleCategory(dataID) {
		this.setState({category: dataID})
	}

	clearCategory() {
		this.setState({category: null})
	}

	hideCategories() {
		document.getElementsByClassName('app')[0].classList.remove('headerCategories')
	}

	render() {
		return (
			<Router>
				<div className="app">
					<div className="overlay" onClick={this.hideCategories}></div>
					<Header onChange={this.handleCategory} />
					<Intro onChange={this.clearCategory} />
					<Content category={this.state.category} />
					<Route path="/:id" component={UsefullInfo} />
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App