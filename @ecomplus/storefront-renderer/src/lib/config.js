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
const primaryColor = settings.primary_color || '#20c997'
const secondaryColor = settings.secondary_color || '#343a40'
const lang = settings.lang || 'en_us'
// number Store ID from content settings or env var
let storeId = settings.store_id || process.env.ECOM_STORE_ID || 1011
if (typeof storeId === 'string') {
  storeId = parseInt(storeId, 10)
}

// imported storefront template and components packages
const templatePkg = process.env.STOREFRONT_TEMPLATE || '@ecomplus/storefront-template'
const componentsPkg = process.env.STOREFRONT_COMPONENTS || '@ecomplus/storefront-components'

module.exports = {
  devMode,
  settings,
  lang,
  storeId,
  primaryColor,
  secondaryColor,
  templatePkg,
  componentsPkg
}
