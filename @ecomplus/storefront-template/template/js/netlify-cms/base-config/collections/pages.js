import home from './pages/home'
import products from './pages/products'
import search from './pages/search'
import brands from './pages/brands'
import categories from './pages/categories'
import collections from './pages/collections'
import blog from './pages/blog'

export default {
  name: 'pages',
  label: 'Páginas',
  delete: false,
  files: [
    home,
    products,
    search,
    brands,
    categories,
    collections,
    blog
  ]
}
