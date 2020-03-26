import getEcomplusWidgetProductCard from './widgets/ecomplus-widget-product-card'
import getEcomplusWidgetSearch from './widgets/ecomplus-widget-search'
import getEcomplusWidgetMinicart from './widgets/ecomplus-widget-minicart'
import getEcomplusWidgetUser from './widgets/ecomplus-widget-user'
import getEcomplusWidgetProduct from './widgets/ecomplus-widget-product'
import getEcomplusWidgetSearchEngine from './widgets/ecomplus-widget-search-engine'
import getWidgetTagManager from './widgets/widget-tag-manager'
import getWidgetFbPixel from './widgets/widget-fb-pixel'
import getWidgetTrustvox from './widgets/widget-trustvox'

export default options => ({
  name: 'widgets',
  label: 'Widgets',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    getEcomplusWidgetProductCard(options),
    getEcomplusWidgetSearch(options),
    getEcomplusWidgetMinicart(options),
    getEcomplusWidgetUser(options),
    getEcomplusWidgetProduct(options),
    getEcomplusWidgetSearchEngine(options),
    getWidgetTagManager(options),
    getWidgetFbPixel(options),
    getWidgetTrustvox(options)
  ]
})
