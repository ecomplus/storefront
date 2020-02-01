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
const isMobile = window.screen.width < 768
const widgetsLoadPromises = []
const widgetsMsDelay = window.location.hostname === 'localhost' ? 50 : 1

const loadWidget = (pkg, runImport) => {
  const waitWidgetResolve = new Promise(resolve => {
    setTimeout(() => {
      const widget = window._widgets && window._widgets[pkg]
      if (widget) {
        const { active, options, desktopOnly, enableCheckout, disablePages } = widget
        if (
          active &&
          (!desktopOnly || !isMobile) &&
          (isCheckout ? enableCheckout : !disablePages)
        ) {
          return runImport()
            .then(exp => {
              if (typeof exp.default === 'function') {
                exp.default(options)
              }
              emitter.emit(`widget:${pkg}`)
              console.log(`Widget loaded: ${pkg}`)
            })
            .catch(console.error)
            .finally(resolve)
        }
      }

      resolve()
    }, widgetsMsDelay)
  })

  widgetsLoadPromises.push(waitWidgetResolve)
}

if (!isCheckout) {
  const { resource } = document.body.dataset
  if (resource && resource.startsWith('product')) {
    loadWidget(
      '@ecomplus/widget-product',
      () => import(/* webpackPrefetch: true */
        '@ecomplus/widget-product')
    )
  } else if (document.getElementById('search')) {
    loadWidget(
      '@ecomplus/widget-search-engine',
      () => import(/* webpackPrefetch: true */
        '@ecomplus/widget-search-engine')
    )
  }
}

Promise.all(widgetsLoadPromises).then(() => {
  loadWidget(
    '@ecomplus/widget-product-card',
    () => Promise.resolve({ default: widgetProductCard })
  )

  if (!isCheckout) {
    loadWidget(
      '@ecomplus/widget-user',
      () => import('@ecomplus/widget-user')
    )
    loadWidget(
      '@ecomplus/widget-search',
      () => import('@ecomplus/widget-search')
    )
    loadWidget(
      '@ecomplus/widget-minicart',
      () => import('@ecomplus/widget-minicart')
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
    loadWidget(
      '@ecomplus/widget-trustvox',
      () => import('@ecomplus/widget-trustvox')
    )
  })
})
