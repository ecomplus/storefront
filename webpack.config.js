'use strict'

process.env.WEBPACK_BUILD_LIB = true
const path = require('path')
const config = require('@ecomplus/storefront-framework/src/webpack.config')

module.exports = [
  config,
  {
    ...config,
    entry: path.resolve(__dirname, 'template/js/index.js'),
    output: {
      ...config.output,
      path: path.resolve(config.output.path, 'lib'),
      library: '__storefront_template',
      libraryTarget: 'umd',
      filename: 'storefront-template.js'
    },
    externals: /^[^./].*$/
  }
]
