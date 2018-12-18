import React, {Component} from 'react'

import SearchModule from './SearchModule'
import CheckboxFilter from './CheckboxFilter'
import RadioFilter from './RadioFilter'
import RangeInput from './RangeInput'

import {changeFilter, sendEvent} from '../actions'

function mfoFilters(filters, handleChange, total, place, actual, counter) {
	return (
		<div>
			<p>Всего микрозаймов: <strong>{total}</strong><br/>Найдено в: <strong>{place}</strong></p>
			<SearchModule title="Спецпредложения" name="special_offers" onChange={handleChange}>
				<CheckboxFilter name="special_offers"
					items={[
					"0% первый займ",
					"увеличенный лимит постоянным клиентам"]}
					value={filters.special_offers}
					actual={actual.special_offers || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Сколько нужно?" name="summ_value" onChange={handleChange}>
				<RangeInput key={counter.summ_value} name="summ_value" label="(Руб.)" start={100} end={200000} step={100} onChange={handleChange} eStep="true" />
			</SearchModule>
			<SearchModule title="На какой срок?" name="term_value" onChange={handleChange}>
				<RangeInput key={counter.term_value} name="term_value" label="(Дней)" start={1} end={500} step={1} onChange={handleChange} />
			</SearchModule>
			{/*<SearchModule title="Сумма выдачи" name="summ" onChange={handleChange}>
				<CheckboxFilter name="summ"
					items={[
					"100 - 1 000 руб.",
					"2 000 - 5 000 руб.",
					"6 000 - 10 000 руб.",
					"11 000 - 15 000 руб.",
					"16 000 - 20 000 руб.",
					"20 000 - 30 000 руб",
					"свыше 30 000 руб."]}
					value={filters.summ}
					actual={actual.summ || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Время рассмотрения" name="review_time" onChange={handleChange}>
				<RadioFilter name="review_time"
					items={[
					"до 2 мин.",
					"до 15 мин.",
					"до 20 мин.",
					"до 30 мин."]}
					value={filters.review_time}
					actual={actual.review_time || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Время получения денег" name="get_money_time" onChange={handleChange}>
				<RadioFilter name="get_money_time"
					items={[
					"Моментально",
					"До 15 минут",
					"До 20 минут",
					"До 1 дня"]}
					value={filters.get_money_time}
					actual={actual.get_money_time || null}
					onChange={handleChange} />
			</SearchModule>*/}
			<SearchModule title="Категории" name="category_mfo" onChange={handleChange}>
				<CheckboxFilter name="category_mfo"
					items={[
					"С плохой кред. историей",
					"Онлайн",
					"Быстрые",
					"С мгновенным одобрением",
					"Срочные",
					"Экспресс",
					"Круглосуточно",
					"Наличными",
					"Моментальные",
					"По паспорту",
					"До зарплаты",
					"Долгосрочные",
					"Без отказа",
					"Без поручителей",
					"Для студентов",
					"Для пенсионеров",
					"Без процентов",
					"С 18 лет",
					"Безработным",
					"Без паспорта",
					"Без кредит. истории"]}
					value={filters.category_mfo}
					actual={actual.category_mfo || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Подтверждение дохода" name="income_proof" onChange={handleChange}>
				<RadioFilter name="income_proof"
					items={[
					"Да",
					"Нет"]}
					value={filters.income_proof}
					actual={actual.income_proof || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Кредитная история" name="credit_history" onChange={handleChange}>
				<RadioFilter name="credit_history"
					items={[
					"Любая",
					"Хорошая"]}
					value={filters.credit_history}
					actual={actual.credit_history || null}
					onChange={handleChange} />
			</SearchModule>
			{/*<SearchModule title="Способы получения" name="get_ways" onChange={handleChange}>
				<CheckboxFilter name="get_ways"
					items={[
					"Банковская карта",
					"Банковский счет",
					"Система Contact",
					"QIWI кошелек",
					"Яндекс.Деньги",
					"Система Юнистрим",
					"Золотая корона"]}
					value={filters.get_ways}
					actual={actual.get_ways || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Способы погашения" name="repayment_options" onChange={handleChange}>
				<CheckboxFilter name="repayment_options"
					items={[
					"Банковская карта",
					"Банковский счет",
					"Евросеть",
					"Связной",
					"Почта России",
					"Элекснет",
					"QIWI",
					"Система Contact",
					"Золотая Корона",
					"Яндекс.Деньги",
					"WebMoney",
					"Альфа-Клик",
					"Промсвязьбанк",
					"Салоны связи \"МТС\"",
					"Салоны связи \"Билайн\"",
					"Карта \"Кукуруза\""]}
					value={filters.repayment_options}
					actual={actual.repayment_options || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Возраст" name="age" onChange={handleChange}>
				<CheckboxFilter name="age"
					items={[
					"От 18 до 24 лет",
					"От 25 до 34 лет",
					"От 35 до 44 лет",
					"От 45 до 54 лет",
					"Старше 55"]}
					value={filters.age}
					actual={actual.age || null}
					onChange={handleChange} />
			</SearchModule>*/}
			<SearchModule title="Мобильное приложение" name="mob_app" onChange={handleChange}>
				<RadioFilter name="mob_app"
					items={[
					"Да",
					"Нет"]}
					value={filters.mob_app}
					actual={actual.mob_app || null}
					onChange={handleChange} />
			</SearchModule>
		</div>
	)
}

function cardsFilters(filters, handleChange, total, place, actual, counter) {
	return (
		<div>
			<p>Всего карт: <strong>{total}</strong><br/>Найдено в: <strong>{place}</strong></p>
			<SearchModule title="Платежная система" name="payment_system" onChange={handleChange}>
				<CheckboxFilter name="payment_system"
					items={[
					"MasterCard",
					"Visa",
					"Мир"]}
					value={filters.payment_system}
					actual={actual.payment_system || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Кредитный лимит" name="limit_value" onChange={handleChange}>
				<RangeInput key={counter.limit_value} name="limit_value" label="(Руб.)" start={100} end={1000000} step={100} onChange={handleChange} eStep="true" />
			</SearchModule>
			<SearchModule title="Процентная ставка" name="rate_value" onChange={handleChange}>
				<RangeInput key={counter.rate_value} name="rate_value" label="(Проценты)" start={1} end={100} step={1} onChange={handleChange} />
			</SearchModule>
			{/*<SearchModule title="Срок действия карты" name="validity" onChange={handleChange}>
				<CheckboxFilter name="validity"
					items={[
					"2 года",
					"3 года ",
					"4 года",
					"5 лет и более"]}
					value={filters.validity}
					actual={actual.validity || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Лимиты" name="limits" onChange={handleChange}>
				<RadioFilter name="limits"
					items={[
					"до 200 000 тыс.",
					"до 300 000 тыс.",
					"до 400 000 тыс.",
					"до 500 000 тыс.",
					"до 600 000 тыс."]}
					value={filters.limits}
					actual={actual.limits || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Льготный период" name="grace_period" onChange={handleChange}>
				<RadioFilter name="grace_period"
					items={[
					"До 50 дней",
					"До 60 дней",
					"До 100 дней",
					"Свыше 100 дней"]}
					value={filters.grace_period}
					actual={actual.grace_period || null}
					onChange={handleChange} />
			</SearchModule>*/}
			<SearchModule title="Категории" name="category_cards" onChange={handleChange}>
				<CheckboxFilter name="category_cards"
					items={[
					"Альфа-Банк",
					"Тинькофф",
					"Самые лучшие кредитные карты",
					"Самые выгодные",
					"В день обращения",
					"Без процентов",
					"Срочно",
					"Без отказа",
					"Без справок",
					"На дом без визита в банк",
					"Без годового обслуживания",
					"Без подтверждения дохода",
					"Без кредитной истории",
					"Для пенсионеров",
					"Для студентов",
					"Безработным",
					"С беспроцентным периодом",
					"С кэшбэком",
					"Моментальные",
					"Для снятия наличных",
					"Виртуальные",
					"Apple Pay",
					"Samsung Pay",
					"За 5 минут",
					"За 15 минут",
					"За 30 минут",
					"Visa",
					"MasterCard",
					"МИР"]}
					value={filters.category_cards}
					actual={actual.category_cards || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Cashback" name="cashback" onChange={handleChange}>
				<RadioFilter name="cashback"
					items={[
					"Да",
					"Нет"]}
					value={filters.cashback}
					actual={actual.cashback || null}
					onChange={handleChange} />
			</SearchModule>
			{/*<SearchModule title="Время рассмотрения" name="consideration_time" onChange={handleChange}>
				<CheckboxFilter name="consideration_time"
					items={[
					"1 - 2 мин.",
					"3 - 5 мин.",
					"15 - 30 мин.",
					"1 - 2 часа",
					"1 - 2 дня"]}
					value={filters.consideration_time}
					actual={actual.consideration_time || null}
					onChange={handleChange} />
			</SearchModule>*/}
			<SearchModule title="Доставка карты" name="card_delivery" onChange={handleChange}>
				<RadioFilter name="card_delivery"
					items={[
					"На дом",
					"В отделение"]}
					value={filters.card_delivery}
					actual={actual.card_delivery || null}
					onChange={handleChange} />
			</SearchModule>
			{/*<SearchModule title="Срок доставки" name="time_delivery" onChange={handleChange}>
				<CheckboxFilter name="time_delivery"
					items={[
					"1 - 2 дня",
					"3 - 4 дня",
					"5 - 7 дней"]}
					value={filters.time_delivery}
					actual={actual.time_delivery || null}
					onChange={handleChange} />
			</SearchModule>*/}
			<SearchModule title="Подтверждение дохода" name="income_proof" onChange={handleChange}>
				<RadioFilter name="income_proof"
					items={[
					"Да",
					"Нет"]}
					value={filters.income_proof}
					actual={actual.income_proof || null}
					onChange={handleChange} />
			</SearchModule>
			{/*<SearchModule title="Возраст" name="age" onChange={handleChange}>
				<CheckboxFilter name="age"
					items={[
					"От 18 до 24 лет",
					"От 25 до 34 лет",
					"От 35 до 44 лет",
					"От 45 до 54 лет",
					"Старше 55"]}
					value={filters.age}
					actual={actual.age || null}
					onChange={handleChange} />
			</SearchModule>*/}
			<SearchModule title="Наличие чипа" name="chip_availability" onChange={handleChange}>
				<RadioFilter name="chip_availability"
					items={[
					"Да",
					"Нет"]}
					value={filters.chip_availability}
					actual={actual.chip_availability || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="3D Secure" name="secure_3d" onChange={handleChange}>
				<RadioFilter name="secure_3d"
					items={[
					"Да",
					"Нет"]}
					value={filters.secure_3d}
					actual={actual.secure_3d || null}
					onChange={handleChange} />
			</SearchModule>
			<SearchModule title="Мобильное приложение" name="mob_app" onChange={handleChange}>
				<RadioFilter name="mob_app"
					items={[
					"Да",
					"Нет"]}
					value={filters.mob_app}
					actual={actual.mob_app || null}
					onChange={handleChange} />
			</SearchModule>
		</div>
	)
}

class Sidebar extends Component {
	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)

		this.state = {
			summ_value: 1,
			term_value: 1,
			limit_value: 1,
			rate_value: 1
		}
	}

	handleChange(name, value) {
		const {dispatch} = this.props

		if(this.state[name] && value === null) {
			this.setState(prev => ({
				[name]: prev[name]+1
			}))
		}

		window.scrollTo({
        top: document.getElementById('results').getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth"
    })

		dispatch(changeFilter(name, value))
		dispatch(sendEvent({
			type: 'change_filter',
			payload: {
				filterName: name,
				filterValue: JSON.stringify(value)
			}
		}))
	}

	getFilters() {
		const {url, filters, total, location, actual} = this.props

		const place =	typeof location !== 'undefined' ? location.city || location.place : 'вашем городе'

		switch(url) {
			case 'mfo':
				return mfoFilters(filters, this.handleChange, total, place, actual, this.state)
			case 'cards':
				return cardsFilters(filters, this.handleChange, total, place, actual, this.state)
			default:
				return false
		}
	}

	render() {
		return (
			<div className="sidebar">
				{this.getFilters()}
			</div>
		)
	}
}

export default Sidebar
