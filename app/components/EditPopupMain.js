import React, {Component} from 'react'

class EditPopupMain extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.main

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const name = event.target.getAttribute('data-name')
    const value = event.target.value
    const {onChange} = this.props

    this.setState({ [name]: value })

    if(typeof onChange === "function") {
      onChange("main", name, value)
    }
  }

  render() {
    const main = this.state
    const {names} = this.props

    return (
      <div>
        {Object.getOwnPropertyNames(main).map((label, index) =>(
            <label key={index}>{names[label]}: <input type="text" data-name={label} value={main[label]} onChange={this.handleChange}/></label>
        ))}
      </div>
    )
  }
}

export default EditPopupMain
