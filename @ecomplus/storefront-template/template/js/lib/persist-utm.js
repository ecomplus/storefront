const { sessionStorage } = window
const storageKey = 'ecomUtm'

let isCurrentUtm
const utm = JSON.parse(sessionStorage.getItem(storageKey)) || {}

const urlParams = new URLSearchParams(window.location.search)
;['source', 'medium', 'campaign', 'term', 'content'].forEach(utmParam => {
  const value = urlParams.get(`utm_${utmParam}`)
  if (typeof value === 'string') {
    utm[utmParam] = value
    isCurrentUtm = true
  }
})

if (isCurrentUtm) {
  sessionStorage.setItem(storageKey, JSON.stringify(utm))
}
if (urlParams.get('referral') && !sessionStorage.getItem('ecomReferral')) {
  sessionStorage.setItem('ecomReferral', urlParams.get('referral'))
}
const sessionCoupon = urlParams.get('coupon') || sessionStorage.getItem('st_discount_coupon')
if (sessionCoupon && !sessionStorage.getItem('st_discount_coupon')) {
  sessionStorage.setItem('st_discount_coupon', sessionCoupon)
}

export default utm

export { utm, sessionCoupon }
