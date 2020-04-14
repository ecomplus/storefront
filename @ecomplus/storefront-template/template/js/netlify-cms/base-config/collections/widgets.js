import getWidgetProductCard from '@ecomplus/widget-product-card/cms.config'
/*
import getEcomplusWidgetSearch from './widgets/search'
import getEcomplusWidgetMinicart from './widgets/minicart'
import getEcomplusWidgetUser from './widgets/user'
import getEcomplusWidgetProduct from './widgets/product'
import getEcomplusWidgetSearchEngine from './widgets/search-engine'
import getWidgetTagManager from './widgets/tag-manager'
import getWidgetFbPixel from './widgets/fb-pixel'
import getWidgetTrustvox from './widgets/trustvox'
*/

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
    fixWidgetConfig(options, getWidgetProductCard)
    /*,
    getEcomplusWidgetSearch(options),
    getEcomplusWidgetMinicart(options),
    getEcomplusWidgetUser(options),
    getEcomplusWidgetProduct(options),
    getEcomplusWidgetSearchEngine(options),
    getWidgetTagManager(options),
    getWidgetFbPixel(options),
    getWidgetTrustvox(options)
    */
  ]
})
