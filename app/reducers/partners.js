import {PARTNERS_FETCH} from '../actions'

const initialState = {
  cards: {
    isFetching: false,
    data: []
  },
  credits: {
    isFetching: false,
    data: []
  },
  mfo: {
    isFetching: false,
    data: []
  }
}

function partnersReducer(state = initialState, action) {
  if (action.type === PARTNERS_FETCH) {
    switch (action.status) {
      case 0:
        return {
          ...state,
          [action.direction]: {
            ...state[action.direction],
            isFetching: true
          }
        }
      case 1:
        return {
          ...state,
          [action.direction]: {
            isFetching: false,
            data: action.data
          }
        }
      case 2:
        return {
          ...state,
          [action.direction]: {
            ...state[action.direction],
            isFetching: false
          }
        }
      default:
        return state
    }
  }
  return state
}

export default partnersReducer
