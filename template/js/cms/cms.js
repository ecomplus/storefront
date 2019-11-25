import config from './default-config'
// setup cms config
window.CMS_MANUAL_INIT = true
const { CMS } = window

const cmsInit = (options = {}) => {
  const merged = {
    ...config,
    ...options
  }
  CMS.init(merged)
}

export default cmsInit
