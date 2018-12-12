import React, {Component} from 'react'

class CardDetails extends Component {
	render() {
	const {details} = this.props;

		return (
			<div className="details">

				<ul>
					{details.minSumm && <li>Минимальная сумма: <strong>{details.minSumm}</strong></li>}
					{details.maxSumm && <li>Максимальная сумма: <strong>{details.maxSumm}</strong></li>}
					{details.minPercent && <li>Минимальная процентная ставка: <strong>{details.minPercent}</strong></li>}
					{details.maxPercent && <li>Максимальная процентная ставка: <strong>{details.maxPercent}</strong></li>}
					{details.minTerm && <li>Минимальный срок: <strong>{details.minTerm}</strong></li>}
					{details.maxTerm && <li>Максимальный срок: <strong>{details.maxTerm}</strong></li>}
					{details.appProcessTime && <li>Время рассмотрения заявки: <strong>{details.appProcessTime}</strong></li>}
					{details.getMoneyTime && <li>Время получения денег: <strong>{details.getMoneyTime}</strong></li>}
					{details.paySystem && <li>Платежная система: <strong>{details.paySystem}</strong></li>}
					{details.cardType && <li>Тип карты: <strong>{details.cardType}</strong></li>}
					{details.validity && <li>Срок действия: <strong>{details.validity}</strong></li>}
					{details.maxLimit && <li>Максимальный лимит: <strong>{details.maxLimit}</strong></li>}
					{details.minLimit && <li>Минимальный лимит: <strong>{details.minLimit}</strong></li>}
					{details.interestRate && <li>Процентная ставка: <strong>{details.interestRate}</strong></li>}
					{details.maintenanceСost && <li>Стоимость обслуживания: <strong>{details.maintenanceСost}</strong></li>}
					{details.gracePeriod && <li>Льготный период: <strong>{details.gracePeriod}</strong></li>}
					{details.penalty && <li>Штраф за неуплату: <strong>{details.penalty}</strong></li>}
					{details.incomeProof && <li>Подтверждение дохода: <strong>{details.incomeProof}</strong></li>}
					{details.regionRegistr && <li>Прописка в регионе банка: <strong>{details.regionRegistr}</strong></li>}
					{details.commission && <li>Комиссия за снятие наличных: <strong>{details.commission}</strong></li>}
					{details.cashback && <li>Кэшбэк: <strong>{details.cashback}</strong></li>}
					{details.minPayment && <li>Минимальный платеж: <strong>{details.minPayment}</strong></li>}
				</ul>
				<ul>
					{details.identification && <li>Идентификация: <strong>{details.identification}</strong></li>}
					{details.age && <li>Возраст: <strong>{details.age}</strong></li>}
					{details.obtainingMethods && <li>Способы получения: <strong>{details.obtainingMethods}</strong></li>}
					{details.repaymentOptions && <li>Способы погашения: <strong>{details.repaymentOptions}</strong></li>}
					{details.considerationTime && <li>Время рассмотрения: <strong>{details.considerationTime}</strong></li>}
					{details.delivery && <li>Доставка карты: <strong>{details.delivery}</strong></li>}
					{details.deliveryTime && <li>Срок доставки: <strong>{details.deliveryTime}</strong></li>}
					{details.creditHistory && <li>Кредитная история: <strong>{details.creditHistory}</strong></li>}
					{details.creditHistoryImprovement && <li>Улучшение кредитной истории: <strong>{details.creditHistoryImprovement}</strong></li>}
					{details.schedule && <li>График работы: <strong>{details.schedule}</strong></li>}
					{details.personalArea && <li>Личный кабинет: <strong>{details.personalArea}</strong></li>}
					{details.smsInfo && <li>Смс-информирование: <strong>{details.smsInfo}</strong></li>}
					{details.chipAvailability && <li>Наличие чипа: <strong>{details.chipAvailability}</strong></li>}
					{details.contactlessPayment && <li>Бесконтактная оплата: <strong>{details.contactlessPayment}</strong></li>}
					{details.secure3D && <li>3D Secure: <strong>{details.secure3D}</strong></li>}
					{details.supplyDepartment && <li>OPC: <strong>{details.supplyDepartment}</strong></li>}
					{details.application && <li>Приложение: <strong>{details.application}</strong></li>}
					{details.internetBank && <li>Интернет-банк: <strong>{details.internetBank}</strong></li>}
				</ul>
			</div>
		)
	}
}

export default CardDetails
