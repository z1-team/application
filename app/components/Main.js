import React, {Component} from 'react'
import Sidebar from './Sidebar'
import Results from './Results'
import {
  Route
} from 'react-router-dom'

class Main extends Component {
	render() {
		return (
			<div className="wr-main">
				<div className="container">
					<div className="main">
						{/*<Sidebar />*/}
						<Route path="/:id" component={Results} />
					</div>
				</div>
			</div>
		)
	}
}

export default Main