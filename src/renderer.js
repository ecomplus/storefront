'use strict'

const path = require('path')
const paths = require('./lib/paths')
const fs = require('fs')
const ejs = require('ejs')
const getStoreData = require('./lib/get-store-data')
const ecomUtils = require('@ecomplus/utils')
const ecomClient = require('@ecomplus/client')
const config = require('./lib/config')

// prepare templates for E-Com Plus store resources
const templates = {}
;[
  'products',
  'brands',
  'categories',
  'collections'
].forEach(resource => {
  const filename = path.resolve(paths.pages, `#${resource}.ejs`)
  try {
    const markup = fs.readFileSync(filename, 'utf8')
    // EJS compile enabling includes and async/await support
    templates[resource] = ejs.compile(markup, {
      filename,
      async: true
    })
  } catch (err) {
    console.error(err)
  }
})

// setup initial template data
const data = {
  ...config,
  // function to get CMS JSON content
  cms: file => require(path.resolve(paths.content, `${file}.json`)),
  ecomUtils,
  ecomClient
}
const dataPromise = getStoreData().then(storeData => Object.assign(data, storeData))

const slugRegex = /\/((?!(?:admin|assets|img)(\/|$))[^.]+)(\.(?!js|css|xml|txt|png|gif|jpg|jpeg|webp|svg)[^.]+)*$/

module.exports = url => dataPromise
  .then(() => {
    if (url === '/' || slugRegex.test(url)) {
      // it is a valid page URL
      // must be prerendered
      return templates.products(data)
    } else {
      // static file URL
      // must continue serving normally
      return false
    }
  })
  .catch(err => {
    console.error(new Error('Could not load initial template data'))
    console.error(err)
    throw err
  })
