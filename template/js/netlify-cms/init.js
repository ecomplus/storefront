import merge from 'lodash.merge'
import baseConfig from './base-config/'
import contentConfig from './../../../content/.config.json'

export default customConfig => window.CMS.init(merge(baseConfig, contentConfig, customConfig))
