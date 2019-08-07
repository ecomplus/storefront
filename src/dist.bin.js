#!/usr/bin/env node

'use strict'

const { ECOM_STORE_ID } = process.env
process.env.NODE_ENV = 'production'

// Node.js modules
const path = require('path')
const fs = require('fs')
// mkdir -p
const mkdirp = require('mkdirp')
// load project directories
const { output } = require('./lib/paths')
// client to get content from E-Com Plus public APIs
const ecomClient = require('@ecomplus/client')
// list all resource slugs with storefront router
const EcomRouter = require('@ecomplus/storefront-router')
const router = new EcomRouter(ECOM_STORE_ID)
// build bundles and HTML views with webpack
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpackConfig()
  .then(config => {
    webpack({
      mode: process.env.NODE_ENV,
      ...config
    }, (err, stats) => {
      if (err) {
        throw err
      }

      // check and handle webpack errors and warnings
      const { errors, warnings } = stats.toJson()
      if (stats.hasErrors()) {
        throw errors
      }
      if (stats.hasWarnings()) {
        console.warn(warnings)
      }

      // list store slugs from E-Com Plus APIs
      router.list()
        .then(routes => {
          routes.forEach(route => {
            console.log(route.resource)
            router.resolve(route)
              .then(context => {
                console.log(context.body)
              })
              .catch(error => { throw error })
          })
        })
        .catch(fatalError)

      router.list().then(slugsByResources => {
        // prerender products, brands, collections and categories pages
        const renderer = require('@ecomplus/storefront-renderer')
        // mkdir -p
        const mkdirp = require('mkdirp')

        const writePage = (slug, dom) => {
          // save HTML file for new page by slug
          let file = path.join(output, slug ? slug + '.html' : 'index.html')
          // create directories for the slug if needed
          mkdirp(path.dirname(file), err => {
            if (!err) {
              // write the prerendered HTML file from jsdom object
              fs.writeFile(file, dom.serialize(), err => {
                if (err) console.error(err)
              })
              // color green
              console.log('\x1b[32m%s\x1b[0m', 'DONE\n')
            } else {
              // color red
              console.error('\x1b[31m%s\x1b[0m', err)
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

        const renderFile = (file, slugs) => new Promise(resolve => {
          fs.readFile(path.join(output, file), 'utf8', async (err, html) => {
            if (err) {
              console.error(err)
              // resolve the promise anyway
              resolve()
            } else {
              // prerender each slug
              // one by one to prevent 503 errors
              for (let i = 0; i < slugs.length; i++) {
                let slug = slugs[i]
                if (slug !== undefined) {
                  await render(slug, html)
                }
              }
            }
            resolve()
          })
        })

        // run pages prerenderization one by one
        ;(async function loop () {
          // prerender each resource
          for (let resource in slugsByResources) {
            if (slugsByResources.hasOwnProperty(resource)) {
              // HTML template files by resource
              let file = '_' + resource + '.html'
              let slugs = slugsByResources[resource]
              await renderFile(file, slugs)
            }
          }

          // prerender homepage
          await renderFile('index.html', [ null ])
        }())
      })
    })
  })

  .catch(err => {
    if (err) {
      console.error(err)
    }
    // exit with failure
    process.exit(1)
  })
