import * as merge from 'lodash.merge'
import axios from 'axios'
import baseConfig from './base-config/'

const initCms = config => {
  if (config.identity_url && window.netlifyIdentity) {
    const fixGotrueApi = () => {
      const { api } = window.netlifyIdentity.gotrue
      api.apiURL = config.identity_url
      api._sameOrigin = config.identity_url.includes(window.location.host)
    }
    if (document.readyState !== 'loading') {
      fixGotrueApi()
    }
    document.addEventListener('DOMContentLoaded', fixGotrueApi)
  }
  window.CMS.init({ config })
}

export default customConfig => new Promise(resolve => {
  let config = merge(baseConfig, customConfig)

  axios.get('/admin/config.json')
    .then(({ data }) => {
      if (typeof data === 'object' && data) {
        config = merge(config, data)
      }
    })
    .catch(() => console.log('No custom config file at /admin/config.json'))
    .finally(() => {
      initCms(config)
      resolve(config)
    })
})
