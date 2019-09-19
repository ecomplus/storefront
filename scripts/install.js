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

const copyFolder = (pathBase, pathFrom, pathsTo, overwrite = true) => {
  const dirDest = path.join(dirBase, pathBase)
  const dirTemplate = path.join(__dirname, `../${pathBase}`)

  if (dirTemplate === dirDest) {
    console.log(`[SKIP] same '${pathBase}' directories`)
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

copyFolder('template', 'public/admin', ['public', 'admin'])
copyFolder('content', 'widgets', ['widgets'], false)

console.log('[DONE] @ecomplus/storefront-template')
console.log()
