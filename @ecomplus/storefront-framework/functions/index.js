const functions = require('firebase-functions')

const { ssr } = require('@ecomplus/storefront-renderer/functions/')

exports.ssr = functions.https.onRequest((req, res) => {
  return ssr(req, res, statusCode => {
    switch (statusCode) {
      case 200:
        return 'public, max-age=60, s-maxage=604800'
      case 404:
        return 'public, max-age=60, s-maxage=86400'
    }
    return 'public, max-age=30, s-maxage=3600'
  })
})
