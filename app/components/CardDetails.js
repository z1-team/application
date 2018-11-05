import React, {Component} from 'react'

class CardDetails extends Component {
	render() {
	const {details} = this.props;

		return (
			<div className="details">
				<ul>
					{details.hasOwnProperty('minSumm') && details.minSumm != '' && <li>Минимальная сумма: <strong>{details.minSumm}</strong></li>}
					{details.hasOwnProperty('maxSumm') && details.maxSumm != '' && <li>Максимальная сумма: <strong>{details.maxSumm}</strong></li>}
					{details.hasOwnProperty('minPercent') && details.minPercent != '' && <li>Минимальная процентная ставка: <strong>{details.minPercent}</strong></li>}
					{details.hasOwnProperty('maxPercent') && details.maxPercent != '' && <li>Максимальная процентная ставка: <strong>{details.maxPercent}</strong></li>}
					{details.hasOwnProperty('minTerm') && details.minTerm != '' && <li>Минимальный срок: <strong>{details.minTerm}</strong></li>}
					{details.hasOwnProperty('maxTerm') && details.maxTerm != '' && <li>Максимальный срок: <strong>{details.maxTerm}</strong></li>}
					{details.hasOwnProperty('appProcessTime') && details.appProcessTime != '' && <li>Время рассмотрения заявки: <strong>{details.appProcessTime}</strong></li>}
					{details.hasOwnProperty('getMoneyTime') && details.getMoneyTime != '' && <li>Время получения денег: <strong>{details.getMoneyTime}</strong></li>}
					{details.hasOwnProperty('paySystem') && details.paySystem != '' && <li>Платежная система: <strong>{details.paySystem}</strong></li>}
					{details.hasOwnProperty('cardType') && details.cardType != '' && <li>Тип карты: <strong>{details.cardType}</strong></li>}
					{details.hasOwnProperty('validity') && details.validity != '' && <li>Срок действия: <strong>{details.validity}</strong></li>}
					{details.hasOwnProperty('maxLimit') && details.maxLimit != '' && <li>Максимальный лимит: <strong>{details.maxLimit}</strong></li>}
					{details.hasOwnProperty('minLimit') && details.minLimit != '' && <li>Минимальный лимит: <strong>{details.minLimit}</strong></li>}
					{details.hasOwnProperty('interestRate') && details.interestRate != '' && <li>Процентная ставка: <strong>{details.interestRate}</strong></li>}
					{details.hasOwnProperty('maintenanceСost') && details.maintenanceСost != '' && <li>Стоимость обслуживания: <strong>{details.maintenanceСost}</strong></li>}
					{details.hasOwnProperty('gracePeriod') && details.gracePeriod != '' && <li>Льготный период: <strong>{details.gracePeriod}</strong></li>}
				</ul>
				<ul>
					{details.hasOwnProperty('penalty') && details.penalty != '' && <li>Штраф за неуплату: <strong>{details.penalty}</strong></li>}
					{details.hasOwnProperty('incomeProof') && details.incomeProof != '' && <li>Подтверждение дохода: <strong>{details.incomeProof}</strong></li>}
					{details.hasOwnProperty('regionRegistr') && details.regionRegistr != '' && <li>Прописка в регионе банка: <strong>{details.regionRegistr}</strong></li>}
					{details.hasOwnProperty('identification') && details.identification != '' && <li>Идентификация: <strong>{details.identification}</strong></li>}
					{details.hasOwnProperty('age') && details.age != '' && <li>Возраст: <strong>{details.age}</strong></li>}
					{details.hasOwnProperty('obtainingMethods') && details.obtainingMethods != '' && <li>Способы получения: <strong>{details.obtainingMethods}</strong></li>}
					{details.hasOwnProperty('repaymentOptions') && details.repaymentOptions != '' && <li>Способы погашения: <strong>{details.repaymentOptions}</strong></li>}
					{details.hasOwnProperty('commission') && details.commission != '' && <li>Комиссия за снятие наличных: <strong>{details.commission}</strong></li>}
					{details.hasOwnProperty('cashback') && details.cashback != '' && <li>Кэшбэк: <strong>{details.cashback}</strong></li>}
					{details.hasOwnProperty('minPayment') && details.minPayment != '' && <li>Минимальный платеж: <strong>{details.minPayment}</strong></li>}
					{details.hasOwnProperty('considerationTime') && details.considerationTime != '' && <li>Время рассмотрения: <strong>{details.considerationTime}</strong></li>}
					{details.hasOwnProperty('delivery') && details.delivery != '' && <li>Доставка карты: <strong>{details.delivery}</strong></li>}
					{details.hasOwnProperty('deliveryTime') && details.deliveryTime != '' && <li>Срок доставки: <strong>{details.deliveryTime}</strong></li>}
				</ul>
				<ul>
					{details.hasOwnProperty('creditHistory') && details.creditHistory != '' && <li>Кредитная история: <strong>{details.creditHistory}</strong></li>}
					{details.hasOwnProperty('creditHistoryImprovement') && details.creditHistoryImprovement != '' && <li>Улучшение кредитной истории: <strong>{details.creditHistoryImprovement}</strong></li>}
					{details.hasOwnProperty('schedule') && details.schedule != '' && <li>График работы: <strong>{details.schedule}</strong></li>}
					{details.hasOwnProperty('personalArea') && details.personalArea != '' && <li>Личный кабинет: <strong>{details.personalArea}</strong></li>}
					{details.hasOwnProperty('smsInfo') && details.smsInfo != '' && <li>Смс-информирование: <strong>{details.smsInfo}</strong></li>}
					{details.hasOwnProperty('chipAvailability') && details.chipAvailability != '' && <li>Наличие чипа: <strong>{details.chipAvailability}</strong></li>}
					{details.hasOwnProperty('contactlessPayment') && details.contactlessPayment != '' && <li>Бесконтактная оплата: <strong>{details.contactlessPayment}</strong></li>}
					{details.hasOwnProperty('secure3D') && details.secure3D != '' && <li>3D Secure: <strong>{details.secure3D}</strong></li>}
					{details.hasOwnProperty('supplyDepartment') && details.supplyDepartment != '' && <li>OPC: <strong>{details.supplyDepartment}</strong></li>}
					{details.hasOwnProperty('application') && details.application != '' && <li>Приложение: <strong>{details.application}</strong></li>}
					{details.hasOwnProperty('internetBank') && details.internetBank != '' && <li>Интернет-банк: <strong>{details.internetBank}</strong></li>}
				</ul>
			</div>
		)
	}
}

export default CardDetails