import React, {Component} from 'react'

class EditPopupMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPublished: true,
      ...this.props.main
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const name = event.target.getAttribute('data-name')
    const value = event.target.value
    const {onChange} = this.props

    console.log(value)

    this.setState({ [name]: value })

    if(typeof onChange === "function") {
      onChange("main", name, value)
    }
  }

  handleCheckbox = (event) => {
    const {main, onChange} = this.props

    this.setState(prev => {
      const value = !prev.isPublished

      if(typeof onChange === "function") {
        onChange("main", "isPublished", value)
      }
      return {isPublished: value}
    })
  }

  render() {
    const main = this.state
    const {names} = this.props

    console.log(main)

    return (
      <div>
        {Object.getOwnPropertyNames(main).filter(el => el !== 'logo' && el !== 'special_label' && el !== 'isPublished').map((label, index) =>(
          <label key={index}>{names[label]}: <input type="text" data-name={label} value={main[label]} onChange={this.handleChange}/></label>
        ))}
        <div className="checkbox-module">
          <label className={main.isPublished ? "active" : ""}>
            <input name="isPublished" onChange={this.handleCheckbox} type="checkbox"/>
            Опубликовать
          </label>
        </div>
      </div>
    )
  }
}

export default EditPopupMain
