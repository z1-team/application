import React, {Component} from 'react'

class Header extends Component {
	render() {
		return (
			<div className="wr-header">
				<div className="container">
					<div className="header">
						<div className="info active">
							<header>
								<p>Микрозайм для мужчин <strong>от 24 до 27</strong> с города <strong>Смоленска</strong>, кто расстался с подружкой и нужно денег <strong>до ЗП</strong></p>
							</header>
							<section>
								<a href="#"><i className="icon arrow-left"></i></a>
								<ul>
									<li><i className="icon money"></i><p>до <strong>200.000</strong> руб.</p></li>
									<li><i className="icon calendar"></i><p>на <strong>50</strong> дней</p></li>
								</ul>
							</section>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Header