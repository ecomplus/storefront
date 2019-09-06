const widgets = window._widgets
const startWidget = (pkg, fn) => {
  if (widgets[pkg]) {
    const { active, options } = widgets[pkg]
    if (active && typeof fn === 'function') {
      fn(options)
    }
    console.log(`Widget loaded: ${pkg}`)
  }
}

import('@ecomplus/widget-user')
  .then(exp => startWidget('@ecomplus/widget-user', exp.default))

const { resource } = document.body.dataset
switch (resource) {
  case 'products':
    import('@ecomplus/widget-product')
      .then(exp => startWidget('@ecomplus/widget-product', exp.default))
    break
}
