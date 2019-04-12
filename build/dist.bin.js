#!/usr/bin/env node

process.env.NODE_ENV = 'production'

// build bundles with webpack
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
  webpack(config, (err, stats) => {
    // console.log(stats)
    if (err || stats.hasErrors()) {
      // handle errors here
      fatalError(err)
    }
    // done processing webpack
  })
})
