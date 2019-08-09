'use strict'

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

module.exports = new Promise((resolve, reject) => {
  // start Webpack bundler
  const bundler = webpack(webpackConfig, (err, stats) => {
    if (err) {
      reject(err)
      return
    }
    // check Webpack errors and warnings
    const { errors, warnings } = stats.toJson()
    if (stats.hasErrors()) {
      reject(errors)
      return
    }
    if (stats.hasWarnings()) {
      console.warn(warnings)
    }
    resolve(bundler)
  })
})

  .catch(err => {
    if (err) {
      console.error(err)
    }
    // exit with failure
    process.exit(1)
  })
