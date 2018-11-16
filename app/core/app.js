import queryString from 'query-string'
import fetch from 'isomorphic-fetch'

class AppCore {
  init(dispatcher) {
    this.dispatcher = dispatcher
    this.query = queryString.parse(location.search)
    console.log('Application initialized')
    this.dispatch({
      type: 'EVENT_ENTER_LANDING',
      payload: this.query
    })
  }

  getQuery() {
    return this.query
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
        source: query.utm_source || 'none',
        campaign: query.utm_campaign || 'none',
        timestamp: (new Date()).toLocaleTimeString()
      })
    } else {
      console.log('Dispatch error: application core is not initialized!')
    }
  }
}

export default new AppCore()
