import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

skipWaiting()
clientsClaim()

/* global self */

precacheAndRoute(self.__WB_MANIFEST)

/**
 * Runtime caching
 */

// Google Fonts stylesheets
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
)

// underlying font files
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        // large expiration time
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
)

// jQuery library
registerRoute(
  /^https:\/\/code\.jquery\.com/,
  new StaleWhileRevalidate({
    cacheName: 'cdn-jquery'
  })
)

// additional JS libraries from CDN
registerRoute(
  /^https:\/\/cdn\.jsdelivr\.net/,
  new StaleWhileRevalidate({
    cacheName: 'cdn-jsdelivr'
  })
)

/**
 * E-Com Plus APIs
 * Prefer live content from network
 * Check available hosts: https://github.com/ecomclub/ecomplus-sdk-js/blob/master/main.js
 */

// Main API and Storefront API cache
registerRoute(
  /^https:\/\/io(storefront)?\.ecvol\.com/,
  new NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20
      })
    ]
  })
)

// Store API cache
registerRoute(
  /^https:\/\/ioapi?\.ecvol\.com/,
  new NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'store-api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        // purge large JSON files to release quota
        purgeOnQuotaError: true
      })
    ]
  })
)

// Live Store and Search API
registerRoute(
  /^https:\/\/(?:api|apx-search).e-com\.plus\/(api\/)?v[1-9]+\//,
  new NetworkFirst({
    cacheName: 'live-api',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        // keep for 5 minutes only
        maxAgeSeconds: 5 * 60
      })
    ]
  })
)

/**
 * Images with unique URLs from E-Com Plus Storage
 * Check sizes: https://github.com/ecomclub/storage-api/blob/master/bin/web.js#L282
 */

// normal and thumbnail sizes
registerRoute(
  /^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/([12345]?[0-9]{2}px|normal|small)\//,
  new CacheFirst({
    cacheName: 'pictures',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        // 30 days max age
        maxAgeSeconds: 60 * 60 * 24 * 30,
        purgeOnQuotaError: true
      })
    ]
  })
)

// big images
registerRoute(
  /^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/([678]?[0-9]{2}px|big)\//,
  new CacheFirst({
    cacheName: 'pictures-big',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        // 2 days only max age
        maxAgeSeconds: 60 * 60 * 24 * 2,
        purgeOnQuotaError: true
      })
    ]
  })
)

/**
 * Same origin assets
 */

// theme assets directory
registerRoute(
  /\/assets\//,
  new StaleWhileRevalidate({
    cacheName: 'assets'
  })
)

// logo image
registerRoute(
  /\/((?:img|assets).*)?logo\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new StaleWhileRevalidate({
    cacheName: 'logo'
  })
)

// CMS image uploads
registerRoute(
  /\/img\/uploads\/.*\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new StaleWhileRevalidate({
    cacheName: 'media',
    plugins: [
      new ExpirationPlugin({
        // keep at most 20 entries
        maxEntries: 20,
        // don't keep any entries for more than 30 days
        maxAgeSeconds: 60 * 60 * 24 * 30,
        // automatically cleanup if quota is exceeded
        purgeOnQuotaError: true
      })
    ]
  })
)

/**
 * Routes
 */

// homepage
registerRoute('/', new NetworkFirst())

// any page URL slug
registerRoute(
  /\/((?!(?:admin|assets|img)(\/|$))[^.]+)(\.(?!js|css|xml|txt|png|gif|jpg|jpeg|webp|svg)[^.]+)*$/,
  new NetworkFirst({
    cacheName: 'page',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        // purge HTML files to release quota
        purgeOnQuotaError: true
      })
    ]
  })
)
