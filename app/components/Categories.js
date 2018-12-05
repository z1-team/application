import React, {Component} from 'react'

import CategoriesList from './CategoriesList'
import {changeFilter, sendEvent} from '../actions'

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
			"dataID": "DaN",
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
			"text": "Альфа-Банк",
			"dataID": "alfaBank",
			"sortParam": "",
			"index": 1
		},
		{
			"text": "Тинькофф",
			"dataID": "tinkoff",
			"sortParam": "",
			"index": 2
		},
		{
			"text": "Самые лучшие кредитные карты",
			"dataID": "bestCards",
			"sortParam": "",
			"index": 3
		},
		{
			"text": "Самые выгодные",
			"dataID": "mostProfitable",
			"sortParam": "",
			"index": 4
		},
		{
			"text": "В день обращения",
			"dataID": "dayOfTreatment",
			"sortParam": "",
			"index": 5
		},
		{
			"text": "Без процентов",
			"dataID": "withoutInterest",
			"sortParam": "",
			"index": 6
		},
		{
			"text": "Срочно",
			"dataID": "urgent",
			"sortParam": "",
			"index": 7
		},
		{
			"text": "Без отказа",
			"dataID": "withoutFailure",
			"sortParam": "",
			"index": 8
		},
		{
			"text": "Без справок",
			"dataID": "withoutReferences",
			"sortParam": "",
			"index": 9
		},
		{
			"text": "На дом без визита в банк",
			"dataID": "deliveryPlace",
			"sortParam": "",
			"index": 10
		},
		{
			"text": "Без годового обслуживания",
			"dataID": "withoutAnnualService",
			"sortParam": "",
			"index": 11
		},
		{
			"text": "Без подтверждения дохода",
			"dataID": "withoutIncomeProof",
			"sortParam": "",
			"index": 12
		},
		{
			"text": "Без кредитной истории",
			"dataID": "withoutCreditHistory",
			"sortParam": "",
			"index": 13
		},
		{
			"text": "Для пенсионеров",
			"dataID": "forPensioners",
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
			"text": "Безработным",
			"dataID": "unemployed",
			"sortParam": "",
			"index": 16
		},
		{
			"text": "С беспроцентным периодом",
			"dataID": "interestFreePeriod",
			"sortParam": "",
			"index": 17
		},
		{
			"text": "С кэшбэком",
			"dataID": "cashback",
			"sortParam": "",
			"index": 18
		},
		{
			"text": "Моментальные",
			"dataID": "instant",
			"sortParam": "",
			"index": 19
		},
		{
			"text": "Для снятия наличных",
			"dataID": "forCashWithdrawals",
			"sortParam": "",
			"index": 20
		},
		{
			"text": "Виртуальные",
			"dataID": "virtual",
			"sortParam": "",
			"index": 21
		},
		{
			"text": "Apple Pay",
			"dataID": "applePay",
			"sortParam": "",
			"index": 22
		},
		{
			"text": "Samsung Pay",
			"dataID": "samsungPay",
			"sortParam": "",
			"index": 23
		},
		{
			"text": "За 5 минут",
			"dataID": "in5Minutes",
			"sortParam": "",
			"index": 24
		},
		{
			"text": "За 15 минут",
			"dataID": "in15Minutes",
			"sortParam": "",
			"index": 25
		},
		{
			"text": "За 30 минут",
			"dataID": "in30Minutes",
			"sortParam": "",
			"index": 26
		},
		{
			"text": "Visa",
			"dataID": "visa",
			"sortParam": "",
			"index": 27
		},
		{
			"text": "MasterCard",
			"dataID": "masterCard",
			"sortParam": "",
			"index": 28
		},
		{
			"text": "МИР",
			"dataID": "mir",
			"sortParam": "",
			"index": 29
		}
	]
}

class Categories extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick({target}) {
		const {dispatch} = this.props
		const dataID = target.getAttribute('data-id')

		window.scrollTo({
        top: document.getElementById('results').getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth"
    })

		dispatch(changeFilter('category', dataID))
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

export default Categories
