import React, {Component} from 'react'

import PopupFilter from './PopupFilter'

import {closePopup} from '../actions'

const filterNames = {
  special_offers: {
    title: "Спецпредложения",
    names: [
      "0% первый займ",
      "увеличенный лимит постоянным клиентам"
    ]
  },
  summ: {
    title: "Сумма выдачи",
    names: [
      "100 - 1 000 руб.",
      "2 000 - 5 000 руб.",
      "6 000 - 10 000 руб.",
      "11 000 - 15 000 руб.",
      "16 000 - 20 000 руб.",
      "20 000 - 30 000 руб",
      "свыше 30 000 руб."
    ]
  },
  review_time: {
    title: "Время рассмотрения",
    names: [
      "до 2 мин.",
      "до 15 мин.",
      "до 20 мин.",
      "до 30 мин."
    ]
  },
  get_money_time: {
    title: "Время получения денег",
    names: [
      "Моментально",
      "До 15 минут",
      "До 20 минут",
      "До 1 дня"
    ]
  },
  income_proof: {
    title: "Подтверждение дохода",
    names: [
      "Да",
      "Нет"
    ]
  },
  credit_history: {
    title: "Кредитная история",
    names: [
      "Любая",
      "Хорошая"
    ]
  },
  get_ways: {
    title: "Способы получения",
    names: [
      "Банковская карта",
      "Банковский счет",
      "Система Contact",
      "QIWI кошелек",
      "Яндекс.Деньги",
      "Система Юнистрим",
      "Золотая корона"
    ]
  },
  repayment_options: {
    title: "Способы погашения",
    names: [
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
      "Карта \"Кукуруза\""
    ]
  },
  age: {
    title: "Возраст",
    names: [
      "От 18 до 24 лет",
      "От 25 до 34 лет",
      "От 35 до 44 лет",
      "От 45 до 54 лет",
      "Старше 55"
    ]
  },
  mob_app: {
    title: "Мобильное приложение",
    names: [
      "Да",
      "Нет"
    ]
  },
  payment_system: {
    title: "Платежная система",
    names: [
      "MasterCard",
      "Visa",
      "Мир"
    ]
  },
  validity: {
    title: "Срок действия карты",
    names: [
      "2 года",
      "3 года ",
      "4 года",
      "5 лет и более"
    ]
  },
  limits: {
    title: "Лимиты",
    names: [
      "до 200 000 тыс.",
      "до 300 000 тыс.",
      "до 400 000 тыс.",
      "до 500 000 тыс.",
      "до 600 000 тыс."
    ]
  },
  grace_period: {
    title: "Льготный период",
    names: [
      "До 50 дней",
      "До 60 дней",
      "До 100 дней",
      "Свыше 100 дней"
    ]
  },
  cashback: {
    title: "Cashback",
    names: [
      "Да",
      "Нет"
    ]
  },
  consideration_time: {
    title: "Время рассмотрения",
    names: [
      "1 - 2 мин.",
      "3 - 5 мин.",
      "15 - 30 мин.",
      "1 - 2 часа",
      "1 - 2 дня"
    ]
  },
  card_delivery: {
    title: "Доставка карты",
    names: [
      "На дом",
      "В отделение"
    ]
  },
  time_delivery: {
    title: "Срок доставки",
    names: [
      "1 - 2 дня",
      "3 - 4 дня",
      "5 - 7 дней"
    ]
  },
  chip_availability: {
    title: "Наличие чипа",
    names: [
      "Да",
      "Нет"
    ]
  },
  secure_3d: {
    title: "3D Secure",
    names: [
      "Да",
      "Нет"
    ]
  }
}

class EditPopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: "main"
    }

    this.changeTab = this.changeTab.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }

  changeTab(event) {
    event.preventDefault()

    const button = event.target
    const newTab = button.getAttribute('data-tab')

    this.setState({ tab: newTab })
  }

  closePopup(event) {
		event.preventDefault()

		this.props.dispatch(closePopup())
	}

  render() {
    const {tab} = this.state
    const {partner} = this.props

    return (
      <form action="#">
        <header>
          <h3>Редактирование карточки <strong>партнера</strong></h3>
          <button onClick={this.closePopup}></button>
        </header>
        <section>
          <ul className="tabs">
            <li>
              <button onClick={this.changeTab} data-tab="main" className={tab === "main" ? 'active' : undefined}>Основное</button>
            </li>
            <li>
              <button onClick={this.changeTab} data-tab="details" className={tab === "details" ? 'active' : undefined}>Подробнее</button>
            </li>
            <li>
              <button onClick={this.changeTab} data-tab="categories" className={tab === "categories" ? 'active' : undefined}>Категории</button>
            </li>
            <li>
              <button onClick={this.changeTab} data-tab="filters" className={tab === "filters" ? 'active' : undefined}>Фильтры</button>
            </li>
          </ul>
          <div className={tab === "main" ? 'card-main active' : 'card-main'}>
            <figure>
              <img src="img/kredito24-logo.png" />
              <figcaption>
                <i className="fas fa-upload"></i>
              </figcaption>
            </figure>
            <div>
              <label>Название карточки: <input type="text" /></label>
              <label>Сумма займа: <input type="text"/></label>
              <label>Срок займа: <input type="text"/></label>
              <label>Ставка: <input type="text"/></label>
              <label>Ссылка: <input type="text"/></label>
            </div>
          </div>
          <div className={tab === "details" ? 'card-details active' : 'card-details'}>
            {/* MFO */}
            <ul>
              <li>
                <label>Минимальная сумма (руб.): <input type="text"/></label>
              </li>
            </ul>
          </div>
          <div className={tab === "categories" ? 'card-categories active' : 'card-categories'}>
            <ul>
              <li>
                <label>С плохой кред. историей<input type="checkbox"/></label>
              </li>
              <li>
                <label>Онлайн<input type="checkbox"/></label>
              </li>
              <li>
                <label>Быстрые<input type="checkbox"/></label>
              </li>
              <li>
                <label>С мгновенным одобрением<input type="checkbox"/></label>
              </li>
              <li>
                <label>Срочные<input type="checkbox"/></label>
              </li>
              <li>
                <label>Экспресс<input type="checkbox"/></label>
              </li>
              <li>
                <label>Круглосуточно<input type="checkbox"/></label>
              </li>
              <li>
                <label>Наличными<input type="checkbox"/></label>
              </li>
            </ul>
          </div>
          <div className={tab === "filters" ? 'card-filters active' : 'card-filters'}>
            {/* partner && Object.getOwnPropertyNames(partner.filters).map((filter) => (
              console.log()
            )) */}
            {partner && Object.getOwnPropertyNames(partner.filters).map((filter, index) => (
              <PopupFilter key={index} title={filterNames[filter].title} names={filterNames[filter].names} values={partner.filters[filter]}/>
            ))}
          </div>
        </section>
        <footer>
          <ul>
            <li>
              <button>Сохранить</button>
            </li>
            <li>
              <button>Удалить</button>
            </li>
          </ul>
          <button>Отмена</button>
        </footer>
      </form>
    )
  }
}

export default EditPopup
