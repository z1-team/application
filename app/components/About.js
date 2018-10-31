import React, {Component} from 'react'

class About extends Component {
	render() {
		return (
			<div className="wr-about">
				<div className="container">
					<div className="about">
						<ul>
							<li>
								<h4>24/7 поддержка клиентов</h4>
								<p>Наши консультанты окажут вам любую помощь по бесплатному телефону<br/>+7 (495) 666-55-44</p>
							</li>
							<li>
								<h4>Проверенные партнеры</h4>
								<p>Предложение не является офертой. Конечные условия уточняйте при прямом общении с кредиторами.</p>
							</li>
							<li>
								<h4>Полезная информация</h4>
								<p>Содержание информационных статей основано на субъективном мнении редакции нашего сайта.</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default About