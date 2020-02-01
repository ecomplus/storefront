import { getProductData } from './common'

export default fbq => {
  const context = window.storefront && window.storefront.context
  if (context && context.resource === 'products') {
    fbq('ViewContent', getProductData(context.body))
  }
}
