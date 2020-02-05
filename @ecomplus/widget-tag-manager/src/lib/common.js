import { $ecomConfig, name, price } from '@ecomplus/utils'

export const currencyCode = $ecomConfig.get('currency') || 'BRL'

export const getProductData = item => {
  const productData = {
    name: name(item),
    id: item.sku,
    price: price(item).toFixed(2)
  }
  if (item.quantity) {
    productData.quantity = item.quantity
  }
  return productData
}
