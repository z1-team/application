import React, {Component} from 'react'

import {subscribeEmail} from '../actions'

class EmailPopups extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: ''
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()

		const { dispatch } = this.props
		const { email } = this.state

		dispatch(subscribeEmail(email))
	}

	handleChange = (event) => {
		const value = event.target.value

		this.setState({email: value})
	}

	render() {
		const { email } = this.state
		return (
			<div>
				<figure>
					<img src="/img/email-catcher.png"/>
				</figure>
				<form action="#" onSubmit={this.handleSubmit}>
					<p>Подпишитесь чтобы активировать предложение</p>
					<input type="email" placeholder="Ваш email" onChange={this.handleChange} value={email} />
					<button>Получить купон</button>
				</form>
			</div>
		)
	}
}

export default EmailPopups
