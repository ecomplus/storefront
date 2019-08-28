import './src/icons'
import './src/utils'
import './src/menu'
import './src/header'
import './src/search'

setTimeout(() => {
  const widgets = window._widgets
  if (typeof widgets === 'object' && widgets !== null) {
    import(/* webpackPrefetch: true */ './widgets').then(() => {
      for (const widgetPkg in widgets) {
        if (widgets[widgetPkg]) {
          const { active, fn, options } = widgets[widgetPkg]
          if (active && typeof window[fn] === 'function') {
            window[fn](options)
          }
        }
      }
    })
  }
}, 200)
