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

const mapStateToProps = ({preloader, popups}) => ({
  preloader,
  isCategoriesOpen: popups.categories
})

class App extends Component {
	constructor(props) {
		super(props)

    this.state = {
      emailShowed: true,
      isVisible: false
    }

		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

  componentDidUpdate(prevProps) {
    if (prevProps.preloader.done !== this.props.preloader.done) {
      if (this.props.preloader.done) {
        const ele = document.getElementById('preloader')
        ele.setAttribute('class', 'fadeOut')
      }
    }
  }

  componentDidMount(){
    const {dispatch, location} = this.props

		const ele = document.getElementById('preloader')
		if(ele){
			setTimeout(() => {
				document.getElementById('loading-percent').innerHTML = '100%';
				document.getElementById('loading-bar').style.width = '100%';
			}, 2300)
      setTimeout(() => {
        const {pathname} = this.props.location
        if(!this.state.emailShowed && pathname === '/mfo') {
          dispatch(openPopup("email"))
          this.setState({emailShowed: true})
        }
      }, 60000)
		}
    dispatch(fetchPartners('mfo'))
    dispatch(fetchPartners('cards'))

    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

	handleKeyDown(event) {
		const {dispatch} = this.props

		if(event.keyCode === 27) {
			dispatch(closePopup())
		}
	}

  handleScroll = (event) => {
    const {emailShowed, isVisible} = this.state
    const {dispatch, location} = this.props

    if(!emailShowed && location.pathname === '/mfo') {
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

    this.setState(prev => {
      const isVisible = window.pageYOffset > 400
      return prev.isVisible !== isVisible ? {isVisible} : null
    })
  }

  handleToTop = (event) => {
    event.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

	render() {
    const {isVisible} = this.state

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
        <a href="#" className={`to-top ${isVisible ? 'active' : ''}`} onClick={this.handleToTop}><i className="fas fa-arrow-circle-up"></i></a>
			</div>
		)
	}
}

export default connect(mapStateToProps)(App)
