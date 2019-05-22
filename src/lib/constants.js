const getMeta = metaName => {
  const metas = document.getElementsByTagName('meta')
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content')
    }
  }
  return null
}

export const DEFAULT_LANG = getMeta('ecom-lang') || 'pt_br'
export const DEFAULT_COUNTRY_CODE = getMeta('ecom-country-code') || 'br'
export const DEFAULT_CURRENCY = getMeta('ecom-currency') || 'BRL'
export const DEFAULT_CURRENCY_SYMBOL = getMeta('ecom-currency-symbol') || 'R$'
export const STORE_ID = parseInt(process.env.ECOM_STORE_ID || getMeta('ecom-store-id'), 10)
export const STORE_OBJECT_ID = process.env.ECOM_STORE_OBJECT_ID || getMeta('ecom-store-object-id')

console.log('--> E-Com Plus Store ID ' + STORE_ID)
