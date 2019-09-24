import { name, version } from './../../package.json'
import './lib/config'
import { events } from './lib/emitter'
import '@ecomplus/storefront-twbs'

import './lib/icons'
import './lib/utils'
import './lib/lazy-load'
import './lib/glide-slides'
import './lib/menu'
import './lib/header'
import './lib/search'

import lozad from 'lozad'
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import Glide from '@glidejs/glide'
import ecomClient from '@ecomplus/client'
import EcomSearch from '@ecomplus/search-engine'
import EcomPassport from '@ecomplus/passport-client'
import EcomCart from '@ecomplus/shopping-cart'

import $ from './lib/$'
import $overlay from './lib/$overlay'
import './lib/fetch-info'

window.lozad = lozad
window.Vue = Vue
window._ = { cloneDeep, merge }
window.Glide = Glide
window.ecomClient = ecomClient
window.EcomSearch = EcomSearch
window.EcomPassport = EcomPassport
window.EcomCart = EcomCart
window.$ = $

Vue.config.productionTip = false

window.storefront = { $overlay, ...events }

setTimeout(() => {
  if (window._widgets !== false) {
    import(/* webpackPrefetch: true */ './lib/load-widgets')
  }
}, 200)

if (window.pluginPhotoswipe) {
  import(/* webpackPrefetch: true */ './lib/photoswipe')
}

const { hash } = window.location
if (hash.indexOf('=') !== -1) {
  const $netlifyIdentityScript = document.createElement('script')
  $netlifyIdentityScript.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
  if (hash.indexOf('token=') === -1) {
    $netlifyIdentityScript.async = $netlifyIdentityScript.defer = true
  }
  document.body.appendChild($netlifyIdentityScript)
}

console.log(`// TEMPLATE => ${name}@${version}`)
