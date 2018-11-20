import React, {Component} from 'react'

import CategoriesController from './CategoriesController'

import {openPopup} from '../actions'
import {closePopup} from '../actions'

class Popups extends Component {
	constructor(props) {
		super(props)

		this.closePopup = this.closePopup.bind(this)
	}

	closePopup() {
		this.props.dispatch(closePopup('categories'))
	}

	render() {
		const {popups} = this.props

		return (
			<div className={popups ? "popups active" : "popups"}>
				<div className="overlay" onClick={this.closePopup}></div>
				<div className={popups ? "popup categories active" : "popup categories"}>
					<CategoriesController/>
				</div>
			</div>
		)
	}
}

export default Popups