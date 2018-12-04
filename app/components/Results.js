import React, {Component} from 'react'

import { changePage } from '../actions'

import CardList from './CardList'
import ResultsPagination from './ResultsPagination'

const PAGE_LIMIT = 5
const PAGE_NEIGHBOURS = 1

class Results extends Component {
	getTitle() {
		const {url} = this.props

		switch(url) {
			case "/mfo":
				return "микрозаймов"
			case "/cards":
				return "кредитных карт"
			// case "/credits":
			// 	return "кредитов"
			default:
				return "микрозаймов"
		}
	}

	componentDidMount() {
		const { cards } = this.props

		if(cards.length !== 0) {
			this.onChange(1)
		}
	}

	onChange = page => {
		const { dispatch } = this.props
		dispatch(changePage(page))
	}

	selectCards() {
		const { cards, currentPage } = this.props
		const offset = (currentPage - 1) * PAGE_LIMIT
		return cards.slice(offset, offset + PAGE_LIMIT)
	}

	render() {
		const {url, cards, tail, isLoggedIn, partners, currentPage, dispatch} = this.props

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
				<CardList url={url} tail={tail} partners={partners} cards={this.selectCards()} isLoggedIn={isLoggedIn} dispatch={dispatch} />
				<ResultsPagination totalCards={cards.length} currentPage={currentPage} pageLimit={PAGE_LIMIT} pageNeighbours={PAGE_NEIGHBOURS} onChange={this.onChange} />
			</div>
		)
	}
}

export default Results
