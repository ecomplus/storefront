// E-Com Plus SDK JS
// https://github.com/ecomclub/ecomplus-sdk-js
import EcomIo from 'ecomplus-sdk'

const init = (debug, callback) => {
  // parse callback
  callback = Callback(callback)
  if (debug) {
    // test
    EcomIo.init(callback, 1004, '5a99b7e338f4774795b90773')
  } else {
    // production
    EcomIo.init(callback)
  }
}

const Callback = (callback) => {
  // check response, then callback
  return (err, body) => {
    if (!err) {
      callback(body)
    } else {
      // TODO: treat error
      console.error(err)
    }
  }
}

const get = {
  shop: (callback) => {
    EcomIo.getStore(Callback(callback))
  }
}

export default {
  init,
  get
}
