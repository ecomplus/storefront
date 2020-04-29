#!/usr/bin/env node

'use strict'

const { BROWSER_RELOAD_DELAY, MONOREPO_SERVER } = process.env

const path = require('path')
const paths = require('./../lib/paths')
const bundler = require('./bundler')
const webpackConfig = require('./../webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const browserSync = require('browser-sync').create()
const renderer = require('./../renderer')

// setup Browsersync server together with Webpack
bundler.then(({ compiler }) => {
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
    port = 9100
  }

  // watch source files to reload and stream
  const files = [
    path.join(paths.pages, '/**/*.ejs'),
    path.join(paths.content, '/**/*.json'),
    path.join(paths.output, '/*.css'),
    {
      match: [path.join(paths.js, '/**/*')],
      fn () {
        setTimeout(() => browserSync.reload(), BROWSER_RELOAD_DELAY || 350)
      }
    }
  ]
  // monorepo support
  if (MONOREPO_SERVER) {
    files.push(
      path.join(__dirname, '../../../*/src/**/*'),
      path.join(__dirname, '../../../*/scss/**/*')
    )
  }

  // start Browsersync
  browserSync.init({
    port,
    minify: false,
    server: paths.output,
    files,

    middleware: [
      // Webpack dev server with hot module reload
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        index: 'index.html',
        stats: webpackConfig.stats,
        writeToDisk: true
      }),

      // prerenderer views
      (req, res, next) => {
        renderer(req.url.replace(/\?.*$/, '').replace(/\.html$/, ''))
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
