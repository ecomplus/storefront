import { name } from '../../package.json'
import './lib/config'
import EcomRouter from '@ecomplus/storefront-router'
import initNetlifyCms from './netlify-cms/init'

document.title = `Admin ~ ${document.title}`

const state = {}

new EcomRouter().list()
  .then(routes => {
    state.routes = routes
  })
  .catch(err => {
    console.error(err)
    state.routes = []
  })

  .finally(() => {
    if (window.PKG_BASE_DIR === undefined) {
      window.PKG_BASE_DIR = name === '@ecomplus/storefront-template'
        ? '@ecomplus/storefront-template/'
        : ''
    }
    initNetlifyCms(window.CMS_CUSTOM_CONFIG, {
      baseDir: window.PKG_BASE_DIR,
      state
    }).then(config => {
      console.log('Netlify CMS config:', config)
    })
  })
