import React, {Component} from 'react'

import { withRouter } from "react-router";

import Categories from './Categories'

class Header extends Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
		this.handleCategory = this.handleCategory.bind(this)
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
		document.getElementsByClassName('app')[0].classList.toggle('headerCategories')
	}

	handleCategory(dataID) {
		const {onChange} = this.props

		if(typeof onChange === "function") {
			onChange(dataID)
		}

		document.getElementsByClassName('app')[0].classList.toggle('headerCategories')
	}

	render() {
		return (
			<div className="wr-header">
				<div className="container">
					<div className="header">
						<div className="contacts">
							{/*<a href="#"><i className="fas fa-phone"></i>+7 (495) 666-55-44</a>*/}
							<p><i className="fas fa-map-marker-alt"></i>Москва</p>
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
						<Categories onChange={this.handleCategory} />
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Header)