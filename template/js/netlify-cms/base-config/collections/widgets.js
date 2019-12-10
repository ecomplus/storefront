import ecomplusWidgetProductCard from './widgets/ecomplus-widget-product-card'
import ecomplusWidgetSearch from './widgets/ecomplus-widget-search'
import ecomplusWidgetMinicart from './widgets/ecomplus-widget-minicart'
import ecomplusWidgetUser from './widgets/ecomplus-widget-user'
import ecomplusWidgetProduct from './widgets/ecomplus-widget-product'
import ecomplusWidgetSearchEngine from './widgets/ecomplus-widget-search-engine'
import widgetTagManager from './widgets/widget-tag-manager'
import widgetTrustvox from './widgets/widget-trustvox'

export default {
  name: 'widgets',
  label: 'Widgets',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    ecomplusWidgetProductCard,
    ecomplusWidgetSearch,
    ecomplusWidgetMinicart,
    ecomplusWidgetUser,
    ecomplusWidgetProduct,
    ecomplusWidgetSearchEngine,
    widgetTagManager,
    widgetTrustvox
  ]
}
