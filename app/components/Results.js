import React, {Component} from 'react'

import { changePage, loadCards } from '../actions'

import CardList from './CardList'
import ResultsPagination from './ResultsPagination'
import ResultsSort from './ResultsSort'

const PAGE_LIMIT = 5
const PAGE_NEIGHBOURS = 1

class Results extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll = () => {
		const {cards, cardsCount} = this.props

		if(cardsCount < cards.length) {
			if( this.results.clientHeight + this.results.getBoundingClientRect().top - window.innerHeight  <= 0) {
				this.loadMore()
			}
		}
	}

	getTitle() {
		const {url} = this.props

		switch(url) {
			case "mfo":
				return "микрозаймов"
			case "cards":
				return "кредитных карт"
			// case "credits":
			// 	return "кредитов"
			default:
				return "микрозаймов"
		}
	}

	// componentDidMount() {
	// 	const { cards } = this.props
	//
	// 	if(cards.length !== 0) {
	// 		this.onChange(1)
	// 	}
	// }

	// onChange = page => {
	// 	const { dispatch } = this.props
	//
	// 	dispatch(changePage(page))
	// }

	// selectCards() {
	// 	const { cards, currentPage } = this.props
	// 	const offset = (currentPage - 1) * PAGE_LIMIT
	// 	return cards.slice(offset, offset + PAGE_LIMIT)
	// }

	selectCards() {
		const { cards, cardsCount } = this.props
		return cards.slice(0, Math.min(cards.length, cardsCount))
	}

	loadMore() {
		const {cards, cardsCount, dispatch} = this.props

		if(cardsCount < cards.length) {
			dispatch(loadCards(8))
		}
	}

	render() {
		const {url, cards, tail, isLoggedIn, partners, currentPage, dispatch, sortInfo} = this.props

		return (
			<div ref={ref => {this.results = ref}} className="results" id="results">
				<h2>Рейтинг {this.getTitle()} <em>Рунета 2018 года</em></h2>
				<ResultsSort url={url} dispatch={dispatch} sortInfo={sortInfo} />
				<CardList url={url} tail={tail} partners={partners} cards={this.selectCards()} isLoggedIn={isLoggedIn} dispatch={dispatch} />
				{/* <ResultsPagination totalCards={cards.length} currentPage={currentPage} pageLimit={PAGE_LIMIT} pageNeighbours={PAGE_NEIGHBOURS} onChange={this.onChange} /> */}
			</div>
		)
	}
}

export default Results
