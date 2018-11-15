import React, {Component} from 'react'
import { withRouter } from "react-router"

import CategoriesList from './CategoriesList'

const categories = {
	"mfo": [
		{
			"text": "С плохой кред. историей",
			"dataID": "badCreditHistory",
			"sortParam": "",
			"index": 1
		},
		{
			"text": "Онлайн",
			"dataID": "online",
			"sortParam": "",
			"index": 2
		},
		{
			"text": "Быстрые",
			"dataID": "fast",
			"sortParam": "",
			"index": 3
		},
		{
			"text": "С мгновенным одобрением",
			"dataID": "instantApprove",
			"sortParam": "",
			"index": 4
		},
		{
			"text": "Срочные",
			"dataID": "urgently",
			"sortParam": "",
			"index": 5
		},
		{
			"text": "Экспресс",
			"dataID": "express",
			"sortParam": "",
			"index": 6
		},
		{
			"text": "Круглосуточно",
			"dataID": "d&n",
			"sortParam": "",
			"index": 7
		},
		{
			"text": "Наличными",
			"dataID": "inCash",
			"sortParam": "",
			"index": 8
		},
		{
			"text": "Моментальные",
			"dataID": "instant",
			"sortParam": "",
			"index": 9
		},
		{
			"text": "По паспорту",
			"dataID": "accordingPassport",
			"sortParam": "",
			"index": 10
		},
		{
			"text": "До зарплаты",
			"dataID": "toPaycheck",
			"sortParam": "",
			"index": 11
		},
		{
			"text": "Долгосрочные",
			"dataID": "longTerm",
			"sortParam": "",
			"index": 12
		},
		{
			"text": "Без отказа",
			"dataID": "withoutFailure",
			"sortParam": "",
			"index": 13
		},
		{
			"text": "Без поручителей",
			"dataID": "withoutGuarantors",
			"sortParam": "",
			"index": 14
		},
		{
			"text": "Для студентов",
			"dataID": "forStudents",
			"sortParam": "",
			"index": 15
		},
		{
			"text": "Для пенсионеров",
			"dataID": "forPensioners",
			"sortParam": "",
			"index": 16
		},
		{
			"text": "Без процентов",
			"dataID": "noInterest",
			"sortParam": "",
			"index": 17
		},
		{
			"text": "С 18 лет",
			"dataID": "from18Years",
			"sortParam": "",
			"index": 18
		},
		{
			"text": "Безработным",
			"dataID": "unemployed",
			"sortParam": "",
			"index": 19
		},
		{
			"text": "Без паспорта",
			"dataID": "withoutPassport",
			"sortParam": "",
			"index": 20
		},
		{
			"text": "Без кредит. истории",
			"dataID": "noCreditHistory",
			"sortParam": "",
			"index": 21
		}
	],
	"cards": [
		{
			"text": "Кредитная карта",
			"dataID": "",
			"sortParam": "",
			"index": 1
		},
		{
			"text": "Кредитная карта",
			"dataID": "",
			"sortParam": "",
			"index": 2
		}
	]
}

class Categories extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick({target}) {
		const {onChange} = this.props
		const dataID = target.getAttribute('data-id')

		if(typeof onChange === "function" && dataID !== "") {
			onChange(dataID)
		}
	}

	getCategories() {
		const url = this.props.location.pathname

		switch(url) {
			case "/mfo":
				return categories.mfo
				break
			case "/cards":
				return categories.cards
				break
			// case "credits":
			// 	return OffersCredits
			default:
				return false
				break
		}
	}

	render(){
		return (
			<div className="categories">
			{this.getCategories() && 
				<CategoriesList>
					{this.getCategories().map((item, index) => (
						<li key={item.index}>
							<button onClick={this.handleClick} data-id={item.dataID}>{item.text}</button>
						</li>
					))}
				</CategoriesList>
			}
			</div>
		)
	}
}

export default withRouter(Categories)