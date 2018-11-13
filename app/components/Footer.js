import React, {Component} from 'react'

class Footer extends Component {
	render() {
		return (
			<div className="wr-footer">
				<div className="container">
					<div className="footer">
						<span className="logo"><img src="img/logo-footer.png"/></span>
						{/*
						<ul className="socials">
							<li>
								<a href="#"><i></i></a>
							</li>
							<li>
								<a href="#"><i></i></a>
							</li>
							<li>
								<a href="#"><i></i></a>
							</li>
							<li>
								<a href="#"><i></i></a>
							</li>
						</ul>
						*/}
						<small>&copy; 2018 Moneyonline. Информация, предоставленная на сайте, носит ознакомительный характер. Реальные предложения организаций могут отличаться.</small>
					</div>
				</div>
			</div>
		)
	}
}

export default Footer