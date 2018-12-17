import {SESSION_INIT, SESSION_UPDATE, ABTEST_FETCH} from '../actions'

const initialState = {}

function abTestReducer(state, action) {
  if (action.status === 2) {
    return {...state, abTests: action.data}
  } else {
    return state
  }
}

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_INIT:
      return action.session
    case SESSION_UPDATE:
      return {...state, [action.field]: action.value}
    case ABTEST_FETCH:
      return abTestReducer(state, action)
    default:
      return state
  }
}

export default sessionReducer
