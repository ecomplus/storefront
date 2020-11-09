import getHeader from './layout/header'
import getMenu from './layout/menu'
import getFooter from './layout/footer'
import getCode from './layout/code'

export default options => ({
  name: 'layout',
  label: 'Layout',
  description: 'Layout base para todas as páginas',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    getHeader(options),
    getMenu(options),
    getFooter(options),
    getCode(options)
  ]
})
