const getMeta = metaName => {
  const metas = document.getElementsByTagName('meta')
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content')
    }
  }
  return null
}

export const DEFAULT_LANG = getMeta('ecom_lang') || 'pt_br'
export const DEFAULT_COUNTRY_CODE = getMeta('ecom_country_code') || 'br'
export const DEFAULT_CURRENCY = getMeta('ecom_currency') || 'BRL'
export const DEFAULT_CURRENCY_SYMBOL = getMeta('ecom_currency_symbol') || 'R$'
export const STORE_ID = parseInt(process.env.ECOM_STORE_ID || getMeta('ecom_store_id'), 10)
export const STORE_OBJECT_ID = process.env.ECOM_STORE_OBJECT_ID || getMeta('ecom_store_id')

console.log('--> E-Com Plus Store ID ' + STORE_ID)
