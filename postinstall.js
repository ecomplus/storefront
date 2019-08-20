'use strict'

console.log('[POSTINSTALL] @ecomplus/storefront-template')

const path = require('path')
const fs = require('fs')
const dirBase = process.env.INIT_CWD
const dirDest = path.join(dirBase, 'template/public')

if (fs.statSync(dirDest).isDirectory()) {
  let pathsTo, dirFrom

  const copyFolder = () => {
    let dirTo = dirDest
    pathsTo.forEach(folder => {
      dirTo = path.join(dirTo, folder)
      if (!fs.existsSync(dirTo)) {
        fs.mkdirSync(dirTo)
      }
    })

    const files = fs.readdirSync(dirFrom)
    files.forEach(file => {
      const filepath = path.join(dirFrom, file)
      if (!fs.statSync(filepath).isDirectory()) {
        fs.copyFileSync(filepath, path.join(dirTo, file))
      }
    })
    console.log(`[OK] files copied to ${dirTo.slice(dirBase.length)} folder`)
  }

  dirFrom = path.join(__dirname, 'dist/lib')
  pathsTo = ['assets', 'storefront-template']
  copyFolder()

  dirFrom = path.join(__dirname, 'template/public/admin')
  pathsTo = ['admin', 'cms']
  copyFolder()

  console.log('[DONE] @ecomplus/storefront-template')
}

console.log()
