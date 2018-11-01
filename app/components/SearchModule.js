import React, {Component} from 'react'

class SearchModule extends Component {
	render() {
		const {title, children} = this.props;

		return (
			<div className="search-module">
				<h4>{title} <a href="#">Убрать</a></h4>
				{children}
			</div>
		)
	}
}

export default SearchModule