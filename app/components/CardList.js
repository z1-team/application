import React, {Component} from 'react'
import Card from './Card'
import {sendEvent, openPopup, selectPartner} from '../actions'

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

	handleEdit(id) {
		const {dispatch} = this.props
		dispatch(selectPartner(id))
		dispatch(openPopup('edit'))
	}

	render() {
		const {cards, tail, isLoggedIn, partners} = this.props
		return (
			<div className="list">
				{cards.map((id) => (
					<Card key={id} item={partners[id]} tail={tail} onOrder={this.handleOrder} edit={isLoggedIn} onEdit={this.handleEdit} dataID={id} />
				))}
			</div>
		)
	}
}

export default CardList
