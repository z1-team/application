import React, {Component} from 'react'

class SearchModule extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		const {name, onChange} = this.props

		if(typeof onChange === 'function') {
			onChange(name, null)
		}
	}

	render() {
		const {title, children} = this.props;

		return (
			<div className="search-module">
				<h4>{title} <button onClick={this.handleClick}><i className="fas fa-window-close"></i></button></h4>
				{children}
			</div>
		)
	}
}

export default SearchModule
