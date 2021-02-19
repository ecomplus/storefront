import { isMobile } from '@ecomplus/storefront-twbs'
import emitter from './emitter'
import widgetProductCard from '@ecomplus/widget-product-card'

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

const { resource } = document.body.dataset
if (!isCheckout && resource === 'products') {
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

  if (
    window.location.pathname === '/search' ||
    resource === 'categories' ||
    resource === 'brands' ||
    (!resource && document.getElementById('search-engine'))
  ) {
    loadWidget(
      '@ecomplus/widget-search-engine',
      () => import(/* webpackPrefetch: true */ '@ecomplus/widget-search-engine')
    )
  }

  const requestIdleCallback = fn => {
    if (typeof window.requestIdleCallback === 'function') {
      setTimeout(() => window.requestIdleCallback(fn), 200)
    } else {
      setTimeout(fn, 800)
    }
  }

  requestIdleCallback(() => {
    emitter.emit('load:lcp')

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
      requestIdleCallback(() => emitter.emit('load:components'))

      loadWidget(
        '@ecomplus/widget-tag-manager',
        () => import('@ecomplus/widget-tag-manager')
      )
      loadWidget(
        '@ecomplus/widget-analytics',
        () => import('@ecomplus/widget-analytics')
      )
      loadWidget(
        '@ecomplus/widget-fb-pixel',
        () => import('@ecomplus/widget-fb-pixel')
      )
      loadWidget(
        '@ecomplus/widget-gmc-ratings',
        () => import('@ecomplus/widget-gmc-ratings')
      )
      loadWidget(
        '@ecomplus/widget-ebit',
        () => import('@ecomplus/widget-ebit')
      )
      loadWidget(
        '@ecomplus/widget-compre-confie',
        () => import('@ecomplus/widget-compre-confie')
      )
    })
  })
})
