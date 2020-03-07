import * as merge from 'lodash.merge'
import baseConfig from './base-config/'

export default customConfig => {
  const config = merge(baseConfig, customConfig)
  window.CMS.init({ config })
  console.log('Netlify CMS config:', config)
  return config
}
