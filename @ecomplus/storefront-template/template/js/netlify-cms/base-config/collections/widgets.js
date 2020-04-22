import getWidgetProductCard from '@ecomplus/widget-product-card/cms.config'
import getWidgetProduct from '@ecomplus/widget-product/cms.config'
import getWidgetSearchEngine from '@ecomplus/widget-search-engine/cms.config'
import getWidgetSearch from '@ecomplus/widget-search/cms.config'
import getWidgetMinicart from '@ecomplus/widget-minicart/cms.config'
import getWidgetFbPixel from '@ecomplus/widget-fb-pixel/cms.config'
import getWidgetTagManager from '@ecomplus/widget-tag-manager/cms.config'
import getWidgetTrustvox from '@ecomplus/widget-trustvox/cms.config'

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
    fixWidgetConfig(options, getWidgetProductCard),
    fixWidgetConfig(options, getWidgetProduct),
    fixWidgetConfig(options, getWidgetSearch),
    fixWidgetConfig(options, getWidgetSearchEngine),
    fixWidgetConfig(options, getWidgetMinicart),
    fixWidgetConfig(options, getWidgetFbPixel),
    fixWidgetConfig(options, getWidgetTagManager),
    fixWidgetConfig(options, getWidgetTrustvox)
  ]
})
