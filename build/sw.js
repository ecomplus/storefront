/* global workbox */

workbox.core.skipWaiting()
workbox.core.clientsClaim()

/* global self */

workbox.precaching.precacheAndRoute(self.__precacheManifest)
