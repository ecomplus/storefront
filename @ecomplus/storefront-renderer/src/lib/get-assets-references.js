'use strict'

module.exports = (assetsByChunkName, cb) => {
  // map assets to replace from absolute filename to output chunk with hash
  const entryAssetsReference = {}
  for (const chunkName in assetsByChunkName) {
    const assets = assetsByChunkName[chunkName]
    if (
      Array.isArray(assets) &&
      typeof assets[0] === 'string' &&
      !assets[0].startsWith('chunk.')
    ) {
      assets.forEach(outputFilename => {
        const ext = outputFilename.split('.').pop()
        if (ext !== 'map') {
          // eg.: storefront.js => storefront.{hash}.js
          const refFilename = `${chunkName}.${ext}`
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
