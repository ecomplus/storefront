import merge from 'lodash.merge'
import baseConfig from './base-config'

window.CMS_MANUAL_INIT = true

export default customConfig => window.CMS.init(merge(baseConfig, customConfig))
