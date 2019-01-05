import React, {Component} from 'react'

import Card from './Card'
import SmartSearch from './SmartSearch'
import {sendEvent, openPopup, selectPartner, createPartner, resetFilter} from '../actions'

class CardList extends Component {
	constructor(props) {
		super(props);


		this.handleOrder = this.handleOrder.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleMore = this.handleMore.bind(this)
	}

	componentDidUpdate(prevProps) {
		const {url, dispatch} = this.props
		if (prevProps.url !== url) {
			dispatch(resetFilter())
			dispatch(sendEvent({
				type: 'change_direction',
				payload: {
					direction: url
				}
			}))
		}
	}

	handleOrder(partner) {
		const {dispatch} = this.props
		dispatch(sendEvent({
      type: 'click_offer',
      payload: {
				partnerId: partner.id,
        partnerName: partner.main.title
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
		const url = this.props.url

		dispatch(createPartner(url))
	}

	handleMore(id, title) {
		const {dispatch} = this.props
		dispatch(sendEvent({
      type: 'offer_details',
      payload: {
				partnerId: id,
        partnerName: title
      }
    }))
	}

	handleChange = () => {

	}

	render() {
		const {cards, tail, isLoggedIn, partners} = this.props


		return (
			<div className="list">
				{isLoggedIn && <button className="add-card" onClick={this.handleAdd}>Добавить партнера</button>}
				{/* <SmartSearch onChange={this.handleChange} /> */}
				{cards.map((id) => (
					<Card key={id} item={partners[id]} tail={tail} onOrder={this.handleOrder} edit={isLoggedIn} onEdit={this.handleEdit} dataID={id} onMore={this.handleMore}/>
				))}
			</div>
		)
	}
}

export default CardList
