import React, {Component} from 'react'

class PopupFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {title, names, values} = this.props
    
    return (
      <div className="popup-filter">
        <h3>{title}</h3>
        <ul>
          {names.map((name, index) => (
            <li key={index}>
    					<label className={values[index] ? 'active' : ''}><input data-index={index} onChange={this.handleChange} type="checkbox"/>{name}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PopupFilter
