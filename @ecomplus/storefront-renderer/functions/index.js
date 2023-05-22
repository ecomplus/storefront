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

  const setStatusAndCache = (status, defaultCache) => {
    return res.status(status)
      .set('X-SSR-ID', `v2.8/${Math.random()}`)
      .set(
        'Cache-Control',
        (typeof getCacheControl === 'function' && getCacheControl(status)) || defaultCache
      )
  }

  const proxy = async () => {
    let proxyUrl
    try {
      proxyUrl = new URL(req.query.url)
    } catch {
    }
    if (proxyUrl) {
      const { headers } = req
      /* eslint-disable dot-notation */
      headers['origin'] = headers['x-forwarded-host']
      headers['host'] = proxyUrl.hostname
      if (!headers['accept']) {
        headers['accept'] = 'text/plain,text/html,application/javascript,application/x-javascript'
      }
      headers['accept-encoding'] = 'gzip'
      delete headers['forwarded']
      delete headers['via']
      delete headers['traceparent']
      delete headers['upgrade-insecure-requests']
      delete headers['x-timer']
      delete headers['x-varnish']
      delete headers['x-orig-accept-language']
      Object.keys(headers).forEach((headerName) => {
        if (
          headerName.startsWith('x-forwarded-') ||
          headerName.startsWith('cdn-') ||
          headerName.startsWith('fastly-') ||
          headerName.startsWith('x-firebase-') ||
          headerName.startsWith('x-cloud-') ||
          headerName.startsWith('x-appengine-') ||
          headerName.startsWith('function-')
        ) {
          delete headers[headerName]
        }
      })
      if (process.env.STOREFRONT_PROXY_DEBUG) {
        console.log({ proxy: proxyUrl.href })
      }
      try {
        const response = await axios.get(proxyUrl.href, {
          headers,
          timeout: 3000,
          responseType: 'text',
          validateStatus: (status) => {
            return Boolean(status)
          }
        })
        res.status(response.status)
        Object.keys(response.headers).forEach((headerName) => {
          switch (headerName) {
            case 'transfer-encoding':
            case 'connection':
            case 'strict-transport-security':
            case 'alt-svc':
            case 'server':
              break
            default:
              res.set(headerName, response.headers[headerName])
          }
        })
        res.set('access-control-allow-origin', '*')
        return res.send(response.data)
      } catch (err) {
        console.error(err)
        return res.status(400).send(err.message)
      }
    }
    res.sendStatus(400)
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
    if (url.startsWith('/reverse-proxy/')) {
      proxy()
    } else if (url.slice(-1) === '/') {
      redirect(url.slice(0, -1))
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
