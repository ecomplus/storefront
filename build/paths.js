'use strict'

// use Node.js path module for compatibility
const path = require('path')

// input directories
const src = path.resolve(process.cwd(), 'template')
const pub = path.resolve(process.cwd(), 'template/public')
// outpur dir
const output = path.resolve(process.cwd(), 'dist')

// exports project folders
module.exports = {
  src,
  pub,
  output
}
