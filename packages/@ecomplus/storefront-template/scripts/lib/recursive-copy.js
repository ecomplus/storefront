'use strict'

const path = require('path')
const fs = require('fs')
const merge = require('lodash.merge')

const recursiveCopy = (from, to, overwrite = true, mergeJson = false) => {
  if (!fs.statSync(from).isDirectory()) {
    if (!fs.existsSync(to) || overwrite) {
      fs.copyFileSync(from, to)
    } else if (mergeJson && to.endsWith('.json')) {
      const newObject = merge(
        JSON.parse(fs.readFileSync(from, 'utf8')),
        JSON.parse(fs.readFileSync(to, 'utf8'))
      )
      fs.writeFileSync(to, JSON.stringify(newObject, null, 2), 'utf8')
    }
  } else {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to)
    }
    const files = fs.readdirSync(from)
    files.forEach(file => {
      recursiveCopy(path.join(from, file), path.join(to, file), overwrite, mergeJson)
    })
  }
}

module.exports = recursiveCopy
