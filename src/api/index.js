// E-Com Plus SDK JS
// https://github.com/ecomclub/ecomplus-sdk-js
import EcomIo from 'ecomplus-sdk'
// E-Com Plus Passport JS Client
// https://github.com/ecomclub/ecomplus-passport-client
import EcomPassport from 'ecomplus-passport-client'
import { DEFAULT_LANG, STORE_ID, STORE_OBJECT_ID } from '@/lib/constants'

// declare main object
// container for exported methods
const Api = {}

const promise = fn => {
  return new Promise((resolve, reject) => {
    fn((err, body) => {
      if (!body && !(err instanceof Error)) {
        body = Object.assign({}, err)
        // unset err object
        err = null
      }
      if (!err) {
        // success
        resolve(body)
      } else {
        // @TODO: treat error
        reject(err)
      }
    })
  })
}

Api.init = debug => {
  let fn
  if (debug) {
    // test
    fn = cb => EcomIo.init(cb, 1011, '5b1abe30a4d4531b8fe40725')
  } else {
    // production
    fn = cb => EcomIo.init(cb, STORE_ID, STORE_OBJECT_ID)
  }

  return promise(fn).then(body => {
    // init passport
    let lang
    if (body.default_lang) {
      lang = body.default_lang
    } else {
      lang = DEFAULT_LANG
    }
    EcomPassport.init(body.store_id, lang)
  })
}

Api.get = {
  shop: () => promise(cb => EcomIo.getStore(cb)),
  customer: () => promise(cb => {
    if (EcomPassport.isLogged()) {
      // GET customer from Passport REST API
      EcomPassport.api('me.json', 'GET', null, cb)
    } else {
      // no customer session
      // return empty customer body
      cb(null, {})
    }
  }),
  product: id => promise(cb => EcomIo.getProduct(cb, id)),
  cart: id => promise(cb => EcomIo.getCart(cb, id))
}

Api.set = {
  // modifications requests
  // authentication middleware with Passport REST API
  // request are passed to Store API
  customer: body => promise(cb => EcomPassport.api('me.json', 'PATCH', body, cb))
}

Api.session = {
  // start OAuth login flow
  login: () => promise(EcomPassport.loginPopup),
  logout: EcomPassport.logout
}

export default Api
