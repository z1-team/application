import React, {Component} from 'react'

class CardDetails extends Component {
	render() {
	const {details} = this.props;

		return (
			<div className="details">
				<ul>
					{details.minSumm && <li>Минимальная сумма: <strong>{details.minSumm}</strong></li>}
					{details.maxSumm && details.maxSumm != '' && <li>Максимальная сумма: <strong>{details.maxSumm}</strong></li>}
					{details.minPercent && details.minPercent != '' && <li>Минимальная процентная ставка: <strong>{details.minPercent}</strong></li>}
					{details.maxPercent && details.maxPercent != '' && <li>Максимальная процентная ставка: <strong>{details.maxPercent}</strong></li>}
					{details.minTerm && details.minTerm != '' && <li>Минимальный срок: <strong>{details.minTerm}</strong></li>}
					{details.maxTerm && details.maxTerm != '' && <li>Максимальный срок: <strong>{details.maxTerm}</strong></li>}
					{details.appProcessTime && details.appProcessTime != '' && <li>Время рассмотрения заявки: <strong>{details.appProcessTime}</strong></li>}
					{details.getMoneyTime && details.getMoneyTime != '' && <li>Время получения денег: <strong>{details.getMoneyTime}</strong></li>}
					{details.paySystem && details.paySystem != '' && <li>Платежная система: <strong>{details.paySystem}</strong></li>}
					{details.cardType && details.cardType != '' && <li>Тип карты: <strong>{details.cardType}</strong></li>}
					{details.validity && details.validity != '' && <li>Срок действия: <strong>{details.validity}</strong></li>}
					{details.maxLimit && details.maxLimit != '' && <li>Максимальный лимит: <strong>{details.maxLimit}</strong></li>}
					{details.minLimit && details.minLimit != '' && <li>Минимальный лимит: <strong>{details.minLimit}</strong></li>}
					{details.interestRate && details.interestRate != '' && <li>Процентная ставка: <strong>{details.interestRate}</strong></li>}
					{details.maintenanceСost && details.maintenanceСost != '' && <li>Стоимость обслуживания: <strong>{details.maintenanceСost}</strong></li>}
					{details.gracePeriod && details.gracePeriod != '' && <li>Льготный период: <strong>{details.gracePeriod}</strong></li>}
				</ul>
				<ul>
					{details.penalty && details.penalty != '' && <li>Штраф за неуплату: <strong>{details.penalty}</strong></li>}
					{details.incomeProof && details.incomeProof != '' && <li>Подтверждение дохода: <strong>{details.incomeProof}</strong></li>}
					{details.regionRegistr && details.regionRegistr != '' && <li>Прописка в регионе банка: <strong>{details.regionRegistr}</strong></li>}
					{details.identification && details.identification != '' && <li>Идентификация: <strong>{details.identification}</strong></li>}
					{details.age && details.age != '' && <li>Возраст: <strong>{details.age}</strong></li>}
					{details.obtainingMethods && details.obtainingMethods != '' && <li>Способы получения: <strong>{details.obtainingMethods}</strong></li>}
					{details.repaymentOptions && details.repaymentOptions != '' && <li>Способы погашения: <strong>{details.repaymentOptions}</strong></li>}
					{details.commission && details.commission != '' && <li>Комиссия за снятие наличных: <strong>{details.commission}</strong></li>}
					{details.cashback && details.cashback != '' && <li>Кэшбэк: <strong>{details.cashback}</strong></li>}
					{details.minPayment && details.minPayment != '' && <li>Минимальный платеж: <strong>{details.minPayment}</strong></li>}
					{details.considerationTime && details.considerationTime != '' && <li>Время рассмотрения: <strong>{details.considerationTime}</strong></li>}
					{details.delivery && details.delivery != '' && <li>Доставка карты: <strong>{details.delivery}</strong></li>}
					{details.deliveryTime && details.deliveryTime != '' && <li>Срок доставки: <strong>{details.deliveryTime}</strong></li>}
				</ul>
				<ul>
					{details.creditHistory && details.creditHistory != '' && <li>Кредитная история: <strong>{details.creditHistory}</strong></li>}
					{details.creditHistoryImprovement && details.creditHistoryImprovement != '' && <li>Улучшение кредитной истории: <strong>{details.creditHistoryImprovement}</strong></li>}
					{details.schedule && details.schedule != '' && <li>График работы: <strong>{details.schedule}</strong></li>}
					{details.personalArea && details.personalArea != '' && <li>Личный кабинет: <strong>{details.personalArea}</strong></li>}
					{details.smsInfo && details.smsInfo != '' && <li>Смс-информирование: <strong>{details.smsInfo}</strong></li>}
					{details.chipAvailability && details.chipAvailability != '' && <li>Наличие чипа: <strong>{details.chipAvailability}</strong></li>}
					{details.contactlessPayment && details.contactlessPayment != '' && <li>Бесконтактная оплата: <strong>{details.contactlessPayment}</strong></li>}
					{details.secure3D && details.secure3D != '' && <li>3D Secure: <strong>{details.secure3D}</strong></li>}
					{details.supplyDepartment && details.supplyDepartment != '' && <li>OPC: <strong>{details.supplyDepartment}</strong></li>}
					{details.application && details.application != '' && <li>Приложение: <strong>{details.application}</strong></li>}
					{details.internetBank && details.internetBank != '' && <li>Интернет-банк: <strong>{details.internetBank}</strong></li>}
				</ul>
			</div>
		)
	}
}

export default CardDetails