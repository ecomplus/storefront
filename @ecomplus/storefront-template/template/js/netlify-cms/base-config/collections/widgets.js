import getWidgetProductCard from '@ecomplus/widget-product-card/cms.config'
import getWidgetProduct from '@ecomplus/widget-product/cms.config'
import getWidgetSearchEngine from '@ecomplus/widget-search-engine/cms.config'
import getWidgetSearch from '@ecomplus/widget-search/cms.config'
import getWidgetMinicart from '@ecomplus/widget-minicart/cms.config'
import getWidgetUser from '@ecomplus/widget-user/cms.config'
import getWidgetOffersNotification from '@ecomplus/widget-offers-notification/cms.config'
import getWidgetAddi from '@ecomplus/widget-addi/cms.config'
import getWidgetAnalytics from '@ecomplus/widget-analytics/cms.config'
import getWidgetFbPixel from '@ecomplus/widget-fb-pixel/cms.config'
import getWidgetTiktokPixel from '@ecomplus/widget-tiktok-pixel/cms.config'
import getWidgetTagManager from '@ecomplus/widget-tag-manager/cms.config'
import getWidgetGmcRatings from '@ecomplus/widget-gmc-ratings/cms.config'
import getWidgetTawkto from '@ecomplus/widget-tawkto/cms.config'
import getWidgetTrustvox from '@ecomplus/widget-trustvox/cms.config'
import getWidgetEbit from '@ecomplus/widget-ebit/cms.config'
import getWidgetCompreConfie from '@ecomplus/widget-compre-confie/cms.config'
import getWidgetOpinioesVerificadas from '@ecomplus/widget-opinioes-verificadas/cms.config'
import getWidgetYourviews from '@ecomplus/widget-yourviews/cms.config'

const fixWidgetConfig = ({ baseDir }, getWidget) => {
  const baseConfig = getWidget()
  const pkgName = baseConfig.fields.find(({ name }) => name === 'pkg').default
  const name = pkgName.replace(/^(@ecomplus\/|storefront-)widget-/i, '')
  return {
    ...baseConfig,
    name,
    file: `${baseDir}content/widgets/${name}.json`
  }
}

export default options => ({
  name: 'widgets',
  label: 'Widgets',
  description: 'Plugins, tags e componentes adicionais',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    fixWidgetConfig(options, getWidgetAddi),
    fixWidgetConfig(options, getWidgetAnalytics),
    fixWidgetConfig(options, getWidgetFbPixel),
    fixWidgetConfig(options, getWidgetTiktokPixel),
    fixWidgetConfig(options, getWidgetTagManager),
    fixWidgetConfig(options, getWidgetGmcRatings),
    fixWidgetConfig(options, getWidgetTawkto),
    fixWidgetConfig(options, getWidgetTrustvox),
    fixWidgetConfig(options, getWidgetYourviews),
    fixWidgetConfig(options, getWidgetEbit),
    fixWidgetConfig(options, getWidgetCompreConfie),
    fixWidgetConfig(options, getWidgetOpinioesVerificadas),
    fixWidgetConfig(options, getWidgetOffersNotification),
    fixWidgetConfig(options, getWidgetProductCard),
    fixWidgetConfig(options, getWidgetProduct),
    fixWidgetConfig(options, getWidgetSearch),
    fixWidgetConfig(options, getWidgetSearchEngine),
    fixWidgetConfig(options, getWidgetMinicart),
    fixWidgetConfig(options, getWidgetUser)
  ]
})
