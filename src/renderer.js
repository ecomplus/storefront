'use strict'

const path = require('path')
const paths = require('./lib/paths')
const fs = require('fs')
const ejs = require('ejs')
const ecomUtils = require('@ecomplus/utils')
const ecomClient = require('@ecomplus/client')
const StorefrontRouter = require('@ecomplus/storefront-router')
const getStoreData = require('./lib/get-store-data')
const cmsCollections = require('./lib/cms-collections')
const config = require('./lib/config')
const MarkdownIt = require('markdown-it')

// precompile EJS templates
const templates = {}
const compileTemplate = (filename, prop) => {
  try {
    const markup = fs.readFileSync(filename, 'utf8')
    // EJS compile enabling includes and async/await support
    templates[prop] = ejs.compile(markup, {
      filename,
      async: true
    })
  } catch (err) {
    console.error(err)
  }
}

// prepare templates for E-Com Plus store resources
;[
  'products',
  'brands',
  'categories',
  'collections'
].forEach(resource => {
  const filename = path.resolve(paths.pages, `#${resource}.ejs`)
  compileTemplate(filename, resource)
})

// also prepare templates for CMS collections
cmsCollections.forEach(collection => {
  const filename = path.resolve(paths.pages, `#cms/${collection}.ejs`)
  compileTemplate(filename, collection)
})

// setup initial template data
const data = {
  ...config,
  // function to get CMS JSON content
  cms: file => require(path.resolve(paths.content, `${file}.json`)),
  // markdown parser
  md: new MarkdownIt(),
  ecomUtils,
  ecomClient
}
const dataPromise = getStoreData().then(storeData => Object.assign(data, storeData))

// setup storefront router
const router = new StorefrontRouter(config.storeId)
const slugRegex = /\/((?!(?:assets|img)(\/|$))[^.]+)(\.(?!js|css|xml|txt|png|gif|jpg|jpeg|webp|svg)[^.]+)*$/

module.exports = (url, route) => dataPromise

  .then(() => {
    if (url === '/') {
      url = '/index'
    } else if (!slugRegex.test(url)) {
      // static file URL
      // must continue serving normally
      return false
    }

    // it is a valid page URL
    // should be prerendered
    try {
      const filename = path.resolve(paths.pages, url.slice(1) + '.ejs')
      if (fs.existsSync(path.resolve(filename))) {
        // predefined view
        return {
          filename
        }
      }
    } catch (e) {
      // ignore error and test CMS collections and store resources
    }

    const [, collection, slug] = url.split('/')
    if (slug && cmsCollections.indexOf(collection) !== -1) {
      // CMS folder collection
      return {
        path: url,
        collection,
        slug
      }
    } else if (!route) {
      // try to map resource by slug with storefront router
      return router.map(url)
    } else {
      return route
    }
  })

  .then(route => {
    if (route) {
      const { filename, resource, collection } = route
      // render EJS template
      if (filename) {
        // render page specific EJS file
        return new Promise((resolve, reject) => {
          ejs.renderFile(filename, data, { async: true }, (err, html) => {
            if (err) {
              reject(err)
            } else {
              resolve(html)
            }
          })
        })
      }
      return templates[resource || collection]({ ...data, route })
    }
    return route
  })

  .catch(err => {
    const { response } = err
    if (response && response.status < 500) {
      // not a server error
      // route not found ?
      return false
    }
    console.error(err)
    throw err
  })
