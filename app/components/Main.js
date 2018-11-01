import React, {Component} from 'react'
import Sidebar from './Sidebar'
import Results from './Results'

class Main extends Component {
	render() {
		return (
			<div className="wr-main">
				<div className="container">
					<div className="main">
						{/* <Sidebar /> */}
						<Results />
					</div>
				</div>
			</div>
		)
	}
}

export default Main