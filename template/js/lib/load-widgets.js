import 'core-js/modules/es.promise.all-settled'
import emitter from './emitter'
import EcomSearch from '@ecomplus/search-engine'
import EcomPassport from '@ecomplus/passport-client'
import EcomCart from '@ecomplus/shopping-cart'

window.EcomSearch = EcomSearch
window.EcomPassport = EcomPassport
window.EcomCart = EcomCart

emitter.emit('ecom:ready')

const isCheckout = window.location.pathname.startsWith('/app/')
const isMobile = window.screen.width < 768
const widgetsLoadPromises = []

const loadWidget = (pkg, runImport) => {
  const widget = window._widgets[pkg]
  if (widget) {
    const { active, options, desktopOnly, enableCheckout, disablePages } = widget
    if (
      active &&
      (!desktopOnly || !isMobile) &&
      (isCheckout ? enableCheckout : !disablePages)
    ) {
      const importPromise = runImport()
      importPromise.then(exp => {
        if (typeof exp.default === 'function') {
          exp.default(options)
        }
        emitter.emit(`widget:${pkg}`)
        console.log(`Widget loaded: ${pkg}`)
      })
      widgetsLoadPromises.push(importPromise)
    }
  }
}

if (!isCheckout) {
  loadWidget('@ecomplus/widget-user', () => import('@ecomplus/widget-user'))
  loadWidget('@ecomplus/widget-product-card', () => import('@ecomplus/widget-product-card'))
  loadWidget('@ecomplus/widget-search', () => import('@ecomplus/widget-search'))
  loadWidget('@ecomplus/widget-minicart', () => import('@ecomplus/widget-minicart'))

  const { resource } = document.body.dataset
  if (resource && resource.startsWith('product')) {
    loadWidget('@ecomplus/widget-product', () => import('@ecomplus/widget-product'))
  } else if (document.getElementById('search')) {
    loadWidget('@ecomplus/widget-search-engine', () => import('@ecomplus/widget-search-engine'))
  }
}

Promise.allSettled(widgetsLoadPromises)
  .then(() => {
    loadWidget('@ecomplus/widget-tag-manager', () => import('@ecomplus/widget-tag-manager'))
    loadWidget('@ecomplus/widget-trustvox', () => import('@ecomplus/widget-trustvox'))
  })
