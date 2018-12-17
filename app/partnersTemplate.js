const mfo = {
  "id": "new",
  "type": "mfo",
  "main": {
    "title": "Новый партнер",
    "logo": "img/kredito24-logo.png",
    "money": "",
    "term": "",
    "minRate": "",
    "link": "",
    "firstLoan": "",
    "overpayment": ""
  },
  "details": {
    "minSumm": "",
    "maxSumm": "",
    "minPercent": "",
    "maxPercent": "",
    "minTerm": "",
    "maxTerm": "",
    "appProcessTime": "",
    "getMoneyTime": "",
    "penalty": "",
    "incomeProof": "",
    "regionRegistr": "",
    "identification": "",
    "age": "",
    "obtainingMethods": "",
    "repaymentOptions": "",
    "creditHistory": "",
    "schedule": "",
    "personalArea": "",
    "application": "",
    "creditHistoryImprovement": "",
    "smsInfo": ""
  },
  "filters": {
    "category_mfo": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "special_offers": [false, false],
    "summ": [false, false, false, false, false, false, false],
    "review_time": [false, false, false, false],
    "get_money_time": [false, false, false, false],
    "income_proof": [false, false],
    "credit_history": [false, false],
    "get_ways": [false, false, false, false, false, false, false],
    "repayment_options": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "age": [false, false, false, false, false],
    "mob_app": [false, false]
  },
  filter_values: {
    "summ": [1, 9999999],
    "term": [1, 999]
  },
  "sortBy": {
    "summ": 0,
    "term": 0,
    "rate": 0,
    "min_days": 0,
    "max_days": 0
  }
}

const cards = {
  "id": "new",
  "type": "cards",
  "main": {
    "title": "Новый партнер",
    "logo": "img/alfa-100-dnei.png",
    "limit": "",
    "percent": "",
    "cashback": "",
    "link": "",
    "firstLoan": ""
  },
  "details": {
    "paySystem": "",
    "cardType": "",
    "validity": "",
    "minLimit": "",
    "maxLimit": "",
    "interestRate": "",
    "maintenanceСost": "",
    "gracePeriod": "",
    "commission": "",
    "cashback": "",
    "minPayment": "",
    "considerationTime": "",
    "delivery": "",
    "deliveryTime": "",
    "incomeProof": "",
    "age": "",
    "regionRegistr": "",
    "chipAvailability": "",
    "contactlessPayment": "",
    "secure3D": "",
    "supplyDepartment": "",
    "application": "",
    "internetBank": ""
  },
  "filters": {
    "category_cards": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "payment_system": [false, false, false],
    "validity": [false, false, false, false],
    "limits": [false, false, false, false, false],
    "grace_period": [false, false, false, false],
    "cashback": [false, false],
    "consideration_time": [false, false, false, false, false],
    "card_delivery": [false, false],
    "time_delivery": [false, false, false],
    "income_proof": [false, false],
    "age": [false, false, false, false, false],
    "chip_availability": [false, false],
    "secure_3d": [false, false],
    "mob_app": [false, false]
  },
  filter_values: {
    "limit": [1, 999999],
    "rate": [1, 999]
  },
  "sortBy": {
    "limit": 0,
    "rate": 0,
    "cashback": 0
  }
}

export default {mfo, cards}
