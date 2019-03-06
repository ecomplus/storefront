#!/usr/bin/env node

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
    // core Node.js modules
    const path = require('path')
    const fs = require('fs')

    if (process.argv.length >= 6) {
      // node ./index.js ~/mytheme/scss ~/mytheme/dist 333 fff
      // save _brand.scss with received RGBs first
      let primary = process.argv[4]
      let secondary = process.argv[5]
      let scss = '$primary: #' + primary + '; $secondary: #' + secondary + ';'
      fs.writeFileSync(path.join(baseDir, '/_brand.scss'), scss)
    }

    // get current main SCSS file based on module directory
    const mainSass = path.join(__dirname, '..', '/scss/storefront-twbs.scss')
    // output file path
    const outFile = path.join(outputDir, '/storefront-twbs.min.css')
    compile(mainSass, {
      outFile,
      sourceMap: true,
      includePaths: [ baseDir ]
    }).then(result => {
      // save CSS and map files
      fs.writeFileSync(outFile, result.css)
      fs.writeFileSync(outFile + '.map', result.map)
    })

    // recursive copy theme assets folder
    const ncp = require('ncp').ncp
    ncp.limit = 16
    const assetsSrc = path.join(baseDir, 'theme', 'assets')
    // check if assets path exists and is a directory
    fs.stat(assetsSrc, (err, stats) => {
      if (!err && stats.isDirectory()) {
        // start copying
        ncp(assetsSrc, path.join(outputDir, 'assets'), err => {
          if (err) {
            console.error(err)
          }
        })
      }
    })
  }
} else {
  module.exports = compile
}
