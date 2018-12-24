import queryString from 'querystring'
import fetch from 'isomorphic-fetch'

const baseUrl = location.hostname === 'localhost' ?
  'http://localhost:8080/' : '/'

// Шаги алгоритма ECMA-262, 6-е издание, 22.1.2.1
// Ссылка: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // Свойство length метода from равно 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Положим C равным значению this.
      var C = this;

      // 2. Положим items равным ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. Если mapfn равен undefined, положим mapping равным false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. иначе
        // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Положим lenValue равным Get(items, "length").
      // 11. Положим len равным ToLength(lenValue).
      var len = toLength(items.length);

      // 13. Если IsConstructor(C) равен true, то
      // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
      //     объекта C со списком аргументов, содержащим единственный элемент len.
      // 14. a. Иначе, положим A равным ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Положим k равным 0.
      var k = 0;
      // 17. Пока k < len, будем повторять... (шаги с a по h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Положим putStatus равным Put(A, "length", len, true).
      A.length = len;
      // 20. Вернём A.
      return A;
    };
  }());
}

if (!Int8Array.__proto__.from) {
  (function () {
    Int8Array.__proto__.from = function (obj, func, thisObj) {

      var typedArrayClass = Int8Array.__proto__;
      if(typeof this !== 'function') {
        throw new TypeError('# is not a constructor');
      }
      if (this.__proto__ !== typedArrayClass) {
        throw new TypeError('this is not a typed array.');
      }

      func = func || function (elem) {
        return elem;
      };

      if (typeof func !== 'function') {
        throw new TypeError('specified argument is not a function');
      }

      obj = Object(obj);
      if (!obj['length']) {
        return new this(0);
      }
      var copy_data = [];
      for(var i = 0; i < obj.length; i++) {
        copy_data.push(obj[i]);
      }

      copy_data = copy_data.map(func, thisObj);

      var typed_array = new this(copy_data.length);
      for(var i = 0; i < typed_array.length; i++) {
        typed_array[i] = copy_data[i];
      }
      return typed_array;
    }
  })();
}

function repeatString(string, count) {
  let result = ''
  let i = 0
  for (; i < count; i++) {
    result += string
  }
  return result
}

function urlBase64ToUint8Array(base64String) {
  const padding = repeatString('=', (4 - base64String.length % 4) % 4)
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
