import widgetInitializer from '../../utils/widget-initializer'
import Reviews from './Reviews.vue'

export default (options = {}, elId = 'reviews_widget') => {
  return widgetInitializer(options, elId, Reviews)
}
