import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Intro extends Component {
	render() {
		return (
			<div className="wr-intro">
				<div className="container">
					<div className="intro">
						<header>
							<figure>
								<img src="img/logo.png" />
							</figure>
							<ul>
								<li><Link to="mfo">Микрозаймы</Link></li>
								<li><Link to="cards">Кредитные карты</Link></li>
								<li><Link to="credits">Кредиты</Link></li>
							</ul>
						</header>
						<section>
							<h1>Самые быстрые <span><strong>заемы</strong> и <strong>кредиты</strong></span></h1>
							<h2>Отдолжить до зп!</h2>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

export default Intro