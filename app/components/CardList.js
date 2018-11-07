import React, {Component} from 'react'

import CardAccordeon from './CardAccordeon'

import OffersMFO from './mfo.json'
import OffersCards from './cards.json'
import OffersCredits from './credits.json'

class Cards extends Component {
	constructor(props) {
		super(props);

		//this.handleClick = this.handleClick.bind(this);

		//this.state = {active: false}

		//this.detailsRefs = []
	}

	/*handleClick(index) {

		this.setState({active: !this.state.active});

		this.detailsRefs[index].classList.toggle('active');
	}*/

	getCards() {
		const url = this.props.match.params.id

		switch(url) {
			case "mfo":
				return OffersMFO
			case "cards":
				return OffersCards
			case "credits":
				return OffersCredits
			default:
				return OffersMFO
		}
	}

	render() {
		return (
			<div className="list">
				{this.getCards().map((item, index) => (
					<div className="result-item" key={index}>
						<section>
							<figure>
								<img src={item.logo} />
							</figure>
							<div className="info">
								<h3>{item.title}</h3>
								{/*
								<div className="rating">
									<ul>
										<li></li>
										<li></li>
										<li></li>
										<li></li>
										<li></li>
									</ul>
									<p><a href="#">22 отзыва</a> (4.1 из 5)</p>
								</div>
								*/}
								{item.hasOwnProperty('pros') && item.pros != '' &&
									<ul className="pros">
										{item.pros.hasOwnProperty('money') && item.pros.money != '' && <li><strong>{item.pros.money}</strong> руб.</li>}
										{item.pros.hasOwnProperty('day') && item.pros.day != '' && <li><strong>{item.pros.day}</strong> дней</li>}
										{item.pros.hasOwnProperty('percent') && item.pros.percent != '' && <li><strong>{item.pros.percent}</strong> в день</li>}
										{item.pros.hasOwnProperty('time') && item.pros.time != '' && <li><strong>{item.pros.time}</strong></li>}
									</ul>
								}
							</div>
							<div className="process">
								<a target="_blank" href={item.link} rel="nofollow noopener">Оформить</a>
								{item.hasOwnProperty('overpayment') && item.overpayment != '' && <p>переплата {item.overpayment}</p>}
							</div>
						</section>
						<CardAccordeon data={item} />
					</div>
				))}
			</div>
		)
	}
}

export default Cards