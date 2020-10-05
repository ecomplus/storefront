'use strict'

const paths = require('./lib/paths')
const config = require('./lib/config')
const getStoreData = require('./lib/get-store-data')
const getAssetsReferences = require('./lib/get-assets-references')
const webpackConfig = require('./webpack.config')
const renderer = require('./renderer')
const minifyHtml = require('./lib/minify-html')

module.exports = {
  paths,
  config,
  getStoreData,
  webpackConfig,
  getAssetsReferences,
  renderer,
  minifyHtml
}
