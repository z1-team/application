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
export const PARTNER_SORT = 'PARTNER_SORT'
export const PARTNER_SORT_RESET = 'PARTNER_SORT_RESET'
export const PAGE_CHANGE = 'PAGE_CHANGE'
export const TESTIMONIAL_SEND = 'TESTIMONIAL_SEND'
export const TESTIMONIAL_DELETE = 'TESTIMONIAL_DELETE'
export const TESTIMONIAL_PUBLIC = 'TESTIMONIAL_PUBLIC'
export const TESTIMONIAL_FETCH = 'TESTIMONIAL_FETCH'
export const EMAIL_SEND = 'EMAIL_SEND'
export const ABTEST_FETCH = 'ABTEST_FETCH'

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

export const changePage = (page) => ({type: PAGE_CHANGE, page})

export const openPopup = (name) => ({type: POPUP_OPEN, name})
export const closePopup = () => ({type: POPUP_CLOSE})

const bannerId = {
  mw_all: 'bg0',
  m_all: 'bg1',
  w_all: 'bg6',
  m_18: 'bg2',
  m_25: 'bg3',
  m_35: 'bg4',
  m_45: 'bg5',
  w_18: 'bg7',
  w_25: 'bg8',
  w_35: 'bg9',
  w_45: 'bg10'
}

function detectBanner(session) {
  if (session.query && session.query.utm_img) {
    const image = session.query.utm_img
    return bannerId[image] || false
  } else {
    return false
  }
}

function fetchABTest(session, clientId) {
  const banner = detectBanner(session)
  const banner_ = banner ? `?banner=${banner}` : ''
  const url = location.hostname === 'localhost' ?
    `http://localhost:8080/api/v1/test/${clientId}${banner_}`
    : `/api/v1/test/${clientId}${banner_}`
  return (dispatch) => {
    dispatch({type: ABTEST_FETCH, status: 1})
    fetch(url).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then((data) => {
      dispatch({type: ABTEST_FETCH, status: 2, data})
      localStorage.setItem('abTests', JSON.stringify(data))
    }).catch((error) => {
      dispatch({type: ABTEST_FETCH, status: 3, error})
    })
  }
}

export function fetchPartners() {
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/api/v1/partners' : '/api/v1/partners'
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
    'http://localhost:8080/api/v1/event' : '/api/v1/event'
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
  const abTests = localStorage.getItem('abTests')
  
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

    if(abTests) {
      session.abTests = JSON.parse(abTests)
    }

    dispatch({type: SESSION_INIT, session})
    document.addEventListener('DOMContentLoaded', () => {
      dispatch({type: SESSION_UPDATE, field: 'ip_info', value: window.__IP_INFO__ ? __IP_INFO__ : {
        place: 'Москва'
      }})
    });
    document.addEventListener('yacounter50978069inited', () => {
      const client_id = yaCounter50978069.getClientID()
      dispatch(fetchABTest(session, client_id))
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
    'http://localhost:8080/api/v1/auth' : '/api/v1/auth'
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
    'http://localhost:8080/api/v1/partners' : '/api/v1/partners'
  return (dispatch, getState) => {
    dispatch({type: PARTNER_UPDATE, id, partner})
    fetch(url, {
      method: id === 'new' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({
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
    `http://localhost:8080/api/v1/partners/${id}` : `/api/v1/partners/${id}`
  return (dispatch, getState) => {
    dispatch({type: PARTNER_DELETE, id})
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({token: getState().auth.token})
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

export const sortPartner = (sort, order) => ({type: PARTNER_SORT, sort, order})

export const resetSortPartner = (direction) => ({type: PARTNER_SORT_RESET, direction})

export function deleteTestimonial(id) {
  const url = location.hostname === 'localhost' ?
    `http://localhost:8080/api/v1/testimonials/${id}` : `/api/v1/testimonials/${id}`
  return (dispatch, getState) => {
    dispatch({type: TESTIMONIAL_DELETE, status: 1, id})
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({token: getState().auth.token})
    }).then((responce) => {
      if (responce.ok) {
        return responce.json()
      }
    }).then((data) => {
      dispatch({type: TESTIMONIAL_DELETE, status: 2, id})
    })
    .catch(console.log)
  }
}

export function publicTestimonial(data) {
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/api/v1/testimonials' : '/api/v1/testimonials'
  return (dispatch, getState) => {
    dispatch({type: TESTIMONIAL_PUBLIC, status: 1, id: data.id})
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({
        token: getState().auth.token,
        testimonial: JSON.stringify(data)
      })
    }).then((responce) => {
      if (responce.ok) {
        return responce.json()
      }
    }).then((data) => {
      dispatch({type: TESTIMONIAL_PUBLIC, status: 2, id: data.id})
    })
    .catch(console.log)
  }
}

export function sendTestimonial(data) {
  const url = location.hostname === 'localhost' ?
    'http://localhost:8080/api/v1/testimonials' : '/api/v1/testimonials'
  return (dispatch, getState) => {
    dispatch({type: TESTIMONIAL_SEND, status: 1})
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({
        testimonial: JSON.stringify(data)
      })
    }).then((responce) => {
      if (responce.ok) {
        return responce.json()
      }
    }).then((data) => {
      dispatch({type: TESTIMONIAL_SEND, status: 2})
    })
    .catch(console.log)
  }
}

export function fetchTestimonials(target, id = 1) {
  const targetId = target === 'partner' ? id : target
  const url = location.hostname === 'localhost' ?
    `http://localhost:8080/api/v1/testimonials/${targetId}` : `/api/v1/testimonials/${targetId}`
  return (dispatch, getState) => {
    dispatch({type: TESTIMONIAL_FETCH, status: 1})
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((responce) => {
      if (responce.ok) {
        return responce.json()
      }
    }).then((data) => {
      dispatch({type: TESTIMONIAL_FETCH, status: 2, data})
    })
    .catch(console.log)
  }
}

export function subscribeEmail(email) {
  const url = location.hostname === 'localhost' ?
    `http://localhost:8080/api/v1/subscribe` : '/api/v1/subscribe'
  return (dispatch, getState) => {
    const client_id = getState().session.client_id || null
    dispatch({type: EMAIL_SEND, status: 1})
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({
        email, client_id
      })
    }).then((responce) => {
      if (responce.ok) {
        return responce.json()
      }
    }).then((data) => {
      dispatch({type: EMAIL_SEND, status: 2})
      localStorage.setItem("subscribed", true)
    })
    .catch(console.log)
  }
}
