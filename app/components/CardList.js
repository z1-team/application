import React, {Component} from 'react'
import Card from './Card'
import {sendEvent, openPopup} from '../actions'

class CardList extends Component {
	constructor(props) {
		super(props);
		this.handleOrder = this.handleOrder.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
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

	handleEdit() {
		const {dispatch} = this.props
		dispatch(openPopup('edit'))
	}

	render() {
		const {cards, tail, isLoggedIn} = this.props
		return (
			<div className="list">
				{cards.map((item, index) => (
					<Card key={index} item={item} tail={tail} onOrder={this.handleOrder} edit={isLoggedIn} onEdit={this.handleEdit} dataID={index} />
				))}
			</div>
		)
	}
}

export default CardList
