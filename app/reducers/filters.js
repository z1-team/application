import {FILTER_CHANGE} from '../actions'

const initialState = {
  category: null,
  special_offers: [false, false],
  summ: [false, false, false, false, false, false, false],
  review_time: [false, false, false, false],
  get_money_time: [false, false, false, false],
  income_proof: [false, false],
  credit_history: [false, false],
  get_ways: [false, false, false, false, false, false, false],
  repayment_options: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  age: [false, false, false, false, false],
  mob_app: [false, false],
  payment_system: [false, false, false],
  validity: [false, false, false, false],
  limits: [false, false, false, false, false],
  grace_period: [false, false, false, false],
  cashback: [false, false],
  consideration_time: [false, false, false, false, false],
  card_delivery: [false, false],
  time_delivery: [false, false, false],
  chip_availability: [false, false],
  secure_3d: [false, false]
}

function filtersReducer(state = initialState, action) {
  if (action.type === FILTER_CHANGE) {
  	if(action.value === null && Array.isArray(state[action.filter])) {
    	return {...state, [action.filter]: state[action.filter].map((x) => false)}
  	} else {
  		return {...state, [action.filter]: action.value}
  	}
  }
  return state
}

export default filtersReducer
