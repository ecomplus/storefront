'use strict'

console.log('[POSTINSTALL] @ecomplus/storefront-template')

const path = require('path')
const fs = require('fs')

const dir = path.join(__dirname, 'dist/lib')
let copyTo = path.join(process.env.INIT_CWD, 'template/public')
;['assets', 'storefront-template'].forEach(folder => {
  copyTo = path.join(copyTo, folder)
  if (!fs.existsSync(copyTo)) {
    fs.mkdirSync(copyTo)
  }
})

fs.readdir(dir, (err, files) => {
  if (!err) {
    files.forEach(file => {
      fs.copyFileSync(path.join(dir, file), path.join(copyTo, file))
    })
    console.log('[OK] JS bundles copied to @/template/public folder')
    console.log()
  } else {
    console.error(err)
  }
})
