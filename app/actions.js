import queryString from 'query-string'
import fetch from 'isomorphic-fetch'
import uuid from 'uuid-js'

export const FILTER_CHANGE = 'FILTER_CHANGE'
export const FILTER_RESET = 'FILTER_RESET'
export const POPUP_OPEN = 'POPUP_OPEN'
export const POPUP_CLOSE = 'POPUP_CLOSE'
export const PARTNERS_FETCH = 'PARTNERS_FETCH'
export const SESSION_INIT = 'SESSION_INIT'
export const SESSION_UPDATE = 'SESSION_UPDATE'
export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

function getDateTime() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const f = v => v < 10 ? '0' + v : v
  return {
    local: `${year}-${f(month)}-${f(day)} ${f(hours)}:${f(minutes)}:${f(seconds)}`,
    utcDateTime: date.toISOString().slice(0, 19).replace('T', ' '),
    utcDate: date.toISOString().slice(0, 10)
  }
}

export const changeFilter = (filter, value) => ({
  type: FILTER_CHANGE,
  filter,
  value
})
export const resetFilter = () => ({type: FILTER_RESET})

export const openPopup = (name) => ({type: POPUP_OPEN, name})
export const closePopup = () => ({type: POPUP_CLOSE})

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

export function sendEvent(event) {
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/send-event.php' : '/send-event.php'
  return (dispatch, getState) => {
    const datetime = getDateTime()
    const {session} = getState()
    const fullEvent = {
      ...event,
      yclick_id: session.query.yclid || 'NULL',
      client_id: session.client_id || 'NULL',
      utm_campaign: session.query.utm_campaign || 'NULL',
      utm_source: session.query.utm_source || 'NULL',
      user_id: session.user_id || 'NULL',
      date: datetime.utcDate,
      datetime: datetime.utcDateTime,
      localtime: datetime.local,
      user_region: session.ip_info && session.ip_info.region ? session.ip_info.region : 'NULL',
      user_city: session.ip_info && session.ip_info.city ? session.ip_info.city : 'NULL'
    }
    console.log('Dispatching event: ', fullEvent)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({
        ...fullEvent,
        payload: JSON.stringify(fullEvent.payload)
      })
    }).then((responce) => {
      if (responce.ok) {
        console.log('Event dispatched!')
        return responce.text()
      }
    }).then(console.log)
    .catch(console.log)
  }
}

export function initSession() {
  function getUserId() {
    const saved = localStorage.getItem('user_id')
    if (!saved) {
      const user_id = uuid.create().toString()
      localStorage.setItem('user_id', user_id)
      return user_id;
    }
    return saved
  }
  return (dispatch) => {
    const session = {
      query: queryString.parse(location.search),
      user_id: getUserId(),
      ip_info: window.__IP_INFO__ ? __IP_INFO__ : {
        place: 'Москва'
      }
    }
    dispatch({type: SESSION_INIT, session})
    document.addEventListener('DOMContentLoaded', () => {
      dispatch({type: SESSION_UPDATE, field: 'ip_info', value: window.__IP_INFO__ ? __IP_INFO__ : {
        place: 'Москва'
      }})
    });
    document.addEventListener('yacounter50978069inited', () => {
      console.log('!!!')
      const client_id = yaCounter50978069.getClientID()
      dispatch({type: SESSION_UPDATE, field: 'client_id', value: client_id})
      dispatch(sendEvent({
        type: 'enter_landing',
        payload: session.query
      }))
    })
  }
}

export function login(login, pass) {
  return (dispatch) => {
    dispatch({type: AUTH_LOGIN, status: 1, token: "KUGF032945ih32f98GBUFGWS"})
  }
}

export const logout = () => ({type: AUTH_LOGOUT})
