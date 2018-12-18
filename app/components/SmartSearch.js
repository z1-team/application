import React, {Component} from 'react'

import RangeInput from './RangeInput'

const summRange = [100, 2000, 6000, 11000, 16000, 20000, 30000, 9999999]


function searchRange(range, value, index = 0) {
  if(range[index] <= value && value < range[index+1]) {
    return index
  } else {
    return searchRange(range, value, index+1)
  }
}

class SmartSearch extends Component {

  handleChange = (name, value) => {
    console.log(name === "summ" ? searchRange(summRange, value) : '')
  }

  render() {
    return(
      <div className="smart-search">
        <h2>Привет! Я твой Эмми, твой электронный помощник. Что ты ищещь?</h2>
        <div>
          <figure>
            <img src="/img/smartsearch.png" />
          </figure>
          <div>
            <p>Я хочу получить микрозайм</p>
            <ul>
              <li>
                <RangeInput name="summ" label="сумма в рублях" start={100} end={50000} step={100} onChange={this.handleChange} />
              </li>
              <li>
                <RangeInput name="days" label="на сколько дней" start={1} end={50} step={1} onChange={this.handleChange} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SmartSearch
