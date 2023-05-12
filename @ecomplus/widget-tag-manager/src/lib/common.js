import {
  $ecomConfig,
  name as getName,
  price as getPrice
} from '@ecomplus/utils'

export const currencyCode = $ecomConfig.get('currency') || 'BRL'

export const getProductData = item => {
  const [name, ...variants] = getName(item).split(' / ')
  const productData = {
    name,
    id: item.sku,
    price: getPrice(item).toFixed(2)
  }
  if (variants && variants.length) {
    productData.variant = variants.join(' / ')
  } else if (item.variation_id) {
    productData.name = name.replace(window.__customGTMVariantRegex || /\s[^\s]+$/, '')
    productData.variant = name.replace(productData.name, '').trim()
  }
  if (item.quantity) {
    productData.quantity = item.quantity
  }
  return productData
}
