import React, {Component} from 'react'
import RadioFilter from './RadioFilter'

class EditPopupSpecials extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value ? props.value : null
    }
  }
  handleChange = ({target}) => {
		const {onChange, value} = this.props
    const current = value ? value : null
    const newValue = target.name !== value ? target.name : null
    if(typeof onChange === 'function') {
      onChange("main", "special_label", newValue)
    }

    this.setState({value: newValue})
	}

  render() {
    const { value } = this.state

    return (
      <div className="specials">
        <h3>Спецпредложения</h3>
        <div className="checkbox-module">
          <label className={value === "big_summ" ? "active" : ""}>
            <input name="big_summ" onChange={this.handleChange} type="checkbox"/>
            На Большую Сумму
          </label>
          <label className={value === "long_term" ? "active" : ""}>
            <input name="long_term" onChange={this.handleChange} type="checkbox"/>
            На Долгий Период
          </label>
          <label className={value === "quick_solution" ? "active" : ""}>
            <input name="quick_solution" onChange={this.handleChange} type="checkbox"/>
            Быстрое Решение
          </label>
          <label className={value === "recommend" ? "active" : ""}>
            <input name="recommend" onChange={this.handleChange} type="checkbox"/>
            Рекомендуют
          </label>
        </div>
      </div>
    )
  }
}

export default EditPopupSpecials
