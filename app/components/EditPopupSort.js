import React, {Component} from 'react'

const sortInputs = {
  mfo: { summ: "По сумме", term: "По срокам", rate: "По процентной ставке" },
  cards: { limit: "По кредитному лимиту", rate: "По процентной ставке", cashback: "По кэшбэку" }
}

const defaultSort = {
  mfo: { summ: 0, term: 0, rate: 0 },
  cards: { limit: 0, rate: 0, cashback: 0 }
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

    return sortInputs[url.split('/')[1]][id] || defaultSort.mfo[id]
  }

  handleChange = (event) => {
    const sortBy = event.target.name
    const value = parseInt(event.target.value)
    const { onChange } = this.props

    this.setState({[sortBy]: value})

    if(typeof onChange === 'function'){
      onChange("sortBy", sortBy, value)
    }
  }

  render() {
    const sortInfo = this.state

    return(
      <div>
        <ul>
          {Object.getOwnPropertyNames(sortInfo).map((id) => (
            <li key={id}>
              <label>{this.defaultSort(id)}:
                <input type="number" name={id} onChange={this.handleChange} value={sortInfo[id]} />
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default EditPopupSort
