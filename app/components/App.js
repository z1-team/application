import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from './Header'
import Intro from './Intro'
import Content from './Content'
import About from './About'
import UsefullInfo from './UsefullInfo'
import Footer from './Footer'
import PopupsController from './PopupsController'
import {closePopup} from '../actions'

const mapStateToProps = ({popups}) => ({
  isCategoriesOpen: popups.categories
})

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			category: null
		}

		this.clearCategory = this.clearCategory.bind(this)
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

	clearCategory() {
		this.setState({category: null})
	}

	render() {
    	const {isCategoriesOpen} = this.props
		return (
			<div className="app">
				<Header />
				<Intro />
				<Content category={this.state.category} />
				<Route path="/:id" component={UsefullInfo} />
				<Footer />
				<PopupsController />
			</div>
		)
	}
}

export default connect(mapStateToProps)(App)
