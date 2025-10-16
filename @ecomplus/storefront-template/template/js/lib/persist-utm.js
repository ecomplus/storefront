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

const couponStorageKey = 'ecomUrlCoupon'
const couponCheckoutStorageKey = 'st_discount_coupon'
const checkoutSessionCoupon = sessionStorage.getItem(couponCheckoutStorageKey)
let urlCoupon = urlParams.get('coupon')
if (urlCoupon) {
  sessionStorage.setItem(couponStorageKey, urlCoupon)
} else {
  urlCoupon = sessionStorage.getItem(couponStorageKey)
  if (checkoutSessionCoupon && urlCoupon && checkoutSessionCoupon !== urlCoupon) {
    urlCoupon = null
  }
}
const sessionCoupon = urlCoupon || checkoutSessionCoupon
if (sessionCoupon && !checkoutSessionCoupon) {
  sessionStorage.setItem(couponCheckoutStorageKey, sessionCoupon)
}

export default utm

export { utm, sessionCoupon, urlCoupon }
