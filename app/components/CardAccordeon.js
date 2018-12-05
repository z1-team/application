import React, {Component} from 'react'

import CardDetails from './CardDetails'

class CardAccordeon extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		const {onOpen} = this.props
		if (typeof onOpen === 'function' && !this.state.isOpen) {
			onOpen()
		}
		this.setState(prev => ({isOpen: !prev.isOpen}))
	}

	render() {
		const {details, main} = this.props
		const {isOpen} = this.state
		return (
			<footer className={isOpen ? 'active' : ''}>
				<CardDetails details={details} />
				<ul>
					<li>{main.firstLoan && main.firstLoan}</li>
					<li><button onClick={this.handleClick}>Подробнее <img src="img/more.png"/></button></li>
				</ul>
			</footer>
		)
	}
}

export default CardAccordeon
