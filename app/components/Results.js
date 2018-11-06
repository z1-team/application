import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Cards from './Cards'
import ResultsPagination from './ResultsPagination'

import OffersMFO from './mfo.json'
import OffersCards from './cards.json'
import OffersCredits from './credits.json'

class Results extends Component {
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
				<Cards cards={OffersMFO} />
				{/* <ResultsPagination /> */}
			</div>
		)
	}
}

export default Results