import React, {Component} from 'react'
import {connect} from 'react-redux'

import { withRouter } from "react-router";
import {openPopup, closePopup} from '../actions'

import app from '../core/app'

const mapStateToProps = ({popups}) => ({
  popups: popups.categories || false
})

class Header extends Component {
	constructor() {
		super()
		this.state = {
			city: 'Москва'
		}
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		app.getCity().then((city) => {
			this.setState({city})
		})
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
							<p><i className="fas fa-map-marker-alt"></i>{this.state.city}</p>
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

export default connect()(withRouter(Header))
