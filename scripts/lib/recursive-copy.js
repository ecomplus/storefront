'use strict'

const path = require('path')
const fs = require('fs')

const recursiveCopy = (from, to) => {
  if (!fs.statSync(from).isDirectory()) {
    fs.copyFileSync(from, to)
  } else {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to)
    }
    const files = fs.readdirSync(from)
    files.forEach(file => {
      recursiveCopy(path.join(from, file), path.join(to, file))
    })
  }
}

module.exports = recursiveCopy
