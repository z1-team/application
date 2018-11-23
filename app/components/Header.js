import React, {Component} from 'react'
import {connect} from 'react-redux'

import { withRouter } from "react-router";
import {openPopup, closePopup, changeFilter, resetFilter} from '../actions'

const mapStateToProps = ({popups, session}) => ({
  popups: popups.categories || false,
  city: session.ip_info ? (session.ip_info.city || session.ip_info.place) : '...'
})

class Header extends Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
	}

  componentDidUpdate({location}) {
		if (this.props.location.pathname !== location.pathname) {
			this.props.dispatch(changeFilter('category', null))
			this.props.dispatch(resetFilter())
		}
	}

	getCategoriesButton() {
		const url = this.props.location.pathname

		switch(url) {
			case "/mfo":
				return "Заемы"
			case "/cards":
				return "Кредитные карты"
			// case "credits":
			// 	return OffersCredits
			default:
				return false
		}
	}

	handleClick() {
		const {popups} = this.props

		if(popups) {
			this.props.dispatch(closePopup('categories'))
		} else {
			this.props.dispatch(openPopup('categories'))
		}
	}

	render() {
		return (
			<div className="wr-header">
				<div className="container">
					<div className="header">
						<div className="contacts">
							{/*<a href="#"><i className="fas fa-phone"></i>+7 (495) 666-55-44</a>*/}
							<p><i className="fas fa-map-marker-alt"></i>{this.props.city}</p>
						</div>
						<ul>
							<li>
								{this.getCategoriesButton() && <button onClick={this.handleClick}>{this.getCategoriesButton()} по категориям</button>}
							</li>
							{/*
							<li>
								<a href="#">ОФОРМИТЬ СЕЙЧАС</a>
							</li>
							*/}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps)(Header))
