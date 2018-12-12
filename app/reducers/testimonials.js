import {TESTIMONIAL_SEND, TESTIMONIAL_PUBLIC, TESTIMONIAL_DELETE, TESTIMONIAL_FETCH} from '../actions'

const initialState = {
  isFetching: false,
  data: []
}

function testimonialsFetching(state, action) {
  switch(action.status) {
    case 1:
      return {isFetching: true, data: []}
    case 2:
      return {isFetching: false, data: action.data}
    default:
      return state
  }
}

function testimonialsReducer(state = initialState, action) {
  switch (action.type) {
    case TESTIMONIAL_SEND:
      return state
    case TESTIMONIAL_PUBLIC:
    case TESTIMONIAL_DELETE:
      return {...state, data: state.data.filter(({id}) => id !== action.id)}
    case TESTIMONIAL_FETCH:
      return testimonialsFetching(state, action)
    default:
      return state
  }
}

export default testimonialsReducer
