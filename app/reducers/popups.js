import {FILTER_CHANGE, POPUP_OPEN, POPUP_CLOSE, AUTH_LOGIN, PARTNER_CREATE} from '../actions'

const initialState = {
  categories: false,
  login: false,
  edit: false,
  email: false,
  testi: false
}

function popupsReducer(state = initialState, action) {
  switch (action.type) {
    case POPUP_OPEN:
      return {...state, [action.name]: true}
    case POPUP_CLOSE:
      return Object.getOwnPropertyNames(state).reduce(function(result, popup) {
        result[popup] = false
        return result
      }, {})
    case FILTER_CHANGE:
      return {...state, categories: false}
    case AUTH_LOGIN:
      return action.status === 1 ? {...state, login: false} : state
    case PARTNER_CREATE:
      return {...state, edit: true}
    default:
      return state
  }
}

export default popupsReducer
