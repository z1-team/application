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
								{item.pros &&
									<ul className="pros">
										{/* For MFO */}
										{item.pros.money && <li><strong>{item.pros.money}</strong> руб.<em>сумма займа</em></li>}
										{item.pros.term && <li>до <strong>{item.pros.term}</strong> дней<em>срок займа</em></li>}
										{item.pros.minRate && <li><strong>{item.pros.minRate}</strong><em>мин. ставка</em></li>}

										{/* For credit cards */}
										{item.pros.limit && <li><strong>{item.pros.limit}</strong> руб.<em>кредитный лимит</em></li>}
										{item.pros.percent && <li>от <strong>{item.pros.percent}</strong><em>процентная ставка</em></li>}
										{item.pros.cashback && <li>от <strong>{item.pros.cashback}</strong><em>cashback</em></li>}

										{/* For credits */}
										{item.pros.maxSumm && <li><strong>{item.pros.maxSumm}</strong> руб.<em>максимальная сумма</em></li>}
										{item.pros.rate && <li>от <strong>{item.pros.rate}</strong><em>процентная ставка</em></li>}
										{item.pros.timing && <li><strong>{item.pros.timing}</strong><em>время рассмотрения</em></li>}
									</ul>
								}
							</div>
							<div className="process">
								<a target="_blank" href={item.link} rel="nofollow noopener">Оформить</a>
								{/* item.overpayment && <p>переплата {item.overpayment}</p> */}
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