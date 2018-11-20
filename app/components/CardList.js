import React, {Component} from 'react'

import Card from './Card'

import OffersMFO from './mfo.json'
import OffersCards from './cards.json'
import OffersCredits from './credits.json'
import app from '../core/app'
import queryString from 'query-string'

class Cards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			params: app.getLinkParams()
		}
		document.addEventListener('yacounter50978069inited', () => {
			this.setState(prev => ({
				params: {
					...prev.params,
					client_id: yaCounter50978069.getClientID()
				}
			}))
    })
	}

	getCards() {
		const {category, url} = this.props

		switch(url) {
			case "/mfo":
				return category === null ? OffersMFO : this.sortCategory(OffersMFO, category)
			case "/cards":
				return category === null ? OffersCards : this.sortCategory(OffersCards, category)
			// case "/credits":
			// 	return OffersCredits
			default:
				return OffersMFO
		}
	}

	sortCategory(data, category) {
		return data.filter(function(el){
			if(el.categories[category]) {
				return true
			} else {
				return false
			}
		}).sort(function(first, second){
			if (first.categories[category] < second.categories[category]) {
				return -1;
			}
			if (first.categories[category] > second.categories[category]) {
				return 1;
			}
			return 0;
		})
	}

	render() {
		const {category, url} = this.props
		const {params} = this.state
		const linkParams = `?${queryString.stringify(params)}`

		console.log(url)

		return (
			<div className="list">
				{this.getCards().map((item, index) => (
					<Card key={index} item={item} linkParams={linkParams}/>
				))}
			</div>
		)
	}
}

export default Cards
