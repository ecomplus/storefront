import { $ecomConfig, price } from '@ecomplus/utils'

export const currency = $ecomConfig.get('currency') || 'BRL'

export const getProductData = body => {
  const data = {
    currency,
    content_ids: [body.sku],
    content_name: body.name,
    value: price(body),
    content_type: 'product'
  }
  if (body.categories && body.categories.length) {
    data.content_category = body.category_tree || body.categories[0].name
  }
  return data
}
