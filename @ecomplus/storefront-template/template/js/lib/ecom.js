import './config'
import axios from 'axios'
import ecomClient from '@ecomplus/client'
import EcomSearch from '@ecomplus/search-engine'
import ecomPassport from '@ecomplus/passport-client'
import ecomCart from '@ecomplus/shopping-cart'
import emitter from './emitter'

ecomCart.data.items.forEach(({ _id, flags }) => {
  if (Array.isArray(flags) && flags.includes('__tmp')) {
    ecomCart.removeItem(_id)
  }
})

window.axios = axios
window.ecomClient = ecomClient
window.EcomSearch = EcomSearch
window.ecomPassport = ecomPassport
window.ecomCart = ecomCart

emitter.emit('ecom:ready')
