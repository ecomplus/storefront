import ecomUtils from '@ecomplus/utils'

const { _settings } = window
const { $ecomConfig } = ecomUtils
;[
  'store_id',
  'lang',
  'currency',
  'currency_symbol',
  'country_code'
].forEach(prop => {
  $ecomConfig.set(prop, _settings[prop])
})

window.ecomUtils = ecomUtils
