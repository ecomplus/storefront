#!/usr/bin/env node

'use strict'

const pkg = require('./../package.json')
console.log(` \n[INSTALL] ${pkg.name}@${pkg.version}`)

const path = require('path')
const fs = require('fs')
const recursiveCopy = require('./lib/recursive-copy')

const dirBase = process.env.TEMPLATE_DIR
  ? path.join(process.env.INIT_CWD, process.env.TEMPLATE_DIR)
  : process.env.INIT_CWD

const copyFolder = ({
  dirTemplate,
  pathDest,
  pathFrom,
  pathsTo,
  overwrite = true,
  mergeJson = false
}) => {
  if (!fs.existsSync(dirTemplate)) {
    const slitedDirs = dirTemplate.split('node_modules')
    if (slitedDirs.length > 1) {
      dirTemplate = path.join(
        slitedDirs[0],
        '../../node_modules',
        slitedDirs.slice(1).join('/')
      )
    }
  }
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
      console.log(`[COPY] read files from ${dirFrom.replace(/^.*node_modules/, '')}`)
      recursiveCopy(dirFrom, dirTo, overwrite, mergeJson)
      console.log(`[OK] files copied to ${dirTo.slice(dirBase.length)} folder`)
    }
  }
}

;['dictionary', 'widgets'].forEach(contentFolder => {
  copyFolder({
    dirTemplate: path.join(__dirname, '../content'),
    pathFrom: contentFolder,
    pathDest: 'content',
    pathsTo: [contentFolder],
    overwrite: false,
    mergeJson: true
  })
})

copyFolder({
  dirTemplate: path.join(__dirname, '../template'),
  pathFrom: 'public/assets',
  pathDest: 'template',
  pathsTo: ['public', 'assets']
})

copyFolder({
  dirTemplate: path.join(process.cwd(), 'node_modules/photoswipe'),
  pathFrom: 'dist/default-skin',
  pathDest: 'template',
  pathsTo: ['public', 'assets', 'vendor', 'photoswipe']
})

console.log('[DONE] @ecomplus/storefront-template')
console.log()
