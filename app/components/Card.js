import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import CardAccordeon from './CardAccordeon'

const repaymentOptions = [
  "bankcard",
  "bankaccount",
  "euroset",
  "svaznoy",
  "russianpost",
  "elexnet",
  "qiwi",
  "contactsystem",
  "goldencrown",
  "yandexmoney",
  "webmoney",
  "alfaclick",
  "promsvazbank",
  "mts",
  "beeline",
  "kukuruza"
]

const getWays = [
    "bankcard",
    "bankaccount",
    "contactsystem",
    "qiwi",
    "yandexmoney",
    "unistream",
    "goldencrown"
]

class Card extends Component {
  constructor(props) {
    super(props)
    this.handleOrder = this.handleOrder.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOrder(event) {
    const {onOrder} = this.props
    if (typeof onOrder === 'function') {
      onOrder(this.props.item.title)
    }
  }

  handleEdit() {
    const {onEdit, dataID} = this.props

    if(typeof onEdit === 'function') {
      onEdit(dataID)
    }
  }

  handleOpen() {
    const {onMore, item} = this.props

    if(typeof onMore === 'function') {
      onMore(item.id, item.main.title)
    }
  }

  repaymentOptions() {
    const { item } = this.props
    const { repayment_options } = item.filters

    if(repayment_options) {
      return repayment_options.map((item, index) => (
        item ? repaymentOptions[index] : false
      )).filter(i => i !== false)
    }

    return false
  }

  getWays() {
      const { item } = this.props
      const { get_ways } = item.filters

      if(get_ways) {
        return get_ways.map((item, index) => (
          item ? getWays[index] : false
        )).filter(i => i)
      }

      return false
  }

  getEnding() {
    const { item } = this.props
    const count = item.sortBy.testimonials_count
    const ending = count%10

    switch(ending) {
      case 1:
      case 2:
      case 3:
      case 4:
        return "отзыва"
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      default:
        return "отзывов"
    }
  }

  render() {
    const {item, tail, edit} = this.props
    const rating = Math.round(item.sortBy.rating*10)/10
    const star = Math.round(item.sortBy.rating)

    return (
      <div className="result-item">
        <section>
          <figure>
            <img src={item.main.logo} />
          </figure>
          <div className="info">
            <h3>{item.main.title}</h3>
            <div className="rating">
              <ul className={`rate-${star}`}>
                <li><i className="fas fa-star"></i></li>
                <li><i className="fas fa-star"></i></li>
                <li><i className="fas fa-star"></i></li>
                <li><i className="fas fa-star"></i></li>
                <li><i className="fas fa-star"></i></li>
              </ul>
              <p><Link to={`/testimonials/${item.id}`}>{item.sortBy.testimonials_count} {this.getEnding()}</Link> {item.sortBy.rating && `(${rating} из 5)`}</p>
            </div>
            {item.type === 'mfo' && item.main &&
              <ul className="pros">
                {item.main.money && <li><i className="far fa-money-bill-alt"></i><strong>{item.main.money}</strong> руб.</li>}
                {item.main.term && <li><i className="far fa-calendar-alt"></i><strong>{item.main.term}</strong></li>}
                {item.main.minRate && <li><i className="far fa-thumbs-up"></i>от <strong>{item.main.minRate}</strong> в день</li>}
              </ul>
            }
            {item.type === 'cards' && item.main &&
              <ul className="pros">
                {item.main.limit && <li><i className="far fa-credit-card"></i><strong>{item.main.limit}</strong> руб.</li>}
                {item.main.percent && <li><i className="far fa-thumbs-up"></i>от <strong>{item.main.percent}</strong></li>}
                {item.main.cashback && <li><i className="far fa-money-bill-alt"></i><strong>{item.main.cashback}</strong></li>}
              </ul>
            }
            {item.type === 'credits' && item.main &&
              <ul className="pros">
                {item.main.maxSumm && <li><strong>{item.main.maxSumm}</strong> руб.<em>максимальная сумма</em></li>}
                {item.main.rate && <li>от <strong>{item.main.rate}</strong><em>процентная ставка</em></li>}
                {item.main.timing && <li><strong>{item.main.timing}</strong><em>время рассмотрения</em></li>}
              </ul>
            }
            {this.getWays() && this.repaymentOptions() &&
              <ul className="options">
                <li>Способы получения: <span>{this.getWays().map(item => (<i key={item} className={`icon ${item}`}></i>))}</span></li>
                {/* <li>Способы погашения: <span>{this.repaymentOptions().map(item => (<i key={item} className={`icon ${item}`}></i>))}</span></li> */}
              </ul>
            }
          </div>
          <div className="process">
            {edit && <button onClick={this.handleEdit}><i className="fas fa-edit"></i></button>}
            <a target="_blank" href={`${item.main.link}?${tail}`} rel="nofollow noopener" onClick={this.handleOrder}>Оформить</a>
            {/* item.main.overpayment && <p>переплата {item.main.overpayment}</p> */}
          </div>
        </section>
        <CardAccordeon details={item.details} main={item.main} onOpen={this.handleOpen}/>
      </div>
    )
  }
}

export default Card
