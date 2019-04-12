'use strict'

// use E-Com Plus SDK for public APIs
const EcomIo = require('ecomplus-sdk')
// Netlify CMS content
const content = require('./cms')

// mount arrays of slugs for each resource
const slugs = {
  products: [],
  brands: [],
  categories: [],
  collections: []
}

module.exports = new Promise((resolve, reject) => {
  content.then(({ settings }) => {
    const callback = err => {
      if (!err) {
        // count callbacks to resolve the promise
        let wait = 0
        let done = 0
        const Done = () => {
          done++
          if (wait === done) {
            resolve(slugs)
          }
        }

        // start listing products
        // handle pagination with Search API (ELS from and size)
        const listProducts = (from = 0) => {
          // get 500 items per request
          let size = 500

          const productsCallback = (err, body) => {
            if (err) {
              console.error(err)
            } else if (body && body.hits) {
              // treat Elasticsearch response
              let items = body.hits.hits
              if (Array.isArray(items)) {
                items.forEach(item => {
                  slugs.products.push(item._source.slug)
                })
              }

              if (items.length < body.hits.total) {
                // next page
                listProducts(from + size)
                return
              }
            }
            Done()
          }

          // call Search API
          EcomIo.searchProducts(productsCallback, null, from, size)
        }
        wait++
        listProducts()

        // handle categories, brands and collections
        const listDocuments = (resource, offset) => {
          // listCategories...
          let method = 'list' + resource.charAt(0).toUpperCase() + resource.slice(1)

          const listCallback = (err, body) => {
            if (err) {
              console.error(err)
            } else if (body && body.result) {
              // handle documents list response type
              // https://developers.e-com.plus/docs/reference/store/#list-of-documents
              body.result.forEach(({ slug }) => {
                slugs[resource].push(slug)
              })

              if (body.meta && body.result.length >= body.meta.limit) {
                // next page
                offset = (offset || 0) + body.meta.limit
                listDocuments(resource, offset)
                return
              }
            }
            Done()
          }

          // call Store API
          EcomIo[method](listCallback, offset)
        }
        [ 'categories', 'brands', 'collections' ].forEach(resource => {
          wait++
          listDocuments(resource)
        })
      }
    }

    // init SDK
    EcomIo.init(callback, settings.store_id, settings.store_object_id)
  })
})
