const functions = require('firebase-functions')

const { ssr } = require('@ecomplus/storefront-renderer/functions/')

exports.ssr = functions.https.onRequest((req, res) => ssr(req, res))
