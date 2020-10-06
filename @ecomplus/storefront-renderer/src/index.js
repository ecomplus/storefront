'use strict'

const getAssetsReferences = require('./lib/get-assets-references')
const renderer = require('./renderer')
const minifyHtml = require('./lib/minify-html')

module.exports = {
  getAssetsReferences,
  renderer,
  minifyHtml
}
