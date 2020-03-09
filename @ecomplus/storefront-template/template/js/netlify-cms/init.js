import * as merge from 'lodash.merge'
import axios from 'axios'
import baseConfig from './base-config/'

export default customConfig => new Promise(resolve => {
  let config = merge(baseConfig, customConfig)

  axios.get('/admin/config.json')
    .then(({ data }) => {
      if (typeof data === 'object' && data) {
        config = merge(config, data)
      }
    })
    .catch(() => {
      console.log('No custom config file at /admin/config.json')
    })
    .finally(() => {
      window.CMS.init({ config })
      console.log('Netlify CMS config:', config)
      resolve(config)
    })
})
