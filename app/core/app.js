import queryString from 'query-string'

class AppCore {
  init(dispatcher) {
    this.dispatcher = dispatcher
    this.query = queryString.parse(location.search)
  }

  dispatch(event) {
    if (this.dispatcher && typeof this.dispatcher.dispatch === 'function') {
      this.dispatcher.dispatch(event)
    } else {
      console.log('Dispatch error: application core is not initialized!')
    }
  }
}

export default AppCore
