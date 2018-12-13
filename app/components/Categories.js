import React, {Component} from 'react'

import CategoriesList from './CategoriesList'
import {changeFilter, sendEvent} from '../actions'

const categories = {
	"mfo": [
		{
			"text": "С плохой кред. историей",
			"dataID": "badCreditHistory",
			"index": 1
		},
		{
			"text": "Онлайн",
			"dataID": "online",
			"index": 2
		},
		{
			"text": "Быстрые",
			"dataID": "fast",
			"index": 3
		},
		{
			"text": "С мгновенным одобрением",
			"dataID": "instantApprove",
			"index": 4
		},
		{
			"text": "Срочные",
			"dataID": "urgently",
			"index": 5
		},
		{
			"text": "Экспресс",
			"dataID": "express",
			"index": 6
		},
		{
			"text": "Круглосуточно",
			"dataID": "DaN",
			"index": 7
		},
		{
			"text": "Наличными",
			"dataID": "inCash",
			"index": 8
		},
		{
			"text": "Моментальные",
			"dataID": "instant",
			"index": 9
		},
		{
			"text": "По паспорту",
			"dataID": "accordingPassport",
			"index": 10
		},
		{
			"text": "До зарплаты",
			"dataID": "toPaycheck",
			"index": 11
		},
		{
			"text": "Долгосрочные",
			"dataID": "longTerm",
			"index": 12
		},
		{
			"text": "Без отказа",
			"dataID": "withoutFailure",
			"index": 13
		},
		{
			"text": "Без поручителей",
			"dataID": "withoutGuarantors",
			"index": 14
		},
		{
			"text": "Для студентов",
			"dataID": "forStudents",
			"index": 15
		},
		{
			"text": "Для пенсионеров",
			"dataID": "forPensioners",
			"index": 16
		},
		{
			"text": "Без процентов",
			"dataID": "noInterest",
			"index": 17
		},
		{
			"text": "С 18 лет",
			"dataID": "from18Years",
			"index": 18
		},
		{
			"text": "Безработным",
			"dataID": "unemployed",
			"index": 19
		},
		{
			"text": "Без паспорта",
			"dataID": "withoutPassport",
			"index": 20
		},
		{
			"text": "Без кредит. истории",
			"dataID": "noCreditHistory",
			"index": 21
		}
	],
	"cards": [
		{
			"text": "Альфа-Банк",
			"dataID": "alfaBank",
			"index": 1
		},
		{
			"text": "Тинькофф",
			"dataID": "tinkoff",
			"index": 2
		},
		{
			"text": "Самые лучшие кредитные карты",
			"dataID": "bestCards",
			"index": 3
		},
		{
			"text": "Самые выгодные",
			"dataID": "mostProfitable",
			"index": 4
		},
		{
			"text": "В день обращения",
			"dataID": "dayOfTreatment",
			"index": 5
		},
		{
			"text": "Без процентов",
			"dataID": "withoutInterest",
			"index": 6
		},
		{
			"text": "Срочно",
			"dataID": "urgent",
			"index": 7
		},
		{
			"text": "Без отказа",
			"dataID": "withoutFailure",
			"index": 8
		},
		{
			"text": "Без справок",
			"dataID": "withoutReferences",
			"index": 9
		},
		{
			"text": "На дом без визита в банк",
			"dataID": "deliveryPlace",
			"index": 10
		},
		{
			"text": "Без годового обслуживания",
			"dataID": "withoutAnnualService",
			"index": 11
		},
		{
			"text": "Без подтверждения дохода",
			"dataID": "withoutIncomeProof",
			"index": 12
		},
		{
			"text": "Без кредитной истории",
			"dataID": "withoutCreditHistory",
			"index": 13
		},
		{
			"text": "Для пенсионеров",
			"dataID": "forPensioners",
			"index": 14
		},
		{
			"text": "Для студентов",
			"dataID": "forStudents",
			"index": 15
		},
		{
			"text": "Безработным",
			"dataID": "unemployed",
			"index": 16
		},
		{
			"text": "С беспроцентным периодом",
			"dataID": "interestFreePeriod",
			"index": 17
		},
		{
			"text": "С кэшбэком",
			"dataID": "cashback",
			"index": 18
		},
		{
			"text": "Моментальные",
			"dataID": "instant",
			"index": 19
		},
		{
			"text": "Для снятия наличных",
			"dataID": "forCashWithdrawals",
			"index": 20
		},
		{
			"text": "Виртуальные",
			"dataID": "virtual",
			"index": 21
		},
		{
			"text": "Apple Pay",
			"dataID": "applePay",
			"index": 22
		},
		{
			"text": "Samsung Pay",
			"dataID": "samsungPay",
			"index": 23
		},
		{
			"text": "За 5 минут",
			"dataID": "in5Minutes",
			"index": 24
		},
		{
			"text": "За 15 минут",
			"dataID": "in15Minutes",
			"index": 25
		},
		{
			"text": "За 30 минут",
			"dataID": "in30Minutes",
			"index": 26
		},
		{
			"text": "Visa",
			"dataID": "visa",
			"index": 27
		},
		{
			"text": "MasterCard",
			"dataID": "masterCard",
			"index": 28
		},
		{
			"text": "МИР",
			"dataID": "mir",
			"index": 29
		}
	]
}

const categoriesIndex = {
	category_mfo: {
		"badCreditHistory": 0,
		"online": 1,
		"fast": 2,
		"instantApprove": 3,
		"urgently": 4,
		"express": 5,
		"DaN": 6,
		"inCash": 7,
		"instant": 8,
		"accordingPassport": 9,
		"toPaycheck": 10,
		"longTerm": 11,
		"withoutFailure": 12,
		"withoutGuarantors": 13,
		"forStudents": 14,
		"forPensioners": 15,
		"noInterest": 16,
		"from18Years": 17,
		"unemployed": 18,
		"withoutPassport": 19,
		"noCreditHistory": 20
	},
	category_cards: {
		"alfaBank": 0,
		"tinkoff": 1,
		"bestCards": 2,
		"mostProfitable": 3,
		"dayOfTreatment": 4,
		"withoutInterest": 5,
		"urgent": 6,
		"withoutFailure": 7,
		"withoutReferences": 8,
		"deliveryPlace": 9,
		"withoutAnnualService": 10,
		"withoutIncomeProof": 11,
		"withoutCreditHistory": 12,
		"forPensioners": 13,
		"forStudents": 14,
		"unemployed": 15,
		"interestFreePeriod": 16,
		"cashback": 17,
		"instant": 18,
		"forCashWithdrawals": 19,
		"virtual": 20,
		"applePay": 21,
		"samsungPay": 22,
		"in5Minutes": 23,
		"in15Minutes": 24,
		"in30Minutes": 25,
		"visa": 26,
		"masterCard": 27,
		"mir": 28
	}
}


class Categories extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	getFilterName(name) {
		switch(name) {
			case "/mfo":
				return "category_mfo"
			case "/cards":
				return "category_cards"
			// case "credits":
			// 	return OffersCredits
			default:
				return false
		}
	}

	handleClick({target}) {
		const {dispatch, filters} = this.props
		const dataID = target.getAttribute('data-id')
		const url = this.props.location.pathname
		const filterName = this.getFilterName(url)
		const filterValue = filters[filterName]
		const index = categoriesIndex[filterName][dataID]
		const result = filterValue.map((v, i) => (i === index))

		window.scrollTo({
        top: document.getElementById('results').getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth"
    })

		dispatch(changeFilter(filterName, result))

		dispatch(sendEvent({
			type: 'click_category',
			payload: {
				category: dataID
			}
		}))
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
					{this.getCategories().map((item) => (
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

export default Categories
