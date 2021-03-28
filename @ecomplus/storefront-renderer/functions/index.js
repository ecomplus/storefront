const path = require('path')

const {
  getAssetsReferences,
  renderer,
  minifyHtml
} = require('@ecomplus/storefront-renderer')

exports.ssr = (req, res, getCacheControl) => {
  const url = req.url.replace(/\?.*$/, '').replace(/\.html$/, '')

  const setStatusAndCache = (status, defaultCache) => {
    return res.status(status).set(
      'Cache-Control',
      (typeof getCacheControl === 'function' && getCacheControl(status)) || defaultCache
    )
  }

  const redirect = (url, status = 302) => {
    setStatusAndCache(status, 'public, max-age=30, s-maxage=300')
      .set('Location', url).end()
  }

  let cache
  try {
    cache = require(process.env.STOREFRONT_BUNDLES_PATH || path.join(process.cwd(), '.bundles.json'))
  } catch (err) {
    console.error(err)
  }

  const fallback = () => {
    if (url.slice(-1) === '/') {
      redirect(url.slice(0, -1))
    } else if (url !== '/404' && (/\/[^/.]+$/.test(url) || /\.x?html$/.test(url))) {
      redirect(`/404?url=${encodeURIComponent(req.url)}`)
    } else {
      setStatusAndCache(404, 'public, max-age=60, s-maxage=600').end()
    }
  }

  return renderer(url)

    .then(html => {
      if (html) {
        if (cache) {
          html = minifyHtml(html, getAssetsReferences(cache.assetsByChunkName))
        }
        setStatusAndCache(200, 'public, max-age=60, s-maxage=600, stale-while-revalidate=2592000')
          .send(html)
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
