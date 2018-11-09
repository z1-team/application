import React, {Component} from 'react'
import {
  Route
} from 'react-router-dom'

import CardList from './CardList'
import ResultsPagination from './ResultsPagination'

class Results extends Component {
	getTitle() {
		const url = this.props.match.params.id

		switch(url) {
			case "mfo":
				return "микрозаймов"
			case "cards":
				return "кредитных карт"
			case "credits":
				return "кредитов"
			default:
				return "микрокредитов"
		}
	}

	render() {
		return (
			<div className="results">
				<h2>Рейтинг {this.getTitle()} <em>Рунета 2018 года</em></h2>
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
					<Route path="/:id" component={CardList} />
				{/* <ResultsPagination /> */}
			</div>
		)
	}
}

export default Results