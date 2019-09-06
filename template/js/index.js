import './lib/config'
import '@ecomplus/storefront-twbs'
import './pages/icons'
import './pages/utils'
import './pages/menu'
import './pages/header'
import './pages/search'
import emitter from './lib/emitter'
import Vue from 'vue'
import $ from './pages/lib/$'
import $overlay from './pages/lib/$overlay'
import './lib/fetch-info'

window.Vue = Vue
window.$ = $

Vue.config.productionTip = false

window.storefront = {
  $overlay
}
;['on', 'off', 'once'].forEach(method => {
  window.storefront[method] = (ev, fn) => {
    emitter[method](ev, fn)
  }
})

setTimeout(() => {
  if (window._widgets !== false) {
    import(/* webpackPrefetch: true */ './lib/widgets')
  }
}, 200)

if (window.pluginPhotoswipe) {
  import(/* webpackPrefetch: true */ './pages/plugins/photoswipe')
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
