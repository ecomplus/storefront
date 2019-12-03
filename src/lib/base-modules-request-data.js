import { $ecomConfig } from '@ecomplus/utils'

export default {
  domain: window.location.hostname,
  lang: $ecomConfig.get('lang')
}
