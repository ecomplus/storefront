'use strict'

const paths = require('./lib/paths')
const config = require('./lib/config')
const getStoreData = require('./lib/get-store-data')
const webpackConfig = require('./webpack.config')
const renderer = require('./renderer')

module.exports = {
  paths,
  config,
  getStoreData,
  webpackConfig,
  renderer
}
