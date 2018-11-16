import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import app from '../core/app'

import { withRouter } from "react-router";

class Intro extends Component {
	getBackground() {
		const url = this.props.location.pathname

		switch(url) {
			case "/mfo":
				return "wr-intro mfo"
			case "/cards":
				return "wr-intro cards"
			// case "/credits":
			// 	return "wr-intro credits"
			case "/about":
				return "wr-intro inner"
			case "/confidentiality":
				return "wr-intro inner"
			default:
				return "wr-intro"
		}
	}

	getTitle() {
		const url = this.props.location.pathname
    const keyword = app.getQuery().utm_term || 'займ'

		switch(url) {
			case "/mfo":
				return (
					<section>
						<h1>Ищите <strong>{keyword}</strong>?</h1>
						<h2>Быстро. Надежно. Онлайн</h2>
					</section>
				)
			case "/cards":
				return (
					<section>
						<h1>Выгодные <span><strong>Кредитные Карты</strong></span></h1>
						<h2>Лучшие Предложения Банков</h2>
					</section>
				)
			// case "/credits":
			// 	return (
			// 		<section>
			// 			<h1><span><strong>Кредиты</strong></span> на любые цели</h1>
			// 			<h2>Все Банки в одном месте</h2>
			// 		</section>
			// 	)
			case "/about":
				return false
			case "/confidentiality":
				return false
			default:
				return false
		}
	}

	renderRedirect() {
		const url = this.props.location.pathname

		if (url == "" || url == undefined || url == "/") {
			return <Redirect exact from="/" to="/mfo" />
		}
	}

	render() {
		const { match, location, history } = this.props;
		const url = location.pathname

		return (
			<div className={this.getBackground()}>
				{this.renderRedirect()}
				<div className="container">
					<div className="intro">
						<header>
							<figure>
								<img src="img/logo.png" />
							</figure>
							<ul>
								<li><Link className={url === "/mfo" ? "active" : ""} to="mfo">Микрозаймы</Link></li>
								<li><Link className={url === "/cards" ? "active" : ""} to="cards">Кредитные карты</Link></li>
								{/*<li><Link className={url === "/credits" ? "active" : ""} to="credits">Кредиты</Link></li>*/}
							</ul>
						</header>
						{this.getTitle()}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Intro)
