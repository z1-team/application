import React, {Component} from 'react'

class CategoriesList extends Component {
	render() {
		const {title, children} = this.props;

		return (
			<div>
				{title && <h2>{title}</h2>}
				<ul>
					{children}
				</ul>
			</div>
		)
	}
}

export default CategoriesList