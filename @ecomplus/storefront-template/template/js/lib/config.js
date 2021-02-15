import ecomUtils from '@ecomplus/utils'
import { events } from './emitter'

const { $ecomConfig } = ecomUtils
;[
  'store_id',
  'lang',
  'currency',
  'currency_symbol',
  'country_code'
].forEach(prop => {
  $ecomConfig.set(prop, window._settings[prop])
})

const { ECOM_CONFIG } = window
if (ECOM_CONFIG) {
  for (const prop in ECOM_CONFIG) {
    if (ECOM_CONFIG[prop]) {
      $ecomConfig.set(prop, ECOM_CONFIG[prop])
    }
  }
}

console.log(`Store ID: #${$ecomConfig.get('store_id')}`)

window.ecomUtils = ecomUtils

window.storefront = {
  settings: window._settings,
  info: window._info,
  widgets: window._widgets,
  context: window._context,
  data: window._data,
  ...events
}

window.privacyPolicyUrl = '/pages/privacidade'
