import getHome from './pages/home'
import getProducts from './pages/products'
import getSearch from './pages/search'
import getBrands from './pages/brands'
import getCategories from './pages/categories'
import getCollections from './pages/collections'
import getBlog from './pages/blog'

export default options => ({
  name: 'pages',
  label: 'Páginas',
  description: 'Páginas principais e pré-definidas da loja',
  delete: false,
  files: [
    getHome(options),
    getProducts(options),
    getSearch(options),
    getBrands(options),
    getCategories(options),
    getCollections(options),
    getBlog(options)
  ]
})
