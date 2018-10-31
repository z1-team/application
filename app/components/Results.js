import React, {Component} from 'react'

class Results extends Component {
	render() {
		return (
			<div className="results">
				<h2>Рейтинг микрокредитов <em>Рунета 2018 года</em></h2>
				<div className="sort">
					<p>СОРТИРОВАТЬ:</p>
					<ul>
						<li>
							<a href="#">ПО РЕЙТИНГУ</a>
						</li>
						<li>
							<a href="#">ПО СУММЕ</a>
						</li>
						<li>
							<a href="#">ПО СРОКАМ</a>
						</li>
						<li>
							<a href="#">ПО ПРОЦЕНТНОЙ СТАВКЕ</a>
						</li>
					</ul>
				</div>
				<div className="list">
					<div className="result-item">
						<section>
							<figure>
								<img src="img/partners-logo-1.png" />
							</figure>
							<div className="info">
								<h3>Online-zaim (Займы для мужчин)</h3>
								<div className="rating">
									<ul>
										<li></li>
										<li></li>
										<li></li>
										<li></li>
										<li></li>
									</ul>
									<p><a href="#">22 отзыва</a> (4.1 из 5)</p>
								</div>
								<ul className="pros">
									<li><i></i><strong>10 000</strong> руб.</li>
									<li><i></i><strong>25</strong> дней</li>
									<li><i></i><strong>1,8%</strong> в день</li>
								</ul>
							</div>
							<div className="process">
								<a href="#">Оформить</a>
								<p>переплата 4 500 руб.</p>
							</div>
						</section>
						<footer>
							<div className="details">
								<ul>
									<li>Сумма: <strong>от 3 500 до 10 000 руб.</strong></li>
									<li>Сроком: <strong>от 6 до 25 дней</strong></li>
									<li>Ставка: <strong>1.8% в день</strong></li>
									<li>Возраст: <strong>от 18 лет</strong></li>
									<li>Рассмотрения заявки:<strong>24 ч.</strong></li>
									<li>Чаще берут: <strong>до ЗП</strong></li>
								</ul>
								<ul>
									<li>Документы: <strong>паспорт, телефон</strong></li>
									<li>Выплаты: <strong>моментально</strong></li>
									<li>Работает: <strong>круглосуточно</strong></li>
									<li>Плохая КИ: <strong>нет</strong></li>
									<li>Продление: <strong>есть</strong></li>
									<li>Год: <strong>2012</strong></li>
								</ul>
								<ul>
									<li>Способы выплат:</li>
									<li>Способы погашения:</li>
								</ul>
							</div>
							<ul>
								<li>0% первый заем.</li>
								<li><a href="#">Подробнее <img src="img/more.png"/></a></li>
							</ul>
						</footer>
					</div>
				</div>
				<div className="pagination">
					<ul>
						<li>
							<a href="#">Пред.</a>
						</li>
						<li>
							<a href="#">1</a>
						</li>
						<li>
							<a href="#">2</a>
						</li>
						<li class="active">
							<a href="#">3</a>
						</li>
						<li>
							<a href="#">4</a>
						</li>
						<li>
							<a href="#">5</a>
						</li>
						<li>
							<a href="#">След.</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Results