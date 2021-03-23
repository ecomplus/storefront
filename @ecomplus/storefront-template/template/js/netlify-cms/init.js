import * as merge from 'lodash.merge'
import axios from 'axios'
import { $ecomConfig } from '@ecomplus/utils'
import initEcomplusIdentity from './ecomplus-identity'
import getBaseConfig from './base-config/'
import './pages-preview'

const initCms = config => {
  if (window.netlifyIdentity) {
    const identityUrl = config.backend.identity_url
    if (identityUrl) {
      const fixGotrueApi = () => {
        const { api } = window.netlifyIdentity.gotrue
        api.apiURL = identityUrl
        api._sameOrigin = identityUrl.includes(window.location.host)
      }
      if (document.readyState !== 'loading') {
        fixGotrueApi()
      }
      document.addEventListener('DOMContentLoaded', fixGotrueApi)
    }
  } else {
    window.netlifyIdentity = initEcomplusIdentity()
    if (!config.backend.gateway_url) {
      config.backend.gateway_url = `https://gitgateway.ecomplus.biz/${$ecomConfig.get('store_id')}`
    }
  }
  window.CMS.init({ config })
}

export default (customConfig, options) => new Promise(resolve => {
  let config = merge(getBaseConfig(options), customConfig)

  axios.get('/admin/config.json')
    .then(({ data }) => {
      if (typeof data === 'object' && data) {
        if (Array.isArray(data.collections)) {
          const mergeNestedObj = (originalObj, obj) => {
            if (Array.isArray(originalObj.files)) {
              if (Array.isArray(obj.files)) {
                upsertFields(originalObj, obj, 'files')
              }
            } else if (Array.isArray(obj.fields)) {
              upsertFields(originalObj, obj, 'fields')
            } else if (Array.isArray(obj.types)) {
              upsertFields(originalObj, obj, 'types')
            }
            Object.assign(originalObj, obj)
          }

          const upsertFields = (config, data, prop) => {
            data[prop].forEach(obj => {
              if (obj.name) {
                const originalObj = config[prop].find(({ name }) => name === obj.name)
                if (originalObj) {
                  mergeNestedObj(originalObj, obj)
                } else {
                  config[prop].push(obj)
                }
              } else {
                config[prop].forEach(originalObj => mergeNestedObj(originalObj, obj))
              }
            })
            delete data[prop]
          }
          upsertFields(config, data, 'collections')
        }
        config = merge(config, data)
      }
    })

    .catch(() => console.log('No custom config file at /admin/config.json'))
    .finally(() => {
      initCms(config)
      resolve(config)
    })
})
