'use strict'

const entry = require('./entry')

module.exports = (assetsByChunkName, cb) => {
  // map assets to replace from absolute filename to output chunk with hash
  const entryAssetsReference = {}
  for (const entryName in entry) {
    if (entry[entryName] && Array.isArray(assetsByChunkName[entryName])) {
      assetsByChunkName[entryName].forEach(outputFilename => {
        const ext = outputFilename.split('.').pop()
        if (ext !== 'map') {
          // eg.: storefront.js => storefront.{hash}.js
          const refFilename = `${entryName}.${ext}`
          entryAssetsReference[refFilename] = outputFilename

          if (typeof cb === 'function') {
            cb(null, { outputFilename, refFilename })
          }
        }
      })
    }
  }

  return entryAssetsReference
}
