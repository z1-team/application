import React, {Component} from 'react'
import CardAccordeon from './CardAccordeon'

class Card extends Component {
  constructor(props) {
    super(props)
    this.handleOrder = this.handleOrder.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOrder(event) {
    const {onOrder} = this.props
    if (typeof onOrder === 'function') {
      onOrder(this.props.item.title)
    }
  }

  handleClick() {
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

  render() {
    const {item, tail, edit} = this.props
    return (
      <div className="result-item">
        <section>
          <figure>
            <img src={item.main.logo} />
          </figure>
          <div className="info">
            <h3>{item.main.title}</h3>
            {/*
            <div className="rating">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p><a href="#">22 отзыва</a> (4.1 из 5)</p>
            </div>
            */}
            {item.main &&
              <ul className="pros">
                {/* For MFO */}
                {item.main.money && <li><strong>{item.main.money}</strong> руб.<em>сумма займа</em></li>}
                {item.main.term && <li><strong>{item.main.term}</strong><em>срок займа</em></li>}
                {item.main.minRate && <li><strong>{item.main.minRate}</strong><em>ставка</em></li>}

                {/* For credit cards */}
                {item.main.limit && <li><strong>{item.main.limit}</strong> руб.<em>кредитный лимит</em></li>}
                {item.main.percent && <li>от <strong>{item.main.percent}</strong><em>процентная ставка</em></li>}
                {item.main.cashback && <li><strong>{item.main.cashback}</strong><em>cashback</em></li>}

                {/* For credits */}
                {item.main.maxSumm && <li><strong>{item.main.maxSumm}</strong> руб.<em>максимальная сумма</em></li>}
                {item.main.rate && <li>от <strong>{item.main.rate}</strong><em>процентная ставка</em></li>}
                {item.main.timing && <li><strong>{item.main.timing}</strong><em>время рассмотрения</em></li>}
              </ul>
            }
          </div>
          <div className="process">
            {edit && <button onClick={this.handleClick}><i className="fas fa-edit"></i></button>}
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
