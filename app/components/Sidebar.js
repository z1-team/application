import React, {Component} from 'react'

import SearchModule from './SearchModule'

class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar">
				<p><strong>152</strong> <span>микрозайма</span> найдено в <span>Москве, Площадь Ленина</span></p>
				<SearchModule title="Спецпредложения">
					<form action="#">
						<input type="text"/>
						<button></button>
					</form>
				</SearchModule>
				<SearchModule form="true" />
				<SearchModule checkbox="true" />
				<SearchModule counter="true" checkbox="true" />
				<SearchModule counter="true" checkbox="true" />
			</div>
		)
	}
}

export default Sidebar