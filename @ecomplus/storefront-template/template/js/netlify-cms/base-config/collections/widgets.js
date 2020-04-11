import getEcomplusWidgetProductCard from './widgets/component-product-card'
import getEcomplusWidgetSearch from './widgets/component-search'
import getEcomplusWidgetMinicart from './widgets/component-minicart'
import getEcomplusWidgetUser from './widgets/component-user'
import getEcomplusWidgetProduct from './widgets/component-product'
import getEcomplusWidgetSearchEngine from './widgets/component-search-engine'
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
