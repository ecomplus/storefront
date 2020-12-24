import HomePreview from './preview/home-preview'
import ProductPreview from './preview/product-preview'
import SearchPreview from './preview/search-preview'
import BrandsPreview from './preview/brands-preview'
import CategoriesPreview from './preview/categories-preview'
import CollectionsPreview from './preview/collections-preview'
import BlogPreview from './preview/blog-preview'
import CodePreview from './preview/code-preview'
import GeneralSettings from './preview/settings/general'

window.CMS.registerPreviewStyle('https://use.fontawesome.com/releases/v5.12.0/css/all.css')
window.CMS.registerPreviewStyle('/storefront.css')
window.CMS.registerPreviewStyle('/assets/cms-preview.css')
window.CMS.registerPreviewTemplate('home', HomePreview)
window.CMS.registerPreviewTemplate('products', ProductPreview)
window.CMS.registerPreviewTemplate('search', SearchPreview)
window.CMS.registerPreviewTemplate('brands', BrandsPreview)
window.CMS.registerPreviewTemplate('categories', CategoriesPreview)
window.CMS.registerPreviewTemplate('collections', CollectionsPreview)
window.CMS.registerPreviewTemplate('blog', BlogPreview)
window.CMS.registerPreviewTemplate('code', CodePreview)
window.CMS.registerPreviewTemplate('general', GeneralSettings)
