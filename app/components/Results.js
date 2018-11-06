import React, {Component} from 'react'
import {
  Route
} from 'react-router-dom'

import CardList from './CardList'
import ResultsPagination from './ResultsPagination'

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
					<Route path="/:id" component={CardList} />
				{/* <ResultsPagination /> */}
			</div>
		)
	}
}

export default Results