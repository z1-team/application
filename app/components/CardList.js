import React, {Component} from 'react'
import Card from './Card'
import {sendEvent, openPopup, selectPartner, createPartner} from '../actions'

class CardList extends Component {
	constructor(props) {
		super(props);
		this.handleOrder = this.handleOrder.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
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

	handleAdd(event) {
		event.preventDefault()
		const {dispatch} = this.props
		const url = this.props.url.split("/")[1]

		dispatch(createPartner(url))
	}

	render() {
		const {cards, tail, isLoggedIn, partners} = this.props
		return (
			<div className="list">
				<button className="add-card" onClick={this.handleAdd}>Добавить партнера</button>
				{cards.map((id) => (
					<Card key={id} item={partners[id]} tail={tail} onOrder={this.handleOrder} edit={isLoggedIn} onEdit={this.handleEdit} dataID={id} />
				))}
			</div>
		)
	}
}

export default CardList
