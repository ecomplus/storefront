import HomePreview from './preview/home-preview'

window.CMS.registerPreviewStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css')
window.CMS.registerPreviewStyle('/preview.css')
window.CMS.registerPreviewStyle('/storefront.css')
window.CMS.registerPreviewTemplate('home', HomePreview)
