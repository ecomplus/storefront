import { currencyCode, getProductData } from './common'

export default fbq => {
  const context = window.storefront && window.storefront.context
  if (context && context.resource === 'products') {
    const { body } = context

    const productData = getProductData(body)
    const data = {
      currency: currencyCode,
      content_ids: productData.id,
      content_name: productData.name,
      value: productData.price,
      content_type: 'product'
    }

    fbq('ViewContent', data)
  }
}
