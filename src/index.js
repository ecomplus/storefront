'use strict'

// bind LibSass with Node-sass
const sass = require('node-sass')

// simple function to compile received file
const compile = (file, opts = {}) => {
  // handle a new Promise
  return new Promise((resolve, reject) => {
    // https://www.npmjs.com/package/node-sass#options
    opts = Object.assign({
      file,
      outputStyle: 'compressed'
    }, opts)

    // render and resolve the promise with resultant CSS
    sass.render(opts, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

if (require.main === module) {
  // called directly
  // handle command line task
  // receive at least the directories to output and include as arguments
  if (process.argv.length >= 4) {
    // node ./index.js ~/mytheme/scss ~/mytheme/dist
    let baseDir = process.argv[2]
    let outputDir = process.argv[3]

    if (process.argv.length >= 6) {
      // node ./index.js ~/mytheme/scss ~/mytheme/dist 333 fff
      // save _brand.scss with received RGBs first
      let primary = process.argv[4]
      let secondary = process.argv[5]
      let data = '$primary: ' + primary + '; $secondary: ' + secondary + ';'
      require('fs').writeFileSync(baseDir + '/_brand.scss', data)
    }

    compile('./../scss/storefront-twbs.scss', {
      outFile: outputDir + '/storefront-twbs.min.css',
      sourceMap: true,
      includePaths: [ baseDir ]
    })
  }
} else {
  module.exports = compile
}
