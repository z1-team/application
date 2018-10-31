import React, {Component} from 'react'

class SearchModule extends Component {
	render() {
		return (
			<div className="search-module">
				<h4>Спецпредложения <a href="#">Убрать</a></h4>
				{this.props.form &&
					<form action="#">
						<input type="text"/>
						<button></button>
					</form>
				}
				{this.props.checkbox &&
					<div className="checkbox-module">
						<input id="searchCategoryId-1" type="checkbox"/>
						<label htmlFor="searchCategoryId-1">0% первый заем {this.props.counter ? <span>159</span> : ''}</label>
					</div>
				}
			</div>
		)
	}
}

export default SearchModule