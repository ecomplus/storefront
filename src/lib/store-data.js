'use strict'

const { ECOM_STORE_ID } = process.env
const storeId = ECOM_STORE_ID

// Node.js modules
const fs = require('fs')
const path = require('path')
// load project directories
const { pub } = require('./paths')
// client and search to get content from E-Com Plus public APIs
const ecomClient = require('@ecomplus/client')
const EcomSearch = require('@ecomplus/search-engine')
// debug client requests
process.env.ECOMCLIENT_DEBUG = true

module.exports = new Promise((resolve, reject) => {
  const ecomSearch = new EcomSearch(storeId)
  // check for custom E-Com Plus manifest file
  const manifestPath = 'pub/ecom-manifest.json'
  let manifestSrc = path.resolve(pub, manifestPath)
  try {
    if (!fs.existsSync(manifestSrc)) {
      // use default manifest
      manifestSrc = path.resolve(__dirname, '../', manifestPath)
    }
  } catch (err) {
    reject(err)
  }
  const ecomManifest = require(manifestSrc)

  // load data for template renderization
  const getPromises = []
  const data = {}
  for (const prop in ecomManifest) {
    const propManifest = ecomManifest[prop]
    if (propManifest) {
      // run manifest configured GET request
      const { client, search } = propManifest
      let req

      if (client) {
        // request with ecomClient
        const { api, endpoint } = client
        const url = endpoint.replace(':store_id', storeId)
        req = ecomClient[api]({
          url,
          storeId
        }).then(response => {
          let body = response.data
          if (body._id && body.result) {
            // list request
            body = body.result
          }
          data[prop] = body
        })
      } else if (search) {
        // request with search engine instance
        req = ecomSearch.fetch().then(() => {
          data[prop] = ecomSearch.getItems()
        })
      }

      // add request to promises list
      getPromises.push(req)
    }
  }

  Promise.all(getPromises).then(() => resolve(data)).catch(reject)
})
