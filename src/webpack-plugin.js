'use strict'

// import build theme function
const buildTheme = require('@ecomplus/storefront-twbs').build

// create a Webpack plugin
class StorefrontTwbsPlugin {
  constructor (options) {
    this.options = options || {}
  }

  // `apply` as its prototype method which is supplied with compiler as its argument
  apply (compiler) {
    // use `done` hook to build the theme after Webpack compilation
    compiler.hooks.done.tap(
      'StorefrontTwbsPlugin',
      stats => {
        const { baseDir, outputDir, primaryColor, secondaryColor } = this.options
        // create ourput dir if not exists
        const fs = require('fs')
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir)
        }
        // build {outputDir}/storefront-twbs.min.css
        buildTheme(baseDir, outputDir, primaryColor, secondaryColor)
      }
    )
  }
}

module.exports = StorefrontTwbsPlugin
