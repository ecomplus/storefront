import { categoriesList } from '@ecomplus/utils'
import { currencyCode, getProductData } from './common'

export default dataLayer => {
  const context = window.storefront && window.storefront.context
  if (context && context.resource === 'products') {
    const { body } = context

    const productData = getProductData(body)
    const data = {
      event: 'eec.detail',
      ecommerce: {
        currencyCode,
        detail: {
          products: [productData]
        }
      }
    }

    const categories = categoriesList(body)
    if (categories.length) {
      productData.category = body.category_tree
        ? body.category_tree.replace(/\s>\s/g, '/') : categories[0]
      data.ecommerce.detail.actionField = {
        list: categories[0]
      }
    }
    if (body.brands && body.brands.length) {
      productData.brand = body.brands[0].name
    }

    dataLayer.push(data)
  }
}
