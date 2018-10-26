import React, {Component} from 'react'

class ListResults extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [
				{
					imgSrc: "img/logo.svg",
					percent: "1,93%",
					toAge: "324.000 руб.",
					timing: "20 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "0,93%",
					toAge: "24.000 руб.",
					timing: "50 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "0,55%",
					toAge: "50.000 руб.",
					timing: "10 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "2,93%",
					toAge: "500.000 руб.",
					timing: "1 час 30 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "1,93%",
					toAge: "324.000 руб.",
					timing: "20 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "0,93%",
					toAge: "24.000 руб.",
					timing: "50 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "0,55%",
					toAge: "50.000 руб.",
					timing: "10 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "2,93%",
					toAge: "500.000 руб.",
					timing: "1 час 30 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "1,93%",
					toAge: "324.000 руб.",
					timing: "20 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "0,93%",
					toAge: "24.000 руб.",
					timing: "50 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "0,55%",
					toAge: "50.000 руб.",
					timing: "10 минут"
				},
				{
					imgSrc: "img/logo.svg",
					percent: "2,93%",
					toAge: "500.000 руб.",
					timing: "1 час 30 минут"
				}
			]
		}
	}

	render() {
		const listResult = this.state

		return (
			<div className="list active">
				<a href="#" className="js-listShowHide">Пенсионерам <span>(128)</span></a>
				<ul>
					{listResult.items.map((item) => (
						<li>
							<header>
								<figure>
									<img src={item.imgSrc} />
								</figure>
								<p><strong>{item.percent}</strong> в день</p>
							</header>
							<section>
								<ul>
									<li>к возврату: <span>{item.toAge}</span></li>
									<li>рассмотрение: <span>{item.timing}</span></li>
								</ul>
								<a href="#">Оформить <i className="icon plus"></i></a>
							</section>
						</li>
					))}
				</ul>
			</div>
		)

	}
}

export default ListResults