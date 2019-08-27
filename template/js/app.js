import './src/icons'
import './src/utils'
import './src/menu'
import './src/header'
import './src/search'

import(/* webpackPrefetch: true */ './widgets').then(() => {
  const widgets = window._widgets
  if (widgets) {
    for (const widgetPkg in widgets) {
      if (widgets[widgetPkg]) {
        const { active, fn, options } = widgets[widgetPkg]
        if (active) {
          window[fn](options)
        }
      }
    }
  }
})
