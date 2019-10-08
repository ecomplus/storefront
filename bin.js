#!/usr/bin/env node

'use strict'

const { storeId } = require('./src/lib/config')

;(function () {
  // set default store for tests if undefined
  if (!process.env.ECOM_STORE_ID) {
    process.env.ECOM_STORE_ID = storeId
  }
  if (!process.env.ECOM_STORE_OBJECT_ID) {
    process.env.ECOM_STORE_OBJECT_ID = '5b1abe30a4d4531b8fe40725'
  }
  console.log(
    // magenta
    '\x1b[35m%s\x1b[0m',
    `--> Starting deploy with Store ID ${process.env.ECOM_STORE_ID}\n`
  )

  // check for action argument
  for (let i = 0; i < process.argv.length; i++) {
    switch (process.argv[i]) {
      case 'serve':
        require('./src/bin/scripts/serve')
        return
      case 'build':
        require('./src/bin/scripts/build')
        return
    }
  }

  console.log(`Usage:
    Move to your template project directory and run:
    storefront-pack <serve|build>
    ---//---
    serve: Starts Webpack and Browsersync server on port 9123
    build: Compile assets bundles for production and prerender e-commerce pages
    For more information, see https://github.com/ecomclub/storefront-framework.`)
}())
