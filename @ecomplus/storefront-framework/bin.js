#!/usr/bin/env node

'use strict'

;(function () {
  // force unset ecomClient timeout
  process.env.ECOMCLIENT_NOTIMEOUT = true

  // check for action argument
  let action
  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i]
    switch (arg) {
      case 'serve':
        require('./src/bin/scripts/serve')
        i = process.argv.length
        action = arg
        break
      case 'build':
        require('./src/bin/scripts/build')
        i = process.argv.length
        action = arg
        break
    }
  }

  if (action) {
    const { storeId } = require('./src/lib/config')

    // set default store for tests if undefined
    if (!process.env.ECOM_STORE_ID) {
      process.env.ECOM_STORE_ID = storeId
    }
    if (!process.env.ECOM_STORE_OBJECT_ID) {
      process.env.ECOM_STORE_OBJECT_ID = '5b1abe30a4d4531b8fe40725'
    }

    console.log(' \n')
    console.log(
      // magenta
      '\x1b[35m%s\x1b[0m',
      `--> Starting <${action}> with Store ID ${process.env.ECOM_STORE_ID}\n`
    )
  } else {
    console.log(`Usage:
      Move to your template project directory and run:
      storefront-pack <serve|build>
      ---//---
      serve: Starts Webpack and Browsersync server on port 9100
      build: Compile assets bundles for production and prerender e-commerce pages
      For more information, see https://github.com/ecomclub/storefront-framework.`)
  }
}())
