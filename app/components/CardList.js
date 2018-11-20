import React, {Component} from 'react'
import Card from './Card'
import app from '../core/app'
import queryString from 'query-string'

class CardList extends Component {
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

	render() {
		const {cards} = this.props
		const {params} = this.state
		const linkParams = `?${queryString.stringify(params)}`

		console.log(url)

		return (
			<div className="list">
				{cards.map((item, index) => (
					<Card key={index} item={item} linkParams={linkParams}/>
				))}
			</div>
		)
	}
}

export default CardList
