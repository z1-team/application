import React, {Component} from 'react'
import Categories from './Categories'
import ListResults from './ListResults'

class Main extends Component {
	render() {
		return (
			<div className="wr-main">
				<div className="container">
					<div className="main">
						<Categories />
						<ListResults />
					</div>
				</div>
			</div>
		)
	}
}

export default Main