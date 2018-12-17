import {FILTER_CHANGE, POPUP_OPEN, POPUP_CLOSE, AUTH_LOGIN, PARTNER_CREATE, EMAIL_SEND} from '../actions'

const initialState = {
  categories: false,
  login: false,
  edit: false,
  email: false,
  testi: false,
  subscribe: false
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
    case EMAIL_SEND:
      return action.status === 2 ? {...state, email: false, subscribe: true} : state
    default:
      return state
  }
}

export default popupsReducer
