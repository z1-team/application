import React, {Component} from 'react'
import FilterController from './FilterController'
import Results from './Results'

class Main extends Component {
	render() {
		const {category, url} =this.props
		return (
			<div className="wr-main">
				<div className="container">
					<div className="main">
						{/* <FilterController /> */}
						<Results category={category} url={url} />
					</div>
				</div>
			</div>
		)
	}
}

export default Main
