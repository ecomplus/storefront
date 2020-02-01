importScripts("/precache-manifest.332a30270e84a1c944556f72d0af7c90.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* global workbox */

workbox.core.skipWaiting()
workbox.core.clientsClaim()

/* global self */

workbox.precaching.precacheAndRoute(self.__precacheManifest)

/**
 * Runtime caching
 */

// Google Fonts stylesheets
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
)

// underlying font files
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        // large expiration time
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
)

/**
 * E-Com Plus APIs
 * Prefer live content from network
 * Check available hosts: https://github.com/ecomclub/ecomplus-sdk-js/blob/master/main.js
 */

// Main API and Storefront API cache
workbox.routing.registerRoute(
  /^https:\/\/io(storefront)?\.ecvol\.com/,
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20
      })
    ]
  })
)

// Store API cache
workbox.routing.registerRoute(
  /^https:\/\/ioapi?\.ecvol\.com/,
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'store-api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        // purge large JSON files to release quota
        purgeOnQuotaError: true
      })
    ]
  })
)

// Live Store and Search API
workbox.routing.registerRoute(
  /^https:\/\/(?:api|apx-search).e-com\.plus\/(api\/)?v[1-9]+\//,
  new workbox.strategies.NetworkFirst({
    cacheName: 'live-api',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        // keep for 5 minutes only
        maxAgeSeconds: 5 * 60
      })
    ]
  })
)

/**
 * Images with unique URLs from E-Com Plus Storage
 * Check sizes: https://github.com/ecomclub/storage-api/blob/master/bin/web.js#L261
 */

// normal and thumbnail sizes
workbox.routing.registerRoute(
  /^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/[12345]?[0-9]{2}px\//,
  new workbox.strategies.CacheFirst({
    cacheName: 'pictures',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        // 30 days max age
        maxAgeSeconds: 60 * 60 * 24 * 30,
        purgeOnQuotaError: true
      })
    ]
  })
)

// big images
workbox.routing.registerRoute(
  /^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/[678]?[0-9]{2}px\//,
  new workbox.strategies.CacheFirst({
    cacheName: 'pictures-big',
    plugins: [
      new workbox.expiration.Plugin({
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
workbox.routing.registerRoute(
  /\/assets\//,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets'
  })
)

// logo image
workbox.routing.registerRoute(
  /\/((?:img|assets).*)?logo\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'logo'
  })
)

// CMS image uploads
workbox.routing.registerRoute(
  /\/img\/uploads\/.*\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'media',
    plugins: [
      new workbox.expiration.Plugin({
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
workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst())

// any page URL slug
workbox.routing.registerRoute(
  /\/((?!(?:admin|assets|img)(\/|$))[^.]+)(\.(?!js|css|xml|txt|png|gif|jpg|jpeg|webp|svg)[^.]+)*$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'page',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        // purge HTML files to release quota
        purgeOnQuotaError: true
      })
    ]
  })
)

