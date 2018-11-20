import {FILTER_CHANGE, POPUP_OPEN, POPUP_CLOSE} from '../actions'

const initialState = {
  filters: {},
  popups: {
    categories: false
  }
}

function app(state = initialState, action) {
  switch (action.type) {
    case FILTER_CHANGE:
      return {...state, filters: {
        ...state.filters,
        [action.filter]: action.value
      }, popups: {
        ...state.popups,
        categories: false
      }}
    case POPUP_OPEN:
      return {...state, popups: {
        ...state.popups,
        [action.name]: true
      }}
    case POPUP_CLOSE:
      return {...state, popups: {
        ...state.popups,
        [action.name]: false
      }}
    default:
      return state
  }
  return state
}

export default app
