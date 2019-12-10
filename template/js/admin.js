import './lib/config'
import initNetlifyCms from './netlify-cms/init'

document.title = `Admin ~ ${document.title}`

initNetlifyCms(window.CMS_CUSTOM_CONFIG)
