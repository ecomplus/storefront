'use strict'

const htmlMinifier = require('html-minifier')

module.exports = (html, entryAssetsReference = {}) => {
  // try to minify HTML output
  try {
    const htmlMin = htmlMinifier.minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeAttributeQuotes: false
    })

    if (htmlMin) {
      html = htmlMin
      // start replacing entry files references with respective outputs
      for (const referenceFilename in entryAssetsReference) {
        const outputFilename = entryAssetsReference[referenceFilename]
        if (outputFilename) {
          const filenameRegex = new RegExp(`(=/)?${referenceFilename}(\\s)?`, 'g')
          html = html.replace(filenameRegex, `$1${outputFilename}$2`)
        }
      }
    }
  } catch (e) {
    // skip minification
  }

  return html
}
