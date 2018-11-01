import React, {Component} from 'react'

class CardDetails extends Component {
	render() {
	const {details} = this.props;

		return (
			<div className="details">
				<ul>
					<li>Минимальная сумма: <strong>{details.minSumm}</strong></li>
					<li>Максимальная сумма: <strong>{details.maxSumm}</strong></li>
					<li>Минимальная процентная ставка: <strong>{details.minPercent}</strong></li>
					<li>Максимальная процентная ставка: <strong>{details.maxPercent}</strong></li>
					<li>Минимальный срок: <strong>{details.minTerm}</strong></li>
					<li>Максимальный срок: <strong>{details.maxTerm}</strong></li>
					<li>Время рассмотрения заявки: <strong>{details.appProcessTime}</strong></li>
					<li>Время получения денег: <strong>{details.getMoneyTime}</strong></li>
				</ul>
				<ul>
					<li>Штраф за неуплату: <strong>{details.penalty}</strong></li>
					<li>Подтверждение дохода: <strong>{details.incomeProof}</strong></li>
					<li>Прописка в регионе банка: <strong>{details.regionRegistr}</strong></li>
					<li>Идентификация: <strong>{details.identification}</strong></li>
					<li>Возраст: <strong>{details.age}</strong></li>
					<li>Способы получения: <strong>{details.obtainingMethods}</strong></li>
					<li>Способы погашения: <strong>{details.repaymentOptions}</strong></li>
				</ul>
				<ul>
					<li>Кредитная история: <strong>{details.creditHistory}</strong></li>
					<li>График работы: <strong>{details.schedule}</strong></li>
					<li>Личный кабинет: <strong>{details.personalArea}</strong></li>
					<li>Приложение: <strong>{details.application}</strong></li>
				</ul>
			</div>
		)
	}
}

export default CardDetails