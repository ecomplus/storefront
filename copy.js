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
  recursiveCopy(path.join(__dirname, folder), path.join(dirDest, folder))
})
