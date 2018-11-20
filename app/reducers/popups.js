import {FILTER_CHANGE, POPUP_OPEN, POPUP_CLOSE} from '../actions'

const initialState = {
  categories: false
}

function popupsReducer(state = initialState, action) {
  switch (action.type) {
    case POPUP_OPEN:
      return {...state, [action.name]: true}
    case POPUP_CLOSE:
      return {...state, [action.name]: false}
    case FILTER_CHANGE:
      return {...state, categories: false}
    default:
      return state
  }
}

export default popupsReducer
