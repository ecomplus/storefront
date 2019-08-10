#!/usr/bin/env node

'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs')
const path = require('path')
const paths = require('./../../lib/paths')
const recursiveReaddir = require('recursive-readdir')
const mkdirp = require('mkdirp')
const htmlMinifier = require('html-minifier')
const StorefrontRouter = require('@ecomplus/storefront-router')
const cmsCollections = require('./../../lib/cms-collections')
const bundler = require('./../bundler')
const renderer = require('./../../renderer')
const { storeId } = require('./../../lib/config')

const prerender = (url, route) => new Promise((resolve, reject) => {
  // debug
  console.log()
  console.log('----  //  ----')
  console.log()
  console.log(url)
  if (route) {
    console.log(JSON.stringify(route, null, 2))
  }
  // console colors
  const clGreen = '\x1b[32m%s\x1b[0m'
  const clYellow = '\x1b[33m%s\x1b[0m'
  const clRed = '\x1b[31m%s\x1b[0m'

  // prerender view
  renderer(url, route)
    .then(html => {
      if (html) {
        // try to minify HTML output
        try {
          const htmlMin = htmlMinifier.minify(html, {
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true
          })
          if (htmlMin) {
            html = htmlMin
          }
        } catch (e) {
          // skip minification
        }

        // save HTML file on output folder
        const filepath = path.join(paths.output, `${url}.html`)
        // create directories for if needed
        mkdirp(path.dirname(filepath), err => {
          if (!err) {
            fs.writeFile(filepath, html, err => err ? console.error(clRed, err) : true)
            console.log(clGreen, 'DONE')
          } else {
            console.error(clRed, err)
          }
          resolve()
        })
      } else {
        console.log(clYellow, `Render output: ${JSON.stringify(html)}`)
        resolve()
      }
    })
    .catch(err => console.error(clRed, err))
})

bundler.then(async () => {
  // list and prerender all storefront routes
  const router = new StorefrontRouter(storeId)
  const routes = await router.list()
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    await prerender(route.path, route)
  }

  // build all CMS folder collection slugs
  for (let i = 0; i < cmsCollections.length; i++) {
    const collection = cmsCollections[i]
    const collSrc = path.join(paths.content, collection)
    let files
    try {
      files = await recursiveReaddir(collSrc)
    } catch (e) {
      // directory not found ?
    }
    if (Array.isArray(files)) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith('.json')) {
          // get slug and url from filename
          const [, slug] = files[i].slice(collSrc.length).replace('.json', '').split(path.sep)
          const url = `/${collection}/${slug}`
          await prerender(url, { path: url, collection, slug })
        }
      }
    }
  }

  // check additional page views
  // read all page views recursivily
  const files = await recursiveReaddir(paths.pages)
  for (let i = 0; i < files.length; i++) {
    if (files[i].endsWith('.ejs')) {
      // fix url string from filename
      let url = files[i].slice(paths.pages.length).replace('.ejs', '')
      const firstChar = url.charAt(1)
      if (firstChar !== '#' && firstChar !== '@') {
        if (path.sep !== '/') {
          url = url.replace(path.sep, '/')
        }
        await prerender(url)
      }
    }
  }
})
