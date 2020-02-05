'use strict'

const devMode = process.env.NODE_ENV !== 'production'

const path = require('path')
const paths = require('./paths')

// setup ganaral config properties
let settings
try {
  settings = require(path.join(paths.content, 'settings.json'))
} catch (err) {
  console.error(err)
  settings = {}
}
const primaryColor = settings.primary_color || '#3fe3e3'
const secondaryColor = settings.secondary_color || '#5e1efe'
const lang = settings.lang || 'en_us'
// number Store ID from content settings or env var
let storeId = settings.store_id || process.env.ECOM_STORE_ID || 1011
if (typeof storeId === 'string') {
  storeId = parseInt(storeId, 10)
}
// imported storefront template
const templatePkg = process.env.STOREFRONT_TEMPLATE || '@ecomplus/storefront-template'

module.exports = {
  devMode,
  settings,
  lang,
  storeId,
  primaryColor,
  secondaryColor,
  templatePkg
}
