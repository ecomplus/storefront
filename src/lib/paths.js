'use strict'

// use Node.js path module for compatibility
const path = require('path')

// input directories
const src = path.resolve(process.cwd(), 'template')
const js = path.resolve(src, 'js')
const scss = path.resolve(src, 'scss')
const pages = path.resolve(src, 'pages')
const pub = path.resolve(src, 'public')
const img = path.resolve(pub, 'img')
const content = path.resolve(process.cwd(), 'content')
const modules = path.resolve(process.cwd(), 'node_modules')
// outpur dir
const output = path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : '.serve')

// exports project folders
module.exports = {
  src,
  js,
  scss,
  pages,
  pub,
  img,
  content,
  modules,
  output
}
