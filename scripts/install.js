#!/usr/bin/env node

'use strict'

const pkg = require('./../package.json')
console.log(`[INSTALL] ${pkg.name}@${pkg.version}`)

const path = require('path')
const fs = require('fs')
const recursiveCopy = require('./lib/recursive-copy')

const dirBase = process.env.TEMPLATE_DIR
  ? path.join(process.env.INIT_CWD, process.env.TEMPLATE_DIR)
  : process.env.INIT_CWD

const copyFolder = ({ dirTemplate, pathDest, pathFrom, pathsTo, overwrite = true }) => {
  const dirDest = path.join(dirBase, pathDest)

  if (dirTemplate === dirDest) {
    console.log(`[SKIP] same '${pathDest}' directories`)
  } else {
    let runTemplateCopy
    if (fs.existsSync(dirDest)) {
      runTemplateCopy = fs.statSync(dirDest).isDirectory()
    } else if (process.env.TEMPLATE_DIR) {
      fs.mkdirSync(dirDest)
      runTemplateCopy = true
    }

    if (runTemplateCopy) {
      let dirTo = dirDest
      pathsTo.forEach(folder => {
        dirTo = path.join(dirTo, folder)
        if (!fs.existsSync(dirTo)) {
          fs.mkdirSync(dirTo)
        }
      })
      const dirFrom = path.join(dirTemplate, pathFrom)
      recursiveCopy(dirFrom, dirTo, overwrite)
      console.log(`[OK] files copied to ${dirTo.slice(dirBase.length)} folder`)
    }
  }
}

copyFolder({
  dirTemplate: path.join(__dirname, '../template'),
  pathFrom: 'public/admin',
  pathDest: 'template',
  pathsTo: ['public', 'admin']
})

copyFolder({
  dirTemplate: path.join(__dirname, '../content'),
  pathFrom: 'widgets',
  pathDest: 'content',
  pathsTo: ['widgets'],
  overwrite: false
})

copyFolder({
  dirTemplate: path.join(process.cwd(), 'node_modules/@ecomplus/storefront-app'),
  pathFrom: 'dist/lib',
  pathDest: 'template',
  pathsTo: ['public', 'assets', 'vendor', 'storefront-app']
})

copyFolder({
  dirTemplate: path.join(process.cwd(), 'node_modules/photoswipe'),
  pathFrom: 'dist/default-skin',
  pathDest: 'template',
  pathsTo: ['public', 'assets', 'vendor', 'photoswipe']
})

console.log('[DONE] @ecomplus/storefront-template')
console.log()
