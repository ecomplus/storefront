'use strict'

const bundler = require('./bundler')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const browserSync = require('browser-sync').create()
const render = require('./middlewares/render')

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
    server: webpackConfig.output.path,
    middleware: [
      // Webpack dev server
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        index: 'index.html',
        stats: webpackConfig.stats,
        writeToDisk: true
      }),
      // hot reload
      webpackHotMiddleware(compiler),
      // renderer
      render
    ],
    minify: false
  })
})
