import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Footer extends Component {
	render() {
		return (
			<div className="wr-footer">
				<div className="container">
					<div className="footer">
						<a href="#" className="logo"><img src="img/logo-footer.png"/></a>
						{/*
						<ul className="socials">
							<li>
								<a href="#"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
							</li>
							<li>
								<a href="#"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
							</li>
							<li>
								<a href="#"><FontAwesomeIcon icon={['fab', 'google-plus-g']} /></a>
							</li>
							<li>
								<a href="#"><FontAwesomeIcon icon={['fab', 'pinterest-p']} /></a>
							</li>
						</ul>
						*/}
						<small>&copy; 2018 Moneyonline | Все права защищены</small>
					</div>
				</div>
			</div>
		)
	}
}

export default Footer