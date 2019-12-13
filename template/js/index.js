import { name, version } from './../../package.json'
import './lib/config'
import '@ecomplus/storefront-twbs'
import { emitter, events } from './lib/emitter'

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

import $ from './lib/$'
import $overlay from './lib/$overlay'
import './lib/fetch-info'

import EcomSearch from '@ecomplus/search-engine'
import EcomPassport from '@ecomplus/passport-client'
import EcomCart from '@ecomplus/shopping-cart'

import './lib/start-layout-widgets'

window.lozad = lozad
window.Vue = Vue
window._ = { cloneDeep, merge }
window.Glide = Glide
window.$ = $

window.EcomSearch = EcomSearch
window.EcomPassport = EcomPassport
window.EcomCart = EcomCart

emitter.emit('ecom:ready')

Vue.config.productionTip = false

window.storefront = {
  $overlay,
  settings: window._settings,
  info: window._info,
  widgets: window._widgets,
  context: window._context,
  data: window._data,
  ...events
}

setTimeout(() => {
  if (window._widgets !== false) {
    import(/* webpackPrefetch: true */ './lib/load-widgets')
  }
}, 50)

if (window.pluginPhotoswipe) {
  import(/* webpackPrefetch: true */ './lib/photoswipe')
}

const { hash } = window.location
if (hash.indexOf('_token=') !== -1 || hash.indexOf('error=access_denied') !== -1) {
  const $netlifyIdentityScript = document.createElement('script')
  $netlifyIdentityScript.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
  document.body.appendChild($netlifyIdentityScript)
}

console.log(`// TEMPLATE => ${name}@${version}`)
