import React, {Component} from 'react'
import {connect} from 'react-redux'

import {openPopup, closePopup, logout} from '../actions'

const mapStateToProps = ({popups, auth}) => ({
  popups: popups.login || false,
  isLoggedIn: auth.token !== null
})

class Footer extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		const {popup, isLoggedIn, dispatch} = this.props
		
		if(isLoggedIn) {
			dispatch(logout())
		} else {
			if(popup) {
				dispatch(closePopup('login'))
			} else {
				dispatch(openPopup('login'))
			}
		}
	}

	render() {
		const {isLoggedIn} = this.props

		return (
			<div className="wr-footer">
				<div className="container">
					<div className="footer">
						<span className="logo"><img src="img/logo-footer.png"/></span>
						{/*
						<ul className="socials">
							<li>
								<a href="#"><i></i></a>
							</li>
							<li>
								<a href="#"><i></i></a>
							</li>
							<li>
								<a href="#"><i></i></a>
							</li>
							<li>
								<a href="#"><i></i></a>
							</li>
						</ul>
						*/}
						<small>&copy; 2018 Moneyonline. Информация, предоставленная на сайте, носит ознакомительный характер. Реальные предложения организаций могут отличаться.</small>
						{/*<button onClick={this.handleClick}>{isLoggedIn ? "Выйти" : "Войти"}</button>*/}
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Footer)