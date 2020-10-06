const path = require('path')
const functions = require('firebase-functions')

const {
  getAssetsReferences,
  renderer,
  minifyHtml
} = require('@ecomplus/storefront-renderer')

exports.ssr = functions.https.onRequest((req, res) => {
  const url = req.url.replace(/\?.*$/, '').replace(/\.html$/, '')

  let cache
  try {
    cache = require(path.join(process.cwd(), '.bundles.json'))
  } catch (err) {
    console.error(err)
  }

  const fallback = () => res
    .set('Cache-Control', 'max-age=10')
    .set('Location', '/404')
    .status(302).end()

  return renderer(url)

    .then(html => {
      if (html) {
        if (cache) {
          html = minifyHtml(html, getAssetsReferences(cache.assetsByChunkName))
        }
        res.set('Cache-Control', 'public, max-age=60, s-maxage=604800, stale-while-revalidate=2592000')
          .status(200).send(html)
      } else {
        fallback()
      }
      return false
    })

    .catch(err => {
      fallback()
      console.error(err)
    })
})
