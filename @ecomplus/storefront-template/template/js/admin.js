import './lib/config'
import initNetlifyCms from './netlify-cms/init'
import './netlify-cms/pages-preview'

document.title = `Admin ~ ${document.title}`

initNetlifyCms(window.CMS_CUSTOM_CONFIG).then(config => {
  console.log('Netlify CMS config:', config)
})
