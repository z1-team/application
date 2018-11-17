import queryString from 'query-string'
import fetch from 'isomorphic-fetch'

class AppCore {
  init(dispatcher) {
    this.dispatcher = dispatcher
    this.query = queryString.parse(location.search)
    document.addEventListener('yacounter50978069inited', () => {
      this.clientId = yaCounter50978069.getClientID()
      this.dispatch({
        type: 'EVENT_ENTER_LANDING',
        payload: this.query
      })
    })
    console.log('Application initialized')
  }

  getQuery() {
    return this.query
  }

  getLinkParams() {
    return {
      client_id: this.clientId || 145,
      yclick_id: this.query.yclid || 100500
    }
  }

  getCity() {
    return new Promise((resolve, reject) => {
      fetch('https://api.ipify.org/?format=json')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
      .then((data) => {
        return fetch(`http://api.ipapi.com/${data.ip}?access_key=68927500f8d9edf43db800be0220fb02&format=1`)
      })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
      .then((data) => {
        resolve(data.city)
      })
      .catch(reject)
    })
  }

  dispatch(event) {
    const query = this.query
    if (this.dispatcher && typeof this.dispatcher.dispatch === 'function') {
      this.dispatcher.dispatch({
        ...event,
        client_id: this.clientId || 0,
        source: query.utm_source || 'none',
        campaign: query.utm_campaign || -1,
        time: (new Date()).toISOString().slice(0, 19).replace('T', ' ')
      })
    } else {
      console.log('Dispatch error: application core is not initialized!')
    }
  }
}

export default new AppCore()
