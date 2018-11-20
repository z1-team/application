import {FILTER_CHANGE} from '../actions'

const initialState = {
  category: null
}

function filtersReducer(state = initialState, action) {
  if (action.type === FILTER_CHANGE) {
    return {...state, [action.filter]: action.value}
  }
  return state
}

export default filtersReducer
