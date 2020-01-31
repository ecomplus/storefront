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

export default {
  domain: window.location.hostname,
  lang: $ecomConfig.get('lang'),
  utm
}
