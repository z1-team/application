import React, {Component} from 'react'

const sortInputs = {
  mfo: { summ: "По сумме", term: "По срокам", rate: "По процентной ставке", rating: "По рейтингу" },
  cards: { limit: "По кредитному лимиту", rate: "По процентной ставке", cashback: "По кэшбэку", rating: "По рейтингу" }
}

const defaultSort = {
  mfo: { summ: 0, term: 0, rate: 0, rating: 0 },
  cards: { limit: 0, rate: 0, cashback: 0, rating: 0 }
}

class EditPopupSort extends Component {
  constructor(props) {
    super(props)

    const { url } = props

    this.state = {
      ...(defaultSort[url.split('/')[1]] || defaultSort.mfo),
      ...(props.sortInfo || {})
     }
  }

  defaultSort(id) {
    const { url } = this.props

    return sortInputs[url.split('/')[1]][id] || sortInputs.mfo[id]
  }

  handleChange = (event) => {
    const sortBy = event.target.name
    const value = event.target.value
    const { onChange } = this.props

    console.log(value)

    this.setState({[sortBy]: value})

    if(typeof onChange === 'function'){
      onChange("sortBy", sortBy, parseFloat(value))
    }
  }

  render() {
    const sortInfo = this.state

    return(
      <div>
        <ul>
          {Object.getOwnPropertyNames(sortInfo).filter(filter => filter !== "rating" && filter !== "testimonials_count").map((id) => (
              <li key={id}>
                <label>{this.defaultSort(id)}:
                  <input type="text" name={id} onChange={this.handleChange} value={sortInfo[id]} />
                </label>
              </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default EditPopupSort
