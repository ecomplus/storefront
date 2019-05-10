#!/usr/bin/env node

'use strict'

process.env.NODE_ENV = 'development'

// run Webpack dev server programmatically
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')()

webpackConfig.then(config => {
  // setup Webpack compiler
  const compiler = webpack({
    mode: process.env.NODE_ENV,
    ...config
  })
  const { stats } = config
  const devServerOptions = Object.assign({}, config.devServer, { stats })

  // get server port from CLI args or default Webpack config
  let port
  for (let i = 0; i < process.argv.length; i++) {
    let arg = process.argv[i]
    if (arg.startsWith('--port=')) {
      port = parseInt(arg.replace('--port=', ''), 10)
      break
    }
  }
  if (!port || isNaN(port)) {
    port = config.devServer.port
  }

  // start dev server
  const server = new WebpackDevServer(compiler, devServerOptions)
  server.listen(port, 'localhost', () => {
    console.log(`Starting server on http://localhost:${port}`)
  })
})
