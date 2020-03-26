import getHeader from './layout/header'
import getFooter from './layout/footer'

export default options => ({
  name: 'layout',
  label: 'Layout',
  description: 'Layout aplicado a todas páginas',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    getHeader(options),
    getFooter(options)
  ]
})
