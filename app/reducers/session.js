import {SESSION_INIT, SESSION_UPDATE} from '../actions'

const initialState = {}

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_INIT:
      return action.session
    case SESSION_UPDATE:
      return {...state, [action.field]: action.value}
    default:
      return state
  }
}

export default sessionReducer
