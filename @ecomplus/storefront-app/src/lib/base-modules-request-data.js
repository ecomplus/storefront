import { $ecomConfig } from '@ecomplus/utils'

let utm = JSON.parse(window.sessionStorage.getItem('ecomUtm'))
if (!utm) {
  utm = {}
  const urlParams = new URLSearchParams(window.location.search)
  ;['source', 'medium', 'campaign', 'term', 'content'].forEach(utmParam => {
    const value = urlParams.get(`utm_${utmParam}`)
    if (typeof value === 'string') {
      utm[utmParam] = value
    }
  })
}

let domain = window.location.hostname
if (domain === 'localhost' && window.storefront) {
  const { settings } = window.storefront
  if (settings) {
    domain = settings.domain || domain
  }
}

export default {
  domain,
  lang: $ecomConfig.get('lang'),
  utm
}
