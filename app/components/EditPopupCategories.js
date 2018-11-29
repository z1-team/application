import React, {Component} from 'react'

class EditPopupCategories extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.categories

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const categories = this.state
    const category = event.target.getAttribute('data-name')
    const {onChange} = this.props

    this.setState(() => {
      if(typeof onChange === "function") {
        onChange("categories", category, !categories[category])
      }

      return {
        [category]: !categories[category]
      }
    })
  }

  render() {
    const {names} = this.props
    const categories = this.state

    return (
      <ul>
        {Object.getOwnPropertyNames(categories).map((category, index) => (
          <li key={index}>
            <label className={categories[category] ? 'active' : ''}><input data-name={category} type="checkbox" onChange={this.handleChange} />{names[category]}</label>
          </li>
        ))}
      </ul>
    )
  }
}

export default EditPopupCategories
