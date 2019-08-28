import { _config } from '@ecomplus/utils'

const { _settings } = window
;[
  'store_id',
  'lang',
  'currency',
  'currency_symbol',
  'country_code'
].forEach(prop => {
  _config.set(prop, _settings[prop])
})
