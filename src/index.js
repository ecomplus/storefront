'use strict'

/*
Build the strorefront for procution
Consume E-Com Plus APIs and headless CMS content
*/

const fs = require('fs')
// const https = require('https')
// output directory
const dir = './dist'

// EJS for templating
// https://ejs.co/
const ejs = require('ejs')

const build = () => {
  // homepage
  ejs.renderFile('./src/views/index.ejs', {}, {}, (err, html) => {
    if (!err) {
      fs.writeFile('./dist/index.html', html, err => {
        if (err) {
          return console.error(err)
        }
      })
    }
  })

  // copy static folder content
  const ncp = require('ncp').ncp
  ncp.limit = 16
  ncp('./static', './dist', err => {
    if (err) {
      return console.error(err)
    }
  })
}

// create dist directory or clear it
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
  build()
} else {
  // clear dir content
  const rimraf = require('rimraf')
  rimraf(dir + '/*', () => {
    build()
  })
}
