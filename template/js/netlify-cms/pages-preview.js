import HomePreview from './preview/home-preview'

window.CMS.registerPreviewStyle('/preview.css')
window.CMS.registerPreviewStyle('/storefront.css')
window.CMS.registerPreviewTemplate('home', HomePreview)
