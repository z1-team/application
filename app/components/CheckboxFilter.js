import React, {Component} from 'react'

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
		const {items, value} = this.props

		return (
			<div className="checkbox-module">
				{items.map((title, index) => (
					<label key={index} className={value[index] ? 'active' : ''}><input data-index={index} onChange={this.handleChange} type="checkbox"/>{title}<span></span></label>
				))}
			</div>
		)
	}
}

export default CheckboxFilter