import {PARTNERS_FETCH, PARTNER_SELECT, PARTNER_UPDATE, PARTNER_CREATE, PARTNER_DELETE} from '../actions'
import templates from '../partnersTemplate'

const initialState = {
  isFetching: false,
  selected: null,
  cards: [],
  credits: [],
  mfo: [],
  data: {}
}

function filtersPartners(type, data) {
  return (
    data.map(({id}) => (id))
      .filter((el, index) => (data[index].type === type))
  )
}

function deleteReducer(state, id) {
  const del = id_ => (id_ !== id)
  return {
    ...state,
    cards: state.cards.filter(del),
    credits: state.credits.filter(del),
    mfo: state.mfo.filter(del)
  }
}

function fetchReducer(state, action) {
  switch (action.status) {
    case 0:
      return { ...state, isFetching: true }
    case 1:
      return {
        isFetching: false,
        mfo: filtersPartners("mfo", action.data),
        credits: filtersPartners("credits", action.data),
        cards: filtersPartners("cards", action.data),
        data: action.data.reduce((result, item) => {
          result[item.id] = item
          return result
        }, {})
      }
    case 2:
      return { ...state, isFetching: false }
    default:
      return state
    }
}

function partnersReducer(state = initialState, action) {
  switch(action.type) {
    case PARTNERS_FETCH:
      return fetchReducer(state, action)
    case PARTNER_SELECT:
      return { ...state, selected: action.id}
    case PARTNER_UPDATE:
      return { ...state, data: {
        ...state.data,
        [action.id]: action.partner
      }}
    case PARTNER_CREATE:
      return { ...state,
        selected: "new",
        data: {
        ...state.data,
        "new": templates[action.partnerType]
      }}
    case PARTNER_DELETE:
      return deleteReducer(state, action.id)
    default:
     return state
  }
}

export default partnersReducer
