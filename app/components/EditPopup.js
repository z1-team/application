import React, {Component} from 'react'

import LogoUploader from './LogoUploader'
import EditPopupMain from './EditPopupMain'
import EditPopupDetails from './EditPopupDetails'
import EditPopupCategories from './EditPopupCategories'
import EditPopupRange from './EditPopupRange'
import EditPopupFilter from './EditPopupFilter'
import EditPopupSort from './EditPopupSort'
import EditPopupSpecials from './EditPopupSpecials'

import {closePopup, updatePartner, selectPartner, deletePartner} from '../actions'

const filterValuesNames = {
  summ: "Сколько нужно",
  term: "На какой срок",
  limit: "Кредитный лимит",
  rate: "Процентная ставка"
}

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

const detailsNames = {
  minSumm: "Минимальная сумма",
  maxSumm: "Максимальная сумма",
  minPercent: "Минимальная процентная ставка",
  maxPercent: "Максимальная процентная ставка",
  minTerm: "Минимальный срок",
  maxTerm: "Максимальный срок",
  appProcessTime: "Время рассмотрения заявки",
  getMoneyTime: "Время получения денег",
  penalty: "Штраф за неуплату",
  incomeProof: "Подтверждение дохода",
  regionRegistr: "Прописка в регионе банка",
  identification: "Идентификация",
  age: "Возраст",
  obtainingMethods: "Способы получения",
  repaymentOptions: "Способы погашения",
  creditHistory: "Кредитная история",
  schedule: "График работы",
  personalArea: "Личный кабинет",
  application: "Приложение",
  creditHistoryImprovement: "Улучшение кредитной истории",
  smsInfo: "Смс-информирование",
  paySystem: "Платежная система",
  cardType: "Тип карты",
  validity: "Срок действия",
  minLimit: "Максимальный лимит",
  maxLimit: "Минимальный лимит",
  interestRate: "Процентная ставка",
  maintenanceСost: "Стоимость обслуживания",
  gracePeriod: "Льготный период",
  commission: "Комиссия за снятие наличных",
  cashback: "Кэшбэк",
  minPayment: "Минимальный платеж",
  considerationTime: "Время рассмотрения",
  delivery: "Доставка карты",
  deliveryTime: "Срок доставки",
  chipAvailability: "Наличие чипа",
  contactlessPayment: "Бесконтактная оплата",
  secure3D: "3D Secure",
  supplyDepartment: "OPC",
  internetBank: "Интернет-банк"
}

const categoriesMfoNames = [
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
  "Без кредит. истории"
]

const categoriesCardsNames = [
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
  "МИР"
]

const mainNames = {
  title: "Заголовок",
  money: "Сумма займа",
  term: "Срок займа",
  minRate: "Ставка",
  limit: "Кредитный лимит",
  percent: "Процентная ставка",
  cashback: "Cashback",
  link: "Ссылка",
  overpayment: "Переплата",
  firstLoan: "Акция"
}

class EditPopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changed: false,
      tab: "main"
    }

    this.changes = {
      main: {},
      details: {},
      filters: {},
      filter_values: {},
      sortBy: {}
    }

    this.changeTab = this.changeTab.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
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

  handleChange(type, field, value) {
    this.changes[type][field] = value
    this.setState({changed: true})
  }

  handleSave(event) {
    event.preventDefault()

    const {partner, dispatch} = this.props

    const partner_ = {
      id: partner.id,
      type: partner.type,
      main: {
        ...partner.main,
        ...this.changes.main
      },
      details: {
        ...partner.details,
        ...this.changes.details
      },
      filters: {
        ...partner.filters,
        ...this.changes.filters
      },
      filter_values: {
          ...partner.filter_values,
          ...this.changes.filter_values
      },
      sortBy: {
        ...partner.sortBy || {},
        ...this.changes.sortBy
      }
    }

    this.setState({changed: false})
    dispatch(updatePartner(partner.id, partner_))
    dispatch(closePopup())
  }

  handleDelete = (event) => {
    event.preventDefault()

    const {partner, dispatch} = this.props

    dispatch(deletePartner(partner.id))
    dispatch(closePopup())
  }

  handleCancel = (event) => {
    event.preventDefault()

    const {dispatch} = this.props

    dispatch(closePopup())
    setTimeout(function(){dispatch(selectPartner(null))}, 400)
  }

  render() {
    const {tab} = this.state
    const {partner, url} = this.props

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
            <li>
              <button onClick={this.changeTab} data-tab="sort" className={tab === "sort" ? 'active' : undefined}>Сортировка</button>
            </li>
          </ul>
          <div className={tab === "main" ? 'card-main active' : 'card-main'}>
            {partner && <LogoUploader logo={partner.main.logo} onChange={this.handleChange} />}
            {partner && <EditPopupMain names={mainNames} main={partner.main} onChange={this.handleChange} />}
            {partner && <EditPopupSpecials value={partner.main.special_label} onChange={this.handleChange} />}
          </div>
          <div className={tab === "details" ? 'card-details active' : 'card-details'}>
            {partner && <EditPopupDetails details={partner.details} names={detailsNames} onChange={this.handleChange} />}
          </div>
          <div className={tab === "categories" ? 'card-categories active' : 'card-categories'}>
            {partner && partner.filters.category_mfo && <EditPopupCategories categories={partner.filters.category_mfo} name="category_mfo" names={categoriesMfoNames} onChange={this.handleChange} />}
            {partner && partner.filters.category_cards && <EditPopupCategories categories={partner.filters.category_cards} name="category_cards" names={categoriesCardsNames} onChange={this.handleChange} />}
          </div>
          <div className={tab === "filters" ? 'card-filters active' : 'card-filters'}>
            {/* partner && Object.getOwnPropertyNames(partner.filters).map((filter) => (
              console.log()
            )) */}
            {partner && partner.filter_values && Object.getOwnPropertyNames(partner.filter_values).map((filter, index) => (
              <EditPopupRange name={filter} key={index} title={filterValuesNames[filter]} values={partner.filter_values[filter]} onChange={this.handleChange} />
            ))}
            {partner && Object.getOwnPropertyNames(partner.filters).filter(filter => filter !== "category_mfo" && filter !== "category_cards").map((filter, index) => (
              <EditPopupFilter name={filter} key={index} title={filterNames[filter].title} names={filterNames[filter].names} values={partner.filters[filter]} onChange={this.handleChange} />
            ))}
          </div>
          <div className={tab === "sort" ? 'card-sort active' : 'card-sort'}>
            {partner && <EditPopupSort url={url} sortInfo={partner.sortBy} onChange={this.handleChange} />}
          </div>
        </section>
        <footer>
          <ul>
            <li>
              <button className={this.state.changed ? 'active' : ''} onClick={this.handleSave}>Сохранить</button>
            </li>
            <li>
              <button onClick={this.handleDelete}>Удалить</button>
            </li>
          </ul>
          <button onClick={this.handleCancel}>Отмена</button>
        </footer>
      </form>
    )
  }
}

export default EditPopup
