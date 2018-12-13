import React, {Component} from 'react'

class EditPopupRange extends Component {
  constructor(props) {
    super(props)

    this.state = {
      valueFrom: props.values[0],
      valueTo: props.values[1]
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {valueFrom, valueTo} = this.state
    const {onChange, name} = this.props

    if(typeof onChange === "function" &&  this.state !== prevState) {
      onChange("filter_values", name, [valueFrom, valueTo])
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = parseInt(event.target.value)

    this.setState({[name]: value})
  }

  render() {
    const {title} = this.props
    const {valueFrom, valueTo} = this.state

    return (
      <div className="popup-filter_range">
        <h3>{title}</h3>
        <ul>
          <li>
            <label>От: <input onChange={this.handleChange} type="number" name="valueFrom" value={valueFrom} /></label>
          </li>
          <li>
            <label>До: <input onChange={this.handleChange} type="number" name="valueTo" value={valueTo} /></label>
          </li>
        </ul>
      </div>
    )
  }
}

export default EditPopupRange
