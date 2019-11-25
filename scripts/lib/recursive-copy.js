'use strict'

const path = require('path')
const fs = require('fs')

const recursiveCopy = (from, to, overwrite = true) => {
  if (!fs.statSync(from).isDirectory()) {
    if (!fs.existsSync(to) || overwrite) {
      fs.copyFileSync(from, to)
    }
  } else {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to)
    }
    const files = fs.readdirSync(from)
    files.forEach(file => {
      recursiveCopy(path.join(from, file), path.join(to, file), overwrite)
    })
  }
}

module.exports = recursiveCopy
