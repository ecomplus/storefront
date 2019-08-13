'use strict'

process.env.WEBPACK_BUILD_LIB = true
const config = require('@ecomplus/storefront-framework/src/webpack.config')

module.exports = [
  config,
  {
    ...config,
    output: {
      ...config.output,
      library: '__storefront_template',
      libraryTarget: 'umd',
      filename: 'storefront.lib.js'
    },
    externals: /^[^./].*$/
  }
]
