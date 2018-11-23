import React, {Component} from 'react'

import CategoriesController from './CategoriesController'

import {openPopup} from '../actions'
import {closePopup} from '../actions'

class Popups extends Component {
	constructor(props) {
		super(props)

		this.closePopup = this.closePopup.bind(this)
	}

	isOpened() {
		const {popups} = this.props

		for(let p in popups)
			if(popups[p]) return true

		return false
	}

	closePopup() {
		this.props.dispatch(closePopup('categories'))
	}

	render() {
		const {popups} = this.props

		return (
			<div className={this.isOpened() ? "popups active" : "popups"}>
				<div className="overlay" onClick={this.closePopup}></div>
				<div className={popups.categories ? "popup categories active" : "popup categories"}>
					<CategoriesController/>
				</div>
				{/*<div className={popups.login ? "popup login active" : "popup login"}>*/}
				<div className="popup login">
					<h2>Авторизация</h2>
					<form action="#">
						<label>Логин: <input type="text"/></label>
						<label>Пароль: <input type="text"/></label>
						<button>Войти</button>
					</form>
				</div>
				{/*<div className={popups.redact ? "popup redact active" : "popup redact"}>*/}
				<div className="popup redact active">
					<form action="#">
						<header>
							<h3>Редактирование карточки <strong>партнера</strong></h3>
							<button></button>
						</header>
						<section>
							<ul className="tabs">
								<li>
									<button className="active">Основные сведения</button>
								</li>
								<li>
									<button>Подробнее</button>
								</li>
								<li>
									<button>Категории</button>
								</li>
							</ul>
							<div className="card-main active">
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
							<div className="card-details active">
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
							<div className="card-categories active">
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