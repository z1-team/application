
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import { withRouter } from "react-router";

import { resetSortPartner } from '../actions'

const mapStateToProps = ({session}) => ({
  keyword: session.query && session.query.utm_term ?
    session.query.utm_term : 'Займ'
})

class Intro extends Component {
	constructor(props) {
		super(props)
	}
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
    const {keyword} = this.props

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
			default:
				return false
		}
	}

	renderRedirect() {
		const {pathname: url, search} = this.props.location

		if (url == "" || url == undefined || url == "/") {
			return <Redirect exact from="/" to={{
        pathname: '/mfo',
        search
      }}/>
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
								<img src="/img/logo.png" />
							</figure>
						</header>
						{this.getTitle()}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps)(Intro))
