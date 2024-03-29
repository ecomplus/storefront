'use strict'

const fs = require('fs')
const path = require('path')
const ecomClient = require('@ecomplus/client')
const EcomSearch = require('@ecomplus/search-engine')
const paths = require('./paths')
const config = require('./config')

module.exports = (storeId = config.storeId, pubSrc = paths.pub, ecomManifest) => {
  const {
    STORE_DATA_NO_CACHE,
    STORE_DATA_FROM_CACHE,
    STORE_DATA_CACHE_PATH
  } = process.env

  const cacheFilepath = STORE_DATA_CACHE_PATH || path.join(process.cwd(), '.ecom.json')

  return new Promise((resolve, reject) => {
    if (STORE_DATA_FROM_CACHE) {
      // try to load store data from cache JSON
      try {
        const { data } = require(cacheFilepath)
        return resolve(data)
      } catch (e) {
      }
    }

    const ecomSearch = new EcomSearch(storeId)
    if (!ecomManifest) {
      // check for custom E-Com Plus manifest file
      const filename = 'ecom-manifest.json'
      let manifestSrc = path.resolve(pubSrc, filename)
      try {
        if (!fs.existsSync(manifestSrc)) {
          // use default manifest
          manifestSrc = path.resolve(__dirname, '../assets/', filename)
        }
      } catch (err) {
        reject(err)
      }
      ecomManifest = require(manifestSrc)
    }

    // load data for template renderization
    const getPromises = []
    const data = {}
    const dataManifest = ecomManifest.data
    if (dataManifest) {
      for (const prop in dataManifest) {
        const propManifest = dataManifest[prop]
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
              if (!body._id && body.result) {
                // list request
                body = body.result
              }
              data[prop] = body
            })
          } else if (search) {
            // request with search engine instance
            req = ecomSearch.fetch()
              .then(() => {
                data[prop] = ecomSearch.getItems()
              })
              .catch(error => {
                if (error.response && error.response.status === 404) {
                  data[prop] = []
                } else {
                  throw error
                }
              })
          }

          // add request to promises list
          getPromises.push(req)
        }
      }
    }

    Promise.all(getPromises)
      .then(() => {
        if (!STORE_DATA_NO_CACHE) {
          try {
            // cache store data
            fs.writeFileSync(cacheFilepath, JSON.stringify({ data }))
          } catch (e) {
          }
        }
        resolve(data)
      })
      .catch(reject)
  })
}
