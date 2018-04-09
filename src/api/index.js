// E-Com Plus SDK JS
import EcomIo from 'ecomplus-sdk'

export default {
  init: (debug, callback) => {
    if (debug) {
      // test
      EcomIo.init(callback, 1004, '5a99b7e338f4774795b90773')
    } else {
      // production
      EcomIo.init(callback)
    }
  }
}
