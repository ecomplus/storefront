import merge from 'lodash.merge'
import baseConfig from './base-config/'

export default customConfig => window.CMS.init(merge(baseConfig, customConfig))
