import React, {Component} from 'react'

import CategoriesController from './CategoriesController'
import EditPopup from './EditPopup'
import EmailPopup from './EmailPopup'

import {openPopup, closePopup, login} from '../actions'

class Popups extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login: '',
			pass: ''
		}

		this.closePopup = this.closePopup.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	isOpened() {
		const {popups} = this.props

		return Object.getOwnPropertyNames(popups).some(p => popups[p])
	}

	closePopup(event) {
		event.preventDefault()

		this.props.dispatch(closePopup())
	}

	handleLogin(event) {
		event.preventDefault()
		const {login: l, pass} = this.state

		this.props.dispatch(login(l, pass))
	}

	handleChange(event) {
		const input = event.target
		this.setState({[input.name]: input.value})
	}

	render() {
		const {popups, partner, dispatch, error} = this.props
		const {login, pass} = this.state
		const url = this.props.location.pathname

		return (
			<div className={this.isOpened() ? "popups active" : "popups"}>
				<div className="overlay" onClick={this.closePopup}></div>
				<div className={popups.categories ? "popup categories active" : "popup categories"}>
					<CategoriesController/>
				</div>
				<div className={popups.login ? "popup login active" : "popup login"}>
					<h2>Авторизация</h2>
					<form action="#" onSubmit={this.handleLogin}>
						<label>Логин: <input type="text" name="login" onChange={this.handleChange} value={login} /></label>
						<label>Пароль: <input type="password" name="pass" onChange={this.handleChange} value={pass} /></label>
						{error && <p>Не верно введен логин или пароль.</p>}
						<button>Войти</button>
					</form>
				</div>
				<div className={popups.edit ? "popup edit active" : "popup edit"}>
					<EditPopup partner={partner} key={partner ? partner.id : -1} dispatch={dispatch} url={url} />
				</div>
				<div className={popups.email ? "popup email active" : "popup email"}>
					<a href="#" className="close-popup" onClick={this.closePopup}></a>
					<EmailPopup />
				</div>
			</div>
		)
	}
}

export default Popups
