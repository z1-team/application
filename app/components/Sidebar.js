import React, {Component} from 'react'

import SearchModule from './SearchModule'

class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar">
				<p><strong>152</strong> <span>микрозайма</span> найдено в <span>Москве, Площадь Ленина</span></p>
				<SearchModule form="true" />
				<SearchModule checkbox="true" />
				<SearchModule counter="true" checkbox="true" />
				<SearchModule counter="true" checkbox="true" />
			</div>
		)
	}
}

export default Sidebar