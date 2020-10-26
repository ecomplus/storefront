const path = require('path')

const {
  getAssetsReferences,
  renderer,
  minifyHtml
} = require('@ecomplus/storefront-renderer')

exports.ssr = (req, res) => {
  const url = req.url.replace(/\?.*$/, '').replace(/\.html$/, '')

  let cache
  try {
    cache = require(process.env.STOREFRONT_BUNDLES_PATH || path.join(process.cwd(), '.bundles.json'))
  } catch (err) {
    console.error(err)
  }

  const fallback = () => {
    const redirect = url => {
      res.set('Cache-Control', 'public, max-age=30')
        .set('Location', url)
        .status(302).end()
    }
    if (req.url.slice(-1) === '/') {
      redirect(req.url.slice(0, -1))
    } else if (/\/[^/.]+$/.test(req.url) || /\.x?html$/.test(req.url)) {
      redirect(`/404?url=${req.url}`)
    } else {
      res.set('Cache-Control', 'public, max-age=60, s-maxage=120')
        .status(404).end()
    }
  }

  return renderer(url)

    .then(html => {
      if (html) {
        if (cache) {
          html = minifyHtml(html, getAssetsReferences(cache.assetsByChunkName))
        }
        res.set('Cache-Control', 'public, max-age=60, s-maxage=600, stale-while-revalidate=2592000')
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
}
