import queryString from 'query-string'
import fetch from 'isomorphic-fetch'

const baseUrl = location.hostname === 'localhost' ?
  'http://localhost:8080/' : '/'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

function saveSubscription(subscription, client_id) {
  const url = baseUrl + 'api/v1/save-subscriber'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: queryString.stringify({
      client_id,
      subscription: JSON.stringify(subscription)
    })
  }).then((responce) => {
    if (responce.ok) {
      return responce.json()
    }
  }).then((data) => {
    console.log('Подписка оформлена: ', data)
  })
}

function doRegistration(client_id) {
  const vapidPublicKey = 'BDRyRCCpFbCcEbrGnyKLm8CekYwv9GC4mdWoKWR6nyuTK-ZhJJ-p8opMhGz76YYUvQ2p40Z6eS_C_t3Ntff7Lrk'
  const convertedKey = urlBase64ToUint8Array(vapidPublicKey)

  if (!('serviceWorker' in navigator)) {
    return false
  }
  if (!('PushManager' in window)) {
    return false
  }

  navigator.serviceWorker.register('/serviceWorker.js')
  navigator.serviceWorker.ready.then((registration) => {
    return registration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          return subscription
        }
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey
        })
      })
  }).then((subscription) => saveSubscription(subscription, client_id))
}

export default doRegistration
