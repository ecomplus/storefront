#!/usr/bin/env node

'use strict'

const bundler = require('./bundler')
const webpackConfig = require('./../webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const browserSync = require('browser-sync').create()
const renderer = require('./../renderer')

// setup Browsersync server together with Webpack
bundler.then(compiler => {
  // get server port from CLI args
  let port
  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i]
    if (arg.startsWith('--port=')) {
      port = parseInt(arg.replace('--port=', ''), 10)
      break
    }
  }
  if (!port || isNaN(port)) {
    port = 9123
  }

  // start Browsersync
  browserSync.init({
    port,
    watch: true,
    minify: false,
    server: webpackConfig.output.path,

    middleware: [
      // Webpack dev server with hot module reload
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        index: 'index.html',
        stats: webpackConfig.stats,
        writeToDisk: true
      }),
      webpackHotMiddleware(compiler),

      // prerenderer views
      (req, res, next) => {
        renderer(req.url.replace(/(\?.*)$/, '').replace(/(\.html)$/, ''))
          .then(html => {
            if (html === false) {
              // proceed to static server files
              next()
            } else {
              res.write(html)
              res.end()
            }
          })
          .catch(() => process.exit(1))
      }
    ]
  })
})
