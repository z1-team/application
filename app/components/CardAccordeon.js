import React, {Component} from 'react'

import CardDetails from './CardDetails'

class CardAccordeon extends Component {
	handleClick() {
		this.refs.accordeon.classList.toggle('active');
	}

	render() {
		const {details, main} = this.props
		return (
			<footer ref="accordeon">
			{/*<footer ref={(input) => {this.detailsRef = input }}>*/}
				<CardDetails details={details} />
				<ul>
					<li>{main.firstLoan && main.firstLoan}</li>
					<li><button onClick={this.handleClick.bind(this)}>Подробнее <img src="img/more.png"/></button></li>
					{/*<li><button onClick={(e) => this.handleClick(index, e)}>Подробнее <img src="img/more.png"/></button></li>*/}
				</ul>
			</footer>
		)
	}
}

export default CardAccordeon
