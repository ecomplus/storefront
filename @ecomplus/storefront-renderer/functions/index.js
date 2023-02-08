const path = require('path')
const axios = require('axios')

const {
  getAssetsReferences,
  renderer,
  minifyHtml
} = require('@ecomplus/storefront-renderer')

exports.ssr = (req, res, getCacheControl) => {
  const {
    STOREFRONT_BUNDLES_PATH,
    STOREFRONT_LONG_CACHE
  } = process.env

  process.env.STORE_DATA_FROM_CACHE = 'true'

  const isLongCache = String(STOREFRONT_LONG_CACHE).toLowerCase() === 'true'
  const url = req.url.replace(/\?.*$/, '').replace(/\.html$/, '')
  const { headers } = req

  const setStatusAndCache = (status, defaultCache) => {
    return res.status(status)
      .set('X-SSR-ID', `v2.8/${Math.random()}`)
      .set(
        'Cache-Control',
        (typeof getCacheControl === 'function' && getCacheControl(status)) || defaultCache
      )
  }

  const proxy = url => {
    const urlInstance = new URL(url)
    const requestUrl = urlInstance.searchParam.get('url')
    if (requestUrl) {
      return axios.get(requestUrl, { headers, timeout: 3000 }, {
        validateStatus: (status) => {
          return Boolean(status); // Resolve only if has status
        }
      })
    }
    return null
  }

  const redirect = (url, status = 302) => {
    let sMaxAge = status === 301 ? 360 : 12
    if (isLongCache) {
      sMaxAge *= 10
    }
    let cacheControl = `public, max-age=30, s-maxage=${sMaxAge}`
    if (status === 302) {
      cacheControl += ', proxy-revalidate'
    }
    setStatusAndCache(status, cacheControl)
      .set('Location', url).end()
  }

  let cache
  try {
    cache = require(STOREFRONT_BUNDLES_PATH || path.join(process.cwd(), '.bundles.json'))
  } catch (err) {
    console.error(err)
  }

  const fallback = () => {
    if (url.slice(-1) === '/') {
      redirect(url.slice(0, -1))
    } else if (url.startsWith('/reverse-proxy/')) {
      proxy(url).then((response) => {
        if (response) {
          const { status, headers, data } = response
          return res.writeHead(status, headers).send(data)
        }
        return res.sendStatus(400)
      })
    } else if (url !== '/404' && (/\/[^/.]+$/.test(url) || /\.x?html$/.test(url))) {
      setStatusAndCache(404, `public, max-age=${(isLongCache ? 120 : 30)}`)
        .send('<html><head>' +
          `<meta http-equiv="refresh" content="0; url=/404?url=${encodeURIComponent(url)}"/>` +
          '</head><body></body></html>')
    } else {
      setStatusAndCache(404, isLongCache
        ? 'public, max-age=60, s-maxage=86400'
        : 'public, max-age=60, s-maxage=300'
      ).end()
    }
  }

  return renderer(url)
    .then(html => {
      if (html) {
        if (cache) {
          html = minifyHtml(html, getAssetsReferences(cache.assetsByChunkName))
        }
        setStatusAndCache(200, isLongCache
          ? 'public, max-age=60, s-maxage=604800'
          : 'public, max-age=60, s-maxage=300, stale-while-revalidate=2592000'
        ).send(html)
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
