'use strict'

const paths = require('./lib/paths')
const config = require('./lib/config')
const getStoreData = require('./lib/get-store-data')
const getCmsData = require('./lib/get-cms-data')
const webpackConfig = require('./webpack.config')
const renderer = require('./middlewares/renderer')

module.exports = {
  paths,
  config,
  getCmsData,
  getStoreData,
  webpackConfig,
  renderer
}
