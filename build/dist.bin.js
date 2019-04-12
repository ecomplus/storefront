#!/usr/bin/env node

'use strict'

process.env.NODE_ENV = 'production'

// build bundles and HTML views with webpack
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')()

const fatalError = err => {
  if (err) {
    console.error(err)
  }
  // exit with failure
  process.exit(1)
}

webpackConfig.catch(fatalError).then(config => {
  webpack({
    mode: 'production',
    ...config
  }, (err, stats) => {
    // console.log(stats)
    if (err) {
      fatalError(err)
    }

    // check and handle webpack errors and warnings
    const info = stats.toJson()
    if (stats.hasErrors()) {
      let err = info.errors
      fatalError(err)
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
  })
})
