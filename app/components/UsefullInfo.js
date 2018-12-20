import React, {Component} from 'react'
import {
	Link
} from 'react-router-dom'
import { withRouter } from "react-router";

class UsefullInfo extends Component {

	handleClick = (event) => {
		window.scrollTo({
			top: 0
		})
	}

	render() {
		const { match, location, history } = this.props;
		const url = location.pathname

		return (
			<div className="wr-usefull-info">
				<div className="container">
					<div className="usefull-info">
						<div className="links">
							{/*<h3>Moneyonline</h3>*/}
							<ul>
								<li>
									<Link onClick={this.handleClick} className={url === "/about" ? "active" : ""} to="/about">Подробнее о проекте</Link>
								</li>
								{/*<li>
									<a href="#">Почему мы?</a>
								</li>
								<li>
									<a href="#">Служба поддержки</a>
								</li>
								<li>
									<a href="#">Добавить организацию</a>
								</li>
								<li>
									<a href="#">Соглашение</a>
								</li>*/}
								<li>
									<Link onClick={this.handleClick} className={url === "/confidentiality" ? "active" : ""} to="/confidentiality">Конфиденциальность</Link>
								</li>
								{/*<li>
									<a href="#">Отказ от гарантии</a>
								</li>
								<li>
									<a href="#">Реклама</a>
								</li>*/}
							</ul>
						</div>
						{/*
						<div className="feedback">
							<h3>Нужна помощь?</h3>
							<form action="#">
								<select>
									<option>Выберите вариант</option>
									<option value="1">Я должен денег</option>
									<option value="2">Я должен денег</option>
									<option value="3">Я должен денег</option>
								</select>
								<select>
									<option>Выберите вариант</option>
									<option value="1">Я должен денег</option>
									<option value="2">Я должен денег</option>
									<option value="3">Я должен денег</option>
								</select>
								<div className="input-module">
									<input type="text" placeholder="Ваш email" />
									<button>Отправить</button>
								</div>
							</form>
						</div>
						<div className="effects">
							<h3>Последствия невыплаты займа</h3>
							<p>В случае просрочки по выплатам, со следующего дня после истечения срока займа, вам будет ежедневно начисляться пеня в размере 0,05-1% в день от суммы кредита.
							Также будет продолжаться ежедневное начисление процентов за пользование займом по договору и возможно начисление фиксированной комиссии.
							Лица, которые грубо нарушают сроки выплат по своим кредитам, могут попасть в реестр должников, что очень сильно осложнит им получение любых кредитных услуг в будущем.
							Сами проблемные долги могут быть переданы коллекторским агентствам, занимающимся их взысканием.
							Напротив, своевременные выплаты по всем кредитам – залог формирования положительной кредитной истории, что открывает возможности в дальнейшем получить со стороны банков более выгодные предложения.
							Следите за уведомлениями, которые кредиторы отправляют вам накануне наступления срока платежа. Точные данные следует уточнять у кредиторов.
							Взыскание долгов осуществляется посредством телефонных звонков, уведомлений по СМС и электронной почте, как заемщика, так и контактного лица.</p>
						</div>
						*/}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(UsefullInfo)
