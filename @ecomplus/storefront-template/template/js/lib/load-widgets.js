import { isMobile } from './_env'
import emitter from './emitter'
import ecomClient from '@ecomplus/client'
import EcomSearch from '@ecomplus/search-engine'
import ecomPassport from '@ecomplus/passport-client'
import ecomCart from '@ecomplus/shopping-cart'
import widgetProductCard from '@ecomplus/widget-product-card'

window.ecomClient = ecomClient
window.EcomSearch = EcomSearch
window.ecomPassport = ecomPassport
window.ecomCart = ecomCart

emitter.emit('ecom:ready')

const isCheckout = window.location.pathname.startsWith('/app/')
const widgetsLoadPromises = []
const widgetsMsDelay = window.location.hostname === 'localhost' ? 50 : 1

const loadWidget = (pkg, runImport) => {
  const waitWidgetResolve = new Promise(resolve => {
    setTimeout(() => {
      const widget = window._widgets && window._widgets[pkg]
      if (
        widget &&
        widget.active &&
        (!widget.desktopOnly || !isMobile) &&
        (isCheckout ? widget.enableCheckout : !widget.disablePages)
      ) {
        return runImport()
          .then(exp => {
            if (typeof exp.default === 'function') {
              exp.default(widget.options)
            }
            emitter.emit(`widget:${pkg}`)
            console.log(`Widget loaded: ${pkg}`)
          })
          .catch(console.error)
          .finally(resolve)
      }

      resolve()
    }, widgetsMsDelay)
  })

  widgetsLoadPromises.push(waitWidgetResolve)
}

if (!isCheckout && document.body.dataset.resource === 'products') {
  loadWidget(
    '@ecomplus/widget-product',
    () => import(/* webpackPrefetch: true */ '@ecomplus/widget-product')
  )
}

Promise.all(widgetsLoadPromises).then(() => {
  loadWidget(
    '@ecomplus/widget-product-card',
    () => Promise.resolve({ default: widgetProductCard })
  )

  if (window.location.pathname === '/search') {
    loadWidget(
      '@ecomplus/widget-search-engine',
      () => import(/* webpackPrefetch: true */ '@ecomplus/widget-search-engine')
    )
  }

  const startLowProrityWidgets = () => {
    if (!isCheckout) {
      loadWidget(
        '@ecomplus/widget-search',
        () => import('@ecomplus/widget-search')
      )
      loadWidget(
        '@ecomplus/widget-minicart',
        () => import('@ecomplus/widget-minicart')
      )
      loadWidget(
        '@ecomplus/widget-user',
        () => import('@ecomplus/widget-user')
      )
    }

    Promise.all(widgetsLoadPromises).then(() => {
      loadWidget(
        '@ecomplus/widget-tag-manager',
        () => import('@ecomplus/widget-tag-manager')
      )
      loadWidget(
        '@ecomplus/widget-fb-pixel',
        () => import('@ecomplus/widget-fb-pixel')
      )
    })
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(startLowProrityWidgets)
  } else {
    startLowProrityWidgets()
  }
})
