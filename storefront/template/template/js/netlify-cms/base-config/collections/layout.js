import header from './layout/header'
import footer from './layout/footer'

export default {
  name: 'layout',
  label: 'Layout',
  description: 'Layout aplicado a todas páginas',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    header,
    footer
  ]
}
