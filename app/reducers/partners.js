import {PARTNERS_FETCH, PARTNER_SELECT, PARTNER_UPDATE,
   PARTNER_CREATE, PARTNER_DELETE, PARTNER_SORT, PARTNER_SORT_RESET, FILTER_CHANGE, FILTER_RESET, PAGE_CHANGE} from '../actions'
import templates from '../partnersTemplate'

const initialState = {
  sortBy: "summ",
  isAscending: false,
  currentPage: 1,
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

function resetSort(direction) {
  switch (direction) {
    case 'mfo':
      return {sortBy: "summ", isAscending: false}
    case 'cards':
      return {sortBy: "limit", isAscending: false}
    default:
      return {sortBy: "summ", isAscending: false}
  }
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
        ...state,
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
    case PARTNER_SORT:
      return { ...state, sortBy: action.sort, isAscending: action.order}
    case PARTNER_SORT_RESET:
      return { ...state, ...resetSort(action.direction)}
    case FILTER_CHANGE:
    case FILTER_RESET:
      return { ...state, currentPage: 1}
    case PAGE_CHANGE:
      return { ...state, currentPage: action.page}
    default:
     return state
  }
}

export default partnersReducer
