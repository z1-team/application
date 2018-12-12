import React, {Component} from 'react'

class EmailPopups extends Component {
	render() {

		return (
			<div>
				<figure>
					<img src="/img/email-catcher.png"/>
				</figure>
				<form action="#">
					<p>Подпишитесь чтобы активировать предложение</p>
					<input type="text" placeholder="Ваш email"/>
					<button>Получить купон</button>
				</form>
			</div>
		)
	}
}

export default EmailPopups
