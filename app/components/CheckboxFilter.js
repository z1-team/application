import React, {Component} from 'react'

const labelClass = (isChecked, isActual) => (
	isActual ? isChecked ? 'active' : '' : 'disabled'
)

class CheckboxFilter extends Component {
	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange({target}) {
		const index = parseInt(target.getAttribute('data-index'))
		const {value, name, onChange} = this.props

		if(typeof onChange === 'function') {
			onChange(name, value.map((v, i) => (i === index ? !v : v)))
		}
	}

	render() {
		const {items, value, actual} = this.props

		return (
			<div className="checkbox-module">
				{items.map((title, index) => (
					<label
						key={index}
						className={labelClass(value[index], actual !== null ? actual[index] > 0 : true)}
					>
						<input data-index={index} onChange={this.handleChange} type="checkbox"/>{title}
						<span>{actual ? actual[index] : ''}</span>
					</label>
				))}
			</div>
		)
	}
}

export default CheckboxFilter
