import './lib/config'
import '@ecomplus/storefront-twbs'
import './pages/icons'
import './pages/utils'
import './pages/menu'
import './pages/header'
import './pages/search'
import Vue from 'vue'
import $ from './pages/lib/$'
import $overlay from './pages/lib/$overlay'

window.Vue = Vue
window.$ = $
window.$overlay = $overlay

Vue.config.productionTip = false

setTimeout(() => {
  const widgets = window._widgets
  if (typeof widgets === 'object' && widgets !== null) {
    import(/* webpackPrefetch: true */ './pages/widgets').then(() => {
      for (const widgetPkg in widgets) {
        if (widgets[widgetPkg]) {
          const { active, fn, options } = widgets[widgetPkg]
          if (active && typeof window[fn] === 'function') {
            window[fn](options)
          }
        }
      }
    })
  }
}, 200)

const { hash } = window.location
if (hash.indexOf('=') !== -1) {
  const $netlifyIdentityScript = document.createElement('script')
  $netlifyIdentityScript.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
  if (hash.indexOf('token=') === -1) {
    $netlifyIdentityScript.async = $netlifyIdentityScript.defer = true
  }
  document.body.appendChild($netlifyIdentityScript)
}
