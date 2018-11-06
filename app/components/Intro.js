import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { withRouter } from "react-router";

class Intro extends Component {
	render() {
		const { match, location, history } = this.props;
		const url = location.pathname

		return (
			<div className="wr-intro">
				<div className="container">
					<div className="intro">
						<header>
							<figure>
								<img src="img/logo.png" />
							</figure>
							<ul>
								<li><Link className={url === "/mfo" ? "active" : ""} to="mfo">Микрозаймы</Link></li>
								<li><Link className={url === "/cards" ? "active" : ""} to="cards">Кредитные карты</Link></li>
								<li><Link className={url === "/credits" ? "active" : ""} to="credits">Кредиты</Link></li>
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

export default withRouter(Intro)