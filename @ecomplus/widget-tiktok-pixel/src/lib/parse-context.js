import { getProductData } from './common'

export default ttq => {
  const context = window.storefront && window.storefront.context
  if (context && context.resource === 'products') {
    ttq.track('ViewContent', getProductData(context.body))
  }
}
