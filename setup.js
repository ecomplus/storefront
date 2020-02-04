#!/usr/bin/env node

'use strict'

const path = require('path')
const fse = require('fs-extra')

const recursiveCopy = (source, dest) => {
  fse.ensureDirSync(dest)
  fse.copySync(source, dest)
}

const recursiveMatchFiles = (dir, regex, files = []) => {
  fse.readdirSync(dir).forEach(filename => {
    const filepath = path.join(dir, filename)
    if (fse.statSync(filepath).isDirectory()) {
      recursiveMatchFiles(filepath, regex, files)
    } else if (regex.test(filename)) {
      files.push({ dir, filename, filepath })
    }
  })
  return files
}

const renameFiles = (dir, regex, newExt) => {
  recursiveMatchFiles(dir, regex).forEach(({ dir, filename, filepath }) => {
    fse.renameSync(filepath, path.join(dir, filename.split('.')[0] + `.${newExt}`))
  })
}

const deleteFiles = (dir, regex) => {
  recursiveMatchFiles(dir, regex).forEach(({ filepath }) => {
    fse.unwatchFile(filepath)
  })
}

const prepareStorefrontTwbs = () => {
  const scssDir = path.join(__dirname, 'packages/@ecomplus/storefront-twbs/scss')

  recursiveCopy(
    path.join(__dirname, 'node_modules/bootstrap/scss'),
    path.join(scssDir, 'bootstrap/scss')
  )

  recursiveCopy(
    path.join(__dirname, 'node_modules/animate.css/source'),
    path.join(scssDir, 'animate.css/source')
  )

  renameFiles(scssDir, /\.css$/i, 'scss')
  deleteFiles(scssDir, /\.(?!scss)[a-z]+$/i)
}

prepareStorefrontTwbs()
