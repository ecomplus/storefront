'use strict'

const path = require('path')
const paths = require('./paths')
const fs = require('fs')

// entry files
const entry = {}
// default module first
entry.storefront = [path.resolve(paths.scss, 'styles.scss')]
// index.js must be the last to export lib correctly if any
entry.storefront.push(path.resolve(paths.js, 'index.js'))

// additional modules
;['scss', 'js'].forEach(filetype => {
  const srcPath = paths[filetype]
  const ext = `.${filetype}`
  fs.readdirSync(srcPath).forEach(file => {
    switch (file) {
      case 'index.js':
      case 'styles.scss':
        // already included on default module
        break
      default:
        if (file.endsWith(ext) && !file.startsWith('_')) {
          const name = file.replace(ext, '')
          if (!entry[name]) {
            const filepath = path.resolve(srcPath, file)
            // ensure it's not a directory
            if (!fs.statSync(filepath).isDirectory()) {
              entry[name] = filepath
            }
          }
        }
    }
  })
})

module.exports = entry
