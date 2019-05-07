#!/usr/bin/env node

'use strict'

process.env.NODE_ENV = 'production'

// Node.js modules
const path = require('path')
const fs = require('fs')
// load project directories
const { output } = require('./lib/paths')

// build bundles and HTML views with webpack
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')()

const fatalError = err => {
  if (err) {
    console.error(err)
  }
  // exit with failure
  process.exit(1)
}

webpackConfig.catch(fatalError).then(config => {
  webpack({
    mode: process.env.NODE_ENV,
    ...config
  }, (err, stats) => {
    // console.log(stats)
    if (err) {
      fatalError(err)
    }

    // check and handle webpack errors and warnings
    const info = stats.toJson()
    if (stats.hasErrors()) {
      let err = info.errors
      fatalError(err)
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    // list store slugs from E-Com Plus APIs
    require('./lib/slugs').catch(fatalError).then(slugsByResources => {
      // prerender products, brands, collections and categories pages
      const renderer = require('@ecomplus/storefront-renderer')
      // mkdir -p
      const mkdirp = require('mkdirp')

      const writePage = (slug, dom) => {
        // save HTML file for new page by slug
        let file = path.join(output, slug + '.html')
        // create directories for the slug if needed
        mkdirp(path.dirname(file), err => {
          if (!err) {
            // write the prerendered HTML file from jsdom object
            fs.writeFile(file, dom.serialize(), err => {
              if (err) console.error(err)
            })
            console.log('SUCCESS\n')
          } else {
            console.error(err)
          }
        })
      }

      const render = (slug, html) => new Promise(resolve => {
        console.log(slug)
        // force DOM location to current slug
        let url = 'https://storefront:443/' + slug
        // call renderer function to get Ecom and dom objects from promise
        renderer(html, url).then(({ dom, Ecom }) => {
          // init renderization
          Ecom.init()
            .then(() => writePage(slug, dom))
            .catch(err => console.error(err))
            // 600ms interval between each renderization
            .finally(() => setTimeout(resolve, 600))
        })
      })

      // read HTML template files by resource
      const handleResource = resource => new Promise(resolve => {
        let slugs = slugsByResources[resource]
        fs.readFile(path.join(output, '_' + resource + '.html'), 'utf8', async (err, html) => {
          if (err) {
            console.error(err)
            // resolve the promise anyway
            resolve()
          } else {
            // prerender each slug
            // one by one to prevent 503 errors
            for (let i = 0; i < slugs.length; i++) {
              let slug = slugs[i]
              await render(slug, html)
            }
          }
          resolve()
        })
      })

      // run pages prerenderization one by one
      ;(async function loop () {
        for (let resource in slugsByResources) {
          if (slugsByResources.hasOwnProperty(resource)) {
            await handleResource(resource)
          }
        }
      }())
    })
  })
})
