// E-Com Plus SDK JS
// https://github.com/ecomclub/ecomplus-sdk-js
import EcomIo from 'ecomplus-sdk'
// E-Com Plus Passport JS Client
// https://github.com/ecomclub/ecomplus-passport-client
import EcomPassport from 'ecomplus-passport-client'
import { DEFAULT_LANG } from '@/lib/constants'

// declare main object
// container for exported methods
const Api = {}

Api.init = (debug, initCallback) => {
  // parse callback
  let callback = Callback((body) => {
    // init passport
    let lang
    if (body.default_lang) {
      lang = body.default_lang
    } else {
      lang = DEFAULT_LANG
    }
    EcomPassport.init(body.store_id, lang)
    // finally, call initCallback
    initCallback(body)
  })

  if (debug) {
    // test
    EcomIo.init(callback, 1011, '5b1abe30a4d4531b8fe40725')
  } else {
    // production
    EcomIo.init(callback)
  }
}

const Callback = (callback) => {
  // check response, then callback
  return (err, body) => {
    if (!err) {
      if (typeof callback === 'function') {
        callback(body)
      }
    } else {
      // TODO: treat error
      console.error(err)
    }
  }
}

Api.get = {
  shop (callback) {
    EcomIo.getStore(Callback(callback))
  },
  customer (callback) {
    // GET customer from Passport REST API
    EcomPassport.api('me.json', 'GET', null, Callback(callback))
  },
  product (callback, id) {
    EcomIo.getProduct(Callback(callback), id)
  }
}

Api.set = {
  // modifications requests
  // authentication middleware with Passport REST API
  // request are passed to Store API
  customer (body, callback) {
    console.log(body)
    EcomPassport.api('me.json', 'PATCH', body, Callback(callback))
  }
}

Api.session = {
  login (callback) {
    // start OAuth login flow
    EcomPassport.loginPopup(callback)
  }
}

export default Api
export const {
  init,
  session,
  get,
  set
} = Api
