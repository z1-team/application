export const FILTER_CHANGE = 'FILTER_CHANGE'
export const POPUP_OPEN = 'POPUP_OPEN'
export const POPUP_CLOSE = 'POPUP_CLOSE'

export const changeFilter = (filter, value) => ({
  type: FILTER_CHANGE,
  filter,
  value
})

export const openPopup = (name) => ({type: POPUP_OPEN, name})
export const closePopup = (name) => ({type: POPUP_CLOSE, name})
