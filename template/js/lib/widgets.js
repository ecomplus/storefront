import emitter from './emitter'
import widgetUser from '@ecomplus/widget-user'

const fnWidgets = {
  widgetUser
}

setTimeout(() => {
  const widgets = window._widgets
  if (typeof widgets === 'object' && widgets !== null) {
    for (const widgetPkg in widgets) {
      if (widgets[widgetPkg]) {
        const { active, fn, options } = widgets[widgetPkg]
        if (active && typeof fnWidgets[fn] === 'function') {
          fnWidgets[fn](options)
        }
      }
    }
    emitter.emit('widgets', { widgets })
  }
}, 200)
