import parseContext from './lib/parse-context'
import watchAppRoutes from './lib/watch-app-routes'

export default (options = {}) => {
  const { dataLayerVar } = options
  const dataLayer = window[dataLayerVar] || window.dataLayer
  if (dataLayer) {
    parseContext(dataLayer)
    watchAppRoutes(dataLayer)
  }
}
