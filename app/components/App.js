import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from './Header'
import Intro from './Intro'
import Content from './Content'
//
import ContentController from './ContentController'
import Testimonials from './Testimonials'
import TestimonialsModerate from './TestimonialsModerate'
import Order from './Order'
import AboutProject from './AboutProject'
import Confidentiality from './Confidentiality'
import NotFound from './NotFound'
import About from './About'
import UsefullInfo from './UsefullInfo'
//
import Footer from './Footer'
import PopupsController from './PopupsController'
import {openPopup, closePopup, fetchPartners} from '../actions'

const mapStateToProps = ({popups}) => ({
  isCategoriesOpen: popups.categories
})

class App extends Component {
	constructor(props) {
		super(props)

    this.state = {
      emailShowed: localStorage.getItem("subscribed") || false
    }

		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

  componentDidMount(){
    const {dispatch} = this.props

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
      setTimeout(() => {
        if(!this.state.emailShowed) {
          dispatch(openPopup("email"))
          this.setState({emailShowed: true})
        }
			}, 60000)
		}
    dispatch(fetchPartners('mfo'))
    dispatch(fetchPartners('cards'))

    // window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll)
  }

	handleKeyDown(event) {
		const {dispatch} = this.props

		if(event.keyCode === 27) {
			dispatch(closePopup())
		}
	}

  handleScroll = (event) => {
    const {emailShowed} = this.state
    const {dispatch} = this.props

    if(!emailShowed) {
      let scrollTop = document.documentElement.scrollTop
      let windowHiehgt = window.innerHeight
      let appHeight = document.getElementById('root').offsetHeight
      let footer = document.getElementsByClassName('wr-footer')[0].offsetHeight + document.getElementsByClassName('wr-usefull-info')[0].offsetHeight
      let itemTranslate = Math.min(0, scrollTop/3 - 60)

      if((appHeight - windowHiehgt - footer - scrollTop) <= 0) {
        dispatch(openPopup("email"))
        this.setState({emailShowed: true})
      }
    }
  }

	render() {
    const {isCategoriesOpen} = this.props

		return (
			<div onKeyDown={this.handleKeyDown} tabIndex="1" className="app">
				<Header />
				<Intro />
        <Switch>
          <Route path="/testimonials/:id" component={Testimonials} />
          <Route path="/moderate" component={TestimonialsModerate} />
          <Route path="/mfo" render={props => (<ContentController {...props} url="mfo" />)}/>
          <Route path="/cards" render={props => (<ContentController {...props} url="cards" />)}/>
          <Route path="/order" component={Order} />
          <Route path="/about" component={AboutProject}/>
          <Route path="/confidentiality" component={Confidentiality}/>
          <Route component={NotFound}/>
        </Switch>
        <UsefullInfo />
				<Footer />
				<PopupsController />
			</div>
		)
	}
}

export default connect(mapStateToProps)(App)
