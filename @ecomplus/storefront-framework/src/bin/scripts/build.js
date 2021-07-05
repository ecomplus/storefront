#!/usr/bin/env node

'use strict'

process.env.NODE_ENV = 'production'
process.env.STOREFRONT_FRAMEWORK = 'build'

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const paths = require('./../../lib/paths')
const recursiveReaddir = require('recursive-readdir')
const mkdirp = require('mkdirp')
const StorefrontRouter = require('@ecomplus/storefront-router')
const getAssetsReferences = require('./../../lib/get-assets-references')
const minifyHtml = require('./../../lib/minify-html')
const cmsCollections = require('./../../lib/cms-collections')
const renderer = require('./../../renderer')
const { storeId, settings } = require('./../../lib/config')

// optionally limit prerendered routes
let prerenderUrls, prerenderLimit
let canBundle = true
for (let i = 0; i < process.argv.length; i++) {
  const arg = process.argv[i]
  if (arg === '--no-bundler') {
    canBundle = false
  } else if (arg.startsWith('--prerender=')) {
    prerenderUrls = arg.replace('--prerender=', '').split(',')
  } else if (arg.startsWith('--prerender-limit=')) {
    prerenderLimit = parseInt(arg.replace('--prerender-limit=', ''), 10)
  }
}

// set default limits
if (prerenderUrls) {
  if (!prerenderLimit) {
    prerenderLimit = 0
  }
  prerenderLimit -= prerenderUrls.length
} else if (!prerenderLimit) {
  prerenderLimit = 5000
}

const bundler = new Promise(resolve => {
  if (canBundle) {
    require('./../bundler').then(resolve)
  } else {
    // try to read cached bundler result
    let cache
    try {
      cache = require(process.env.STOREFRONT_BUNDLES_PATH || path.join(process.cwd(), '.bundles.json'))
    } catch (e) {
    }
    resolve({
      assetsByChunkName: {},
      ...cache
    })
  }
})

bundler.then(async ({ assetsByChunkName }) => {
  // map entry assets to replace
  const entryAssetsReference = getAssetsReferences(
    assetsByChunkName,
    (err, { outputFilename, refFilename }) => {
      if (!err) {
        // copy file as fallback
        try {
          fs.copyFileSync(
            path.join(paths.output, outputFilename),
            path.join(paths.output, refFilename)
          )
        } catch (err) {
          if (canBundle) {
            throw err
          }
        }
      }
    }
  )

  // debug prerender config
  let maximumViews = prerenderLimit
  if (prerenderUrls) {
    console.log(`--> Prerender URLs "${prerenderUrls.join(', ')}"\n \n`)
    maximumViews += prerenderUrls.length
  }
  if (maximumViews > 0) {
    console.log(`--> Prerendering up to ${maximumViews} views\n \n`)
  }

  const prerender = (url, route) => new Promise(resolve => {
    if (prerenderUrls) {
      if (
        !prerenderUrls.includes(url) &&
        !prerenderUrls.includes(url.replace(/^\//, ''))
      ) {
        if (prerenderLimit <= 0) {
          // skip prerendering current route
          return resolve()
        } else {
          prerenderLimit--
        }
      }
    } else if (prerenderLimit <= 0 && url !== '/index') {
      // rated views limit
      return resolve()
    } else {
      prerenderLimit--
    }

    // debug
    const done = () => {
      console.log(url)
      if (route) {
        console.log(JSON.stringify(route, null, 2))
      }
      console.log(' \n----  //  ----\n ')
      resolve()
    }
    // console colors
    const clGreen = '\x1b[32m%s\x1b[0m'
    const clYellow = '\x1b[33m%s\x1b[0m'
    const clRed = '\x1b[31m%s\x1b[0m'

    // prerender view
    renderer(url, route)
      .then(html => {
        if (html) {
          html = minifyHtml(html, entryAssetsReference)
          // save HTML file on output folder
          const filename = /\.x?(ht)?ml$/.test(paths.output)
            ? url
            : url.endsWith('/') ? `${url}index.html` : `${url}.html`
          const filepath = path.join(paths.output, filename)
          // create directories for if needed
          mkdirp(path.dirname(filepath))
            .then(() => {
              fs.writeFile(filepath, html, err => err ? console.error(clRed, err) : true)
              console.log(clGreen, 'DONE')
              done()
            })
            .catch(err => {
              console.error(clRed, err)
              done()
            })
        } else if (html === false) {
          throw new Error('Render returns false')
        } else {
          console.log(clYellow, `Render output: ${JSON.stringify(html)}`)
          done()
        }
      })

      .catch(err => {
        err.url = url
        err.route = route
        console.error(clRed, err)
        // exit with failure
        process.exit(1)
      })
  })

  // list and prerender all storefront routes
  const router = new StorefrontRouter(storeId)
  const routes = await router.list()
  const simultaneous = 20
  for (let i = 0; i < Math.ceil(routes.length / simultaneous); i++) {
    const start = i * simultaneous
    await Promise.all(routes.slice(start, start + simultaneous)
      .map(route => prerender(route.path, route)))
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

  // cache bundler result
  fs.writeFileSync(
    path.join(process.cwd(), '.bundles.json'),
    JSON.stringify({ assetsByChunkName }, null, 2)
  )
})
