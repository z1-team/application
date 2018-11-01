import React, {Component} from 'react'

import CardDetails from './CardDetails'
import ResultsPagination from './ResultsPagination'

import Offers from './offers.json'

class Results extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {active: false}

		this.detailsRefs = []
	}

	handleClick(index) {

		this.setState({active: !this.state.active});

		this.detailsRefs[index].classList.toggle('active');

	}

	render() {
		return (
			<div className="results">
				<h2>Рейтинг микрокредитов <em>Рунета 2018 года</em></h2>
				{/*
				<div className="sort">
					<p>СОРТИРОВАТЬ:</p>
					<ul>
						<li>
							<a href="#">ПО РЕЙТИНГУ</a>
						</li>
						<li>
							<a href="#">ПО СУММЕ</a>
						</li>
						<li>
							<a href="#">ПО СРОКАМ</a>
						</li>
						<li>
							<a href="#">ПО ПРОЦЕНТНОЙ СТАВКЕ</a>
						</li>
					</ul>
				</div>
				*/}
				<div className="list">
					{Offers.map((item, index) => (
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
									<ul className="pros">
										<li><strong>{item.pros.money}</strong> руб.</li>
										<li><strong>{item.pros.day}</strong> дней</li>
										<li><strong>{item.pros.percent}</strong> в день</li>
									</ul>
								</div>
								<div className="process">
									<a href={item.link}>Оформить</a>
									<p>переплата {item.overpayment}</p>
								</div>
							</section>
							<footer ref={(input) => {this.detailsRefs[index] = input }}>
								<CardDetails details={item.details} />
								<ul>
									<li>{item.firstLoan} первый заем.</li>
									<li><button onClick={(e) => this.handleClick(index, e)}>Подробнее <img src="img/more.png"/></button></li>
								</ul>
							</footer>
						</div>
					))}
				</div>
				{/* <ResultsPagination /> */}
			</div>
		)
	}
}

export default Results