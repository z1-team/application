import React, {Component} from 'react'

class EditPopupCategories extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: this.props.categories
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, onChange} = this.props
    const index = event.target.getAttribute('data-index')
    this.setState((prev) => {
      const result = prev.values.slice()
      result[index] = !prev.values[index]

      if(typeof onChange === "function") {
        onChange("filters", name, result)
      }

      return {
        values: result
      }
    })
  }

  render() {
    const {names} = this.props
    const categories = this.state.values

    return (
      <ul>
        {categories.map((value, index) => (
          <li key={index}>
            <label className={value ? 'active' : ''}><input type="checkbox" data-index={index} onChange={this.handleChange} />{names[index]}</label>
          </li>
        ))}
      </ul>
    )
  }
}

export default EditPopupCategories
