import React, {Component} from 'react'

class EditPopupDetails extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.details

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const detail = event.target.getAttribute('data-name')
    const value = event.target.value
    const {onChange} = this.props

    this.setState({ [detail]: value })

    if(typeof onChange === "function") {
      onChange("details", detail, value)
    }
  }

  render() {
    const {names} = this.props
    const details = this.state

    return (
      <ul>
        {Object.getOwnPropertyNames(details).map((detail, index) => (
          <li key={index}>
            <label>{names[detail]}: <input type="text" data-name={detail} value={details[detail]} onChange={this.handleChange} /></label>
          </li>
        ))}
      </ul>
    )
  }
}

export default EditPopupDetails
