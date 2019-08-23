'use strict'

const path = require('path')
const fs = require('fs')
const recursiveCopy = require('./lib/recursive-copy')

let dirDest = process.cwd()
for (let i = 0; i < process.argv.length; i++) {
  const prefix = '--dest='
  if (process.argv[i].startsWith(prefix)) {
    dirDest = path.resolve(dirDest, process.argv[i].slice(prefix.length))
    if (!fs.existsSync(dirDest)) {
      fs.mkdirSync(dirDest)
    }
    break
  }
}
['template', 'content'].forEach(folder => {
  recursiveCopy(path.join(__dirname, '..', folder), path.join(dirDest, folder))
})
