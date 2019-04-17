'use strict'

// runtime cache rules for non Webpack chunk files and external CDNs
// https://developers.google.com/web/tools/workbox/guides/codelabs/webpack#runtime
module.exports = [
  // Storefront Bootstrap theme
  {
    urlPattern: /\/storefront-twbs?(\.min)\.css/,
    handler: 'StaleWhileRevalidate'
  },
  // font files from Google Fonts
  // images with unique URLs from E-Com Plus Storage
  // non-critical assets with cache first strategy
  {
    urlPattern: /^https:\/\/(?:fonts\.gstatic\.com|ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com)/,
    handler: 'CacheFirst'
  },
  // CDNs
  {
    urlPattern: /.*(?:code\.jquery|cdnjs\.cloudflare|bootstrapcdn|googleapis|gstatic)\.com/,
    handler: 'StaleWhileRevalidate'
  },
  // E-Com Plus APIs
  // prefer live content from network
  {
    urlPattern: /^https:\/\/([^.]+\.)?(?:ecvol\.com|e-com\.plus)/,
    handler: 'NetworkFirst'
  }
]
