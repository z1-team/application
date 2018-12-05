import React, {Component} from 'react'

import {sortPartner} from '../actions'

const sortButtons = {
  mfo: [
    {title: "По сумме", id: "summ"},
    {title: "По срокам", id: "term"},
    {title: "По процентной ставке", id: "rate"}
  ],
  cards: [
    {title: "По кредитному лимиту", id: "limit"},
    {title: "По процентной ставке", id: "rate"},
    {title: "По кэшбэку", id: "cashback"}
  ]
}

class ResultsSort extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()

    const {dispatch, sortInfo} = this.props

    const id = event.target.getAttribute('data-id')
    const order = id === sortInfo.sortBy ? !sortInfo.isAscending : false

    dispatch(sortPartner(id, order))
  }

  sortButtons() {
    const { url } = this.props

    return (
      sortButtons[url.split('/')[1]] || sortButtons.mfo
    )
  }

  sortButtonClass(id) {
    const { sortInfo } = this.props
    const order = sortInfo.isAscending ? " up" : " down"

    if(sortInfo.sortBy === id) {
      return "active" + order
    }

    return ''
  }

  render() {
    const { sortInfo } = this.props

    return(
      <div className="sort">
        <p>Сортировать:</p>
        <ul>
          {/*
          <li>
            <button onClick={this.handleClick}>ПО РЕЙТИНГУ</button>
          </li>
          */}
          {this.sortButtons().map(({id, title}) => (
            <li key={id}>
              <button className={this.sortButtonClass(id)} onClick={this.handleClick} data-id={id}>{title}</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ResultsSort
