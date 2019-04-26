'use strict'

// use Node.js path module for compatibility
const path = require('path')

// input directories
const src = path.resolve(process.cwd(), 'template')
const pub = path.resolve(process.cwd(), 'template/public')
const content = path.resolve(process.cwd(), 'content')
// outpur dir
const output = path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'test')

// exports project folders
module.exports = {
  src,
  pub,
  content,
  output
}
