#!/usr/bin/env node

'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const paths = require('./../../lib/paths')
const entry = require('./../../lib/entry')
const recursiveReaddir = require('recursive-readdir')
const mkdirp = require('mkdirp')
const htmlMinifier = require('html-minifier')
const StorefrontRouter = require('@ecomplus/storefront-router')
const cmsCollections = require('./../../lib/cms-collections')
const bundler = require('./../bundler')
const renderer = require('./../../renderer')
const { storeId, settings } = require('./../../lib/config')

bundler.then(async ({ assetsByChunkName }) => {
  // map assets to replace from absolute filename to output chunk with hash
  const entryAssetsReference = {}
  for (const entryName in entry) {
    if (entry[entryName] && Array.isArray(assetsByChunkName[entryName])) {
      assetsByChunkName[entryName].forEach(outputFilename => {
        const ext = outputFilename.split('.').pop()
        if (ext !== 'map') {
          // eg.: storefront.js => storefront.{hash}.js
          const refFilename = `${entryName}.${ext}`
          entryAssetsReference[refFilename] = outputFilename
          // copy file as fallback
          fs.copyFileSync(
            path.join(paths.output, outputFilename),
            path.join(paths.output, refFilename)
          )
        }
      })
    }
  }

  const prerender = (url, route) => new Promise(resolve => {
    // debug
    console.log(' \n----  //  ----\n ')
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
              // start replacing entry files references with respective outputs
              for (const referenceFilename in entryAssetsReference) {
                const outputFilename = entryAssetsReference[referenceFilename]
                if (outputFilename) {
                  const filenameRegex = new RegExp(`(=/)?${referenceFilename}(\\s)?`, 'g')
                  html = html.replace(filenameRegex, `$1${outputFilename}$2`)
                }
              }
            }
          } catch (e) {
            // skip minification
          }

          // save HTML file on output folder
          const filename = /\.x?(ht)?ml$/.test(paths.output) ? url : `${url}.html`
          const filepath = path.join(paths.output, filename)
          // create directories for if needed
          mkdirp(path.dirname(filepath))
            .then(() => {
              fs.writeFile(filepath, html, err => err ? console.error(clRed, err) : true)
              console.log(clGreen, 'DONE')
              resolve()
            })
            .catch(err => {
              console.error(clRed, err)
              resolve()
            })
        } else if (html === false) {
          throw new Error('Render returns false')
        } else {
          console.log(clYellow, `Render output: ${JSON.stringify(html)}`)
          resolve()
        }
      })

      .catch(err => {
        console.error(clRed, err)
        // exit with failure
        process.exit(1)
      })
  })

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
          const route = { path: url, collection, slug }
          routes.push(route)
          await prerender(url, route)
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
        routes.push({ path: url })
        await prerender(url)
      }
    }
  }

  if (!routes.find(({ path }) => path === '/sitemap.xml')) {
    // generate Sitemap
    const sitemapSrc = path.join(__dirname, '../../assets/sitemap.xml.ejs')
    ejs.renderFile(sitemapSrc, { domain: settings.domain, routes }, (err, xml) => {
      if (err) {
        console.error(err)
      } else {
        // save default sitemap.xml on output dir
        fs.writeFileSync(path.join(paths.output, 'sitemap.xml'), xml)
      }
    })
  }
})
