const path = require('path')
const functions = require('firebase-functions')
const { firestore } = require('firebase-admin')

const {
  getAssetsReferences,
  renderer,
  minifyHtml
} = require('@ecomplus/storefront-framework')

const freshViewCache = 'public, max-age=60, s-maxage=604800, stale-while-revalidate=2592000'

exports.ssr = functions.https.onRequest((req, res) => {
  const url = req.url.replace(/\?.*$/, '').replace(/\.html$/, '')
  const { deploy } = functions.config()
  const deployId = deploy && deploy.id

  let documentRef
  try {
    documentRef = firestore().doc(`views/${url}`)
  } catch (e) {
  }

  return new Promise(resolve => {
    if (documentRef) {
      return documentRef.get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            if (deployId === documentSnapshot.get('deployKey')) {
              res.set('Cache-Control', freshViewCache)
            } else {
              res.set('Cache-Control', 'public, max-age=10')
            }
            resolve(documentSnapshot.get('html'))
          }
        })
        .catch(err => {
          console.error(err)
          resolve(null)
        })
    }
    resolve(null)
  })

    .then(storedHtml => {
      if (storedHtml) {
        res.status(200).send(storedHtml)
      }

      if (documentRef || !storedHtml) {
        let cache
        try {
          cache = require(path.join(process.cwd(), '.bundles.json'))
        } catch (err) {
          console.error(err)
        }

        renderer(url)
          .then(html => {
            if (html) {
              if (cache) {
                html = minifyHtml(html, getAssetsReferences(cache.assetsByChunkName))
              }
              if (!storedHtml) {
                res.set('Cache-Control', freshViewCache).status(200).send(html)
              }
              if (documentRef) {
                return documentRef.set({ html, deployId })
              }
            } else {
              res.set('Location', '/404').status(302).end()
            }
            return false
          })
          .catch(console.error)
      }

      return true
    })
})
