#!/usr/bin/env node

'use strict'

console.log('[INSTALL] @ecomplus/storefront-template')

const path = require('path')
const fs = require('fs')
const recursiveCopy = require('./lib/recursive-copy')

const dirBase = process.env.INIT_CWD
const dirDest = path.join(dirBase, process.env.TEMPLATE_DIR || 'template')
const dirTemplate = path.join(__dirname, '../template')

if (dirTemplate === dirDest) {
  console.log('[SKIP] same template directories')
} else {
  let runTemplateCopy
  try {
    runTemplateCopy = fs.statSync(dirDest).isDirectory()
  } catch (e) {
    runTemplateCopy = false
  }

  if (runTemplateCopy) {
    const copyFolder = (pathFrom, pathsTo) => {
      let dirTo = dirDest
      pathsTo.forEach(folder => {
        dirTo = path.join(dirTo, folder)
        if (!fs.existsSync(dirTo)) {
          fs.mkdirSync(dirTo)
        }
      })
      const dirFrom = path.join(dirTemplate, pathFrom)
      recursiveCopy(dirFrom, dirTo)
      console.log(`[OK] files copied to ${dirTo.slice(dirBase.length)} folder`)
    }

    copyFolder('public/admin', ['public', 'admin', 'cms'])
    console.log('[DONE] @ecomplus/storefront-template')
  }
}

console.log()
