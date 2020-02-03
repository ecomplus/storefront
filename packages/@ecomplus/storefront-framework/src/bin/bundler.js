#!/usr/bin/env node

'use strict'

const webpack = require('webpack')
const webpackConfig = require('./../webpack.config')

module.exports = new Promise((resolve, reject) => {
  // start Webpack bundler
  const compiler = webpack(webpackConfig, (err, stats) => {
    if (err) {
      reject(err)
      return
    }

    // check Webpack errors and warnings
    const { time, errors, warnings, assetsByChunkName } = stats.toJson()
    if (stats.hasErrors()) {
      reject(errors)
      return
    }
    if (stats.hasWarnings()) {
      console.warn(warnings)
    }

    // resolve with compiler itself and output chunks map
    resolve({ compiler, assetsByChunkName })
    console.log(`\n \n--> Webpack compilation time: ${time}ms\n \n`)
  })
})

  .catch(err => {
    if (err) {
      console.error(err)
    }
    // exit with failure
    process.exit(1)
  })
