import ecomUtils from '@ecomplus/utils'

const { _settings } = window
const { _config } = ecomUtils
;[
  'store_id',
  'lang',
  'currency',
  'currency_symbol',
  'country_code'
].forEach(prop => {
  _config.set(prop, _settings[prop])
})

window.ecomUtils = ecomUtils
