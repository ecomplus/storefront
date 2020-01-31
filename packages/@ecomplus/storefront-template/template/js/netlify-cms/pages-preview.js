import HomePreview from './preview/home-preview'
import ProductPreview from './preview/product-preview'
import SearchPreview from './preview/search-preview'

window.CMS.registerPreviewStyle('https://use.fontawesome.com/releases/v5.12.0/css/all.css')
window.CMS.registerPreviewStyle('/storefront.css')
window.CMS.registerPreviewStyle('/assets/cms-preview.css')
window.CMS.registerPreviewTemplate('home', HomePreview)
window.CMS.registerPreviewTemplate('products', ProductPreview)
window.CMS.registerPreviewTemplate('search', SearchPreview)
