import React, {Component} from 'react'
import Card from './Card'
import {sendEvent} from '../actions'

class CardList extends Component {
	constructor(props) {
		super(props);
		this.handleOrder = this.handleOrder.bind(this)
	}

	handleOrder(partner) {
		const {dispatch} = this.props
		dispatch(sendEvent({
      type: 'click_offer',
      payload: {
        partnerName: partner
      }
    }))
	}

	render() {
		const {cards, tail} = this.props
		return (
			<div className="list">
				{cards.map((item, index) => (
					<Card key={index} item={item} tail={tail} onOrder={this.handleOrder}/>
				))}
			</div>
		)
	}
}

export default CardList
