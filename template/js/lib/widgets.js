const loadWidget = (pkg, runImport) => {
  const { active, desktopOnly, options } = window._widgets[pkg]
  if (active && (!desktopOnly || window.screen.width >= 768)) {
    runImport().then(exp => {
      if (typeof exp.default === 'function') {
        exp.default(options)
      }
      console.log(`Widget loaded: ${pkg}`)
    })
  }
}

loadWidget('@ecomplus/widget-user', () => import('@ecomplus/widget-user'))
loadWidget('@ecomplus/widget-product-card', () => import('@ecomplus/widget-product-card'))

const { resource } = document.body.dataset
switch (resource) {
  case 'products':
    loadWidget('@ecomplus/widget-product', () => import('@ecomplus/widget-product'))
    break
}
