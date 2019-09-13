const loadWidget = (pkg, runImport) => {
  const widget = window._widgets[pkg]
  if (widget) {
    const { active, desktopOnly, options } = widget
    if (active && (!desktopOnly || window.screen.width >= 768)) {
      runImport().then(exp => {
        if (typeof exp.default === 'function') {
          exp.default(options)
        }
        console.log(`Widget loaded: ${pkg}`)
      })
    }
  }
}

loadWidget('@ecomplus/widget-user', () => import('@ecomplus/widget-user'))
loadWidget('@ecomplus/widget-product-card', () => import('@ecomplus/widget-product-card'))
loadWidget('@ecomplus/widget-search', () => import('@ecomplus/widget-search'))
loadWidget('@ecomplus/widget-minicart', () => import('@ecomplus/widget-minicart'))

const { resource } = document.body.dataset
switch (resource) {
  case 'products':
    loadWidget('@ecomplus/widget-product', () => import('@ecomplus/widget-product'))
    break
}
