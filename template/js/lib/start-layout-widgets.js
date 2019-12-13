import getWidgetOptions from './_widgets/get-widget-options'
import startWidget from './_widgets/start-widget'

import widgetProductCard from '@ecomplus/widget-product-card'
import widgetUser from '@ecomplus/widget-user'
import widgetSearch from '@ecomplus/widget-search'
import widgetMinicart from '@ecomplus/widget-minicart'

setTimeout(() => {
  if (window._widgets !== false) {
    const pkgs = {
      '@ecomplus/widget-product-card': widgetProductCard,
      '@ecomplus/widget-user': widgetUser,
      '@ecomplus/widget-search': widgetSearch,
      '@ecomplus/widget-minicart': widgetMinicart
    }
    for (const pkg in pkgs) {
      const widgetFn = pkgs[pkg]
      if (widgetFn) {
        const options = getWidgetOptions(pkg)
        if (options) {
          startWidget(pkg, widgetFn, options)
        }
      }
    }
  }
}, 25)
