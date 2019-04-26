#!/usr/bin/env node

'use strict'

;(function () {
  for (let i = 0; i < process.argv.length; i++) {
    switch (process.argv[i]) {
      case 'serve':
        require('./server.bin.js')
        return
      case 'build':
        require('./dist.bin.js')
        return
    }
  }

  console.log(`Usage:
    Move to your template project directory and run:
    storefront-pack <serve|build>
    ---//---
    serve: Starts Webpack development server on port 9123
    build: Compile assets bundles for production and prerender e-commerce pages
    For more information, see https://github.com/ecomclub/storefront-framework.`)
}())
