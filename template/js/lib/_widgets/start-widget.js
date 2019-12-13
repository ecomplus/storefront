import emitter from './../emitter'

export default (pkg, widgetFn, options) => {
  widgetFn(options)
  window._widgets[pkg].started = true
  emitter.emit(`widget:${pkg}`)
  console.log(`Widget loaded: ${pkg}`)
}
