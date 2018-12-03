import queryString from 'query-string'
import {detect} from 'detect-browser'
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
export const PARTNER_UPDATE = 'PARTNER_UPDATE'
export const PARTNER_SELECT = 'PARTNER_SELECT'
export const PARTNER_CREATE = 'PARTNER_CREATE'
export const PARTNER_DELETE = 'PARTNER_DELETE'

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

export function fetchPartners() {
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/partner.php?action=fetch' : '/partner.php?action=fetch'
  return (dispatch) => {
    dispatch({type: PARTNERS_FETCH, status: 0})
    fetch(url).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then((data) => {
      dispatch({type: PARTNERS_FETCH, status: 1, data})
    }).catch((error) => {
      dispatch({type: PARTNERS_FETCH, status: 2, error})
    })
  }
}

export function sendEvent(event) {
  const browserInfo = ({browser}) => browser ? JSON.stringify(browser) : NULL
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/send-event.php' : '/send-event.php'
  return (dispatch, getState) => {
    const datetime = getDateTime()
    const {auth, session} = getState()
    if (auth.token !== null) {
      return 'admin mode'
    }
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
      user_city: session.ip_info && session.ip_info.city ? session.ip_info.city : 'NULL',
      user_country: session.ip_info && session.ip_info.country ? session.ip_info.country : 'NULL',
      browser: browserInfo(session)
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
      },
      browser: detect() || 'unknown'
    }

    dispatch({type: SESSION_INIT, session})
    document.addEventListener('DOMContentLoaded', () => {
      dispatch({type: SESSION_UPDATE, field: 'ip_info', value: window.__IP_INFO__ ? __IP_INFO__ : {
        place: 'Москва'
      }})
    });
    document.addEventListener('yacounter50978069inited', () => {
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
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/auth.php' : '/auth.php'
  return (dispatch) => {
    dispatch({type: AUTH_LOGIN, status: 0})
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({login, password: pass})
    }).then((responce) => {
      if (responce.ok) {
        return responce.json()
      }
    }).then((data) => {
      if (data.token) {
        dispatch({type: AUTH_LOGIN, status: 1, token: data.token})
      } else {
        dispatch({type: AUTH_LOGIN, status: 2})
      }
    })
    .catch(console.log)
  }
}

export const logout = () => ({type: AUTH_LOGOUT})

export function updatePartner(id, partner) {
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/partner.php' : '/partner.php'
  return (dispatch, getState) => {
    dispatch({type: PARTNER_UPDATE, id, partner})
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({
        action: id === 'new' ? 'create' : 'update',
        token: getState().auth.token,
        payload: JSON.stringify(partner)
      })
    }).then((responce) => {
      if (responce.ok) {
        return responce.json()
      }
    }).then((data) => {
      console.log(data)
    })
    .catch(console.log)
  }
}

export const selectPartner = (id) => ({type: PARTNER_SELECT, id})

export const createPartner = (partnerType) => ({type: PARTNER_CREATE, partnerType})

export function deletePartner(id) {
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/partner.php' : '/partner.php'
  return (dispatch, getState) => {
    dispatch({type: PARTNER_DELETE, id})
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({
        action: 'delete',
        token: getState().auth.token,
        id
      })
    }).then((responce) => {
      if (responce.ok) {
        return responce.json()
      }
    }).then((data) => {
      console.log(data)
    })
    .catch(console.log)
  }
}
