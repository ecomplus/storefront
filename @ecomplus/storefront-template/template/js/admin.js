import { name } from '../../package.json'
import './lib/config'
import initNetlifyCms from './netlify-cms/init'
import './netlify-cms/pages-preview'

document.title = `Admin ~ ${document.title}`

if (window.PKG_BASE_DIR === undefined) {
  window.PKG_BASE_DIR = name === '@ecomplus/storefront-template'
    ? '@ecomplus/storefront-template/'
    : ''
}

initNetlifyCms(window.CMS_CUSTOM_CONFIG, window.PKG_BASE_DIR)
  .then(config => {
    console.log('Netlify CMS config:', config)
  })
