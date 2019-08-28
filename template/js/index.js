import './lib/config'
import '@ecomplus/storefront-twbs'
import './pages/icons'
import './pages/utils'
import './pages/menu'
import './pages/header'
import './pages/search'
import ecomUtils from '@ecomplus/utils'
import Vue from 'vue'
import $ from './pages/lib/$'
import $overlay from './pages/lib/$overlay'

window.ecomUtils = ecomUtils
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

switch (window.location.pathname) {
  case '/app/':
    import(/* webpackChunkName: "app" */ './app')
    break
  case '/admin/':
  case '/admin/cms/':
    import(/* webpackChunkName: "cms" */ './cms')
    break
}
