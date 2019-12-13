import getWidgetOptions from './_widgets/get-widget-options'
import startWidget from './_widgets/start-widget'

const isCheckout = window.location.pathname.startsWith('/app/')
const widgetsLoadPromises = []

const loadWidget = (pkg, runImport) => {
  const options = getWidgetOptions(pkg)
  if (options) {
    const importPromise = runImport()
    importPromise.then(exp => {
      if (typeof exp.default === 'function') {
        startWidget(pkg, exp.default, options)
      }
    })
    widgetsLoadPromises.push(importPromise)
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
