import fetch from 'isomorphic-fetch'
import queryString from 'querystring'

const url = location.hostname === 'localhost' ?
  'http://localhost:8080/send-event.php' : '/send-event.php'

const dispatcher = {
  dispatch(event) {
    console.log('Dispatching event: ', event)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({
        ...event,
        payload: JSON.stringify(event.payload)
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

export default dispatcher
