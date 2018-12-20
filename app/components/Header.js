import React, {Component} from 'react'
import {connect} from 'react-redux'

import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import {openPopup, closePopup, changeFilter, resetFilter, resetSortPartner } from '../actions'

const mapStateToProps = ({popups, session}) => ({
  popups: popups.categories || false,
  city: session.ip_info ? (session.ip_info.city || session.ip_info.place) : '...'
})

class Header extends Component {
	constructor() {
		super()

		this.handleCategories = this.handleCategories.bind(this)
		this.handleDirection = this.handleDirection.bind(this)
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

	handleCategories() {
		const {popups} = this.props

		if(popups) {
			this.props.dispatch(closePopup('categories'))
		} else {
			this.props.dispatch(openPopup('categories'))
		}
	}

  handleDirection = (event) => {
    const url = event.target.name
    const { dispatch } = this.props

    switch (url) {
      case 'mfo':
        dispatch(resetSortPartner('mfo'))
        break
      case 'cards':
        dispatch(resetSortPartner('cards'))
        break
      default:
        dispatch(resetSortPartner('mfo'))
        break
    }

    window.scrollTo({
			top: 0
		}, 0)
  }

	render() {
		const { location } = this.props;
		const url = location.pathname

		return (
			<div className="wr-header">
				<div className="container">
					<div className="header">
						<div className="contacts">
							{/*<a href="#"><i className="fas fa-phone"></i>+7 (495) 666-55-44</a>*/}
							<p><i className="fas fa-map-marker-alt"></i>{this.props.city}</p>
						</div>
            <ul>
              <li><Link onClick={this.handleDirection} name="mfo" className={url === "/mfo" ? "active" : ""} to="/mfo">Микрозаймы</Link></li>
              <li><Link onClick={this.handleDirection} name="cards" className={url === "/cards" ? "active" : ""} to="/cards">Кредитные карты</Link></li>
              {/*<li><Link className={url === "/credits" ? "active" : ""} to="credits">Кредиты</Link></li>*/}
							{/*
							<li>
								<a href="#">ОФОРМИТЬ СЕЙЧАС</a>
							</li>
							*/}
						</ul>
            {this.getCategoriesButton() && <button className="categories-button" onClick={this.handleCategories}>{this.getCategoriesButton()} по категориям</button>}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps)(Header))
