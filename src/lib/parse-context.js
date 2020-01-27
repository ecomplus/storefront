import { categoriesList } from '@ecomplus/utils'
import { currencyCode, getProductData } from './common'

export default fbq => {
  const context = window.storefront && window.storefront.context
  if (context && context.resource === 'products') {
    const { body } = context

    const productData = getProductData(body)
    const data = {
      event: 'ViewContent',
      ecommerce: {
        currency: currencyCode,
        content_ids: productData.id,
        content_name: productData.name,
        value: productData.price,
        content_type: 'product'
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

    fbq('track', data.event, data.ecommerce)
  }
}
