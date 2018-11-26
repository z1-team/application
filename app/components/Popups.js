import React, {Component} from 'react'

import CategoriesController from './CategoriesController'

import {openPopup, closePopup, login} from '../actions'

class Popups extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login: '',
			pass: '',
			tab: {
				main: true,
				details: false,
				categories: false
			}
		}

		this.closePopup = this.closePopup.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.changeTab = this.changeTab.bind(this)
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

	changeTab(event) {
		event.preventDefault()

		const button = event.target
		const newTab = button.getAttribute('data-tab')

		switch(newTab) {
			case 'main':
				return this.setState({tab: { main: true, details: false, categories: false }})
			case 'details':
				return this.setState({tab: { main: false, details: true, categories: false }})
			case 'categories':
				return this.setState({tab: { main: false, details: false, categories: true }})
			default:
				return state
		}
	}

	render() {
		const {popups} = this.props
		const {login, pass} = this.state
		const {main, details, categories} = this.state.tab

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
						<button>Войти</button>
					</form>
				</div>
				<div className={popups.edit ? "popup edit active" : "popup edit"}>
					<form action="#">
						<header>
							<h3>Редактирование карточки <strong>партнера</strong></h3>
							<button onClick={this.closePopup}></button>
						</header>
						<section>
							<ul className="tabs">
								<li>
									<button onClick={this.changeTab} data-tab="main" className={main ? 'active' : undefined}>Основное</button>
								</li>
								<li>
									<button onClick={this.changeTab} data-tab="details" className={details ? 'active' : undefined}>Подробнее</button>
								</li>
								<li>
									<button onClick={this.changeTab} data-tab="categories" className={categories ? 'active' : undefined}>Категории</button>
								</li>
							</ul>
							<div className={main ? 'card-main active' : 'card-main'}>
								<figure>
									<img src="img/kredito24-logo.png" />
									<figcaption>
										<i className="fas fa-upload"></i>
									</figcaption>
								</figure>
								<div>
									<label>Название карточки: <input type="text"/></label>
									<label>Сумма займа: <input type="text"/></label>
									<label>Срок займа: <input type="text"/></label>
									<label>Ставка: <input type="text"/></label>
									<label>Ссылка: <input type="text"/></label>
								</div>
							</div>
							<div className={details ? 'card-details active' : 'card-details'}>
								<ul>
									<li>
										<label>Минимальная сумма (руб.): <input type="text"/></label>
										<input type="text" placeholder="Дополнительная информация"/>
									</li>
									<li>
										<label>Максимальная сумма (руб.): <input type="text"/></label>
										<input type="text" placeholder="Дополнительная информация"/>
									</li>
									<li>
										<label>Минимальная сумма (руб.): <input type="text"/></label>
										<input type="text" placeholder="Дополнительная информация"/>
									</li>
									<li>
										<label>Минимальная сумма (руб.): <input type="text"/></label>
										<input type="text" placeholder="Дополнительная информация"/>
									</li>
									<li>
										<label>Минимальная сумма (руб.): <input type="text"/></label>
										<input type="text" placeholder="Дополнительная информация"/>
									</li>
									<li>
										<label>Минимальная сумма (руб.): <input type="text"/></label>
										<input type="text" placeholder="Дополнительная информация"/>
									</li>
									<li>
										<label>Минимальная сумма (руб.): <input type="text"/></label>
										<input type="text" placeholder="Дополнительная информация"/>
									</li>
									<li>
										<label>Минимальная сумма (руб.): <input type="text"/></label>
										<input type="text" placeholder="Дополнительная информация"/>
									</li>
								</ul>
							</div>
							<div className={categories ? 'card-categories active' : 'card-categories'}>
								<ul>
									<li>
										<label>С плохой кред. историей<input type="checkbox"/></label>
									</li>
									<li>
										<label>Онлайн<input type="checkbox"/></label>
									</li>
									<li>
										<label>Быстрые<input type="checkbox"/></label>
									</li>
									<li>
										<label>С мгновенным одобрением<input type="checkbox"/></label>
									</li>
									<li>
										<label>Срочные<input type="checkbox"/></label>
									</li>
									<li>
										<label>Экспресс<input type="checkbox"/></label>
									</li>
									<li>
										<label>Круглосуточно<input type="checkbox"/></label>
									</li>
									<li>
										<label>Наличными<input type="checkbox"/></label>
									</li>
								</ul>
							</div>
						</section>
						<footer>
							<ul>
								<li>
									<button>Сохранить</button>
								</li>
								<li>
									<button>Удалить</button>
								</li>
							</ul>
							<button>Отмена</button>
						</footer>
					</form>
				</div>
			</div>
		)
	}
}

export default Popups
