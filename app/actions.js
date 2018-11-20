import fetch from 'isomorphic-fetch'

export const FILTER_CHANGE = 'FILTER_CHANGE'
export const POPUP_OPEN = 'POPUP_OPEN'
export const POPUP_CLOSE = 'POPUP_CLOSE'
export const PARTNERS_FETCH = 'PARTNERS_FETCH'

export const changeFilter = (filter, value) => ({
  type: FILTER_CHANGE,
  filter,
  value
})

export const openPopup = (name) => ({type: POPUP_OPEN, name})
export const closePopup = (name) => ({type: POPUP_CLOSE, name})

export function fetchPartners(direction) {
  return (dispatch) => {
    dispatch({type: PARTNERS_FETCH, direction, status: 0})
    fetch(`/data/${direction}.json`).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then((data) => {
      dispatch({type: PARTNERS_FETCH, direction, status: 1, data})
    }).catch((error) => {
      dispatch({type: PARTNERS_FETCH, direction, status: 2, error})
    })
  }
}
