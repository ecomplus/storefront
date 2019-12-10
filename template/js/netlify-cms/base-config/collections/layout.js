import header from './files/header'
import footer from './files/footer'

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
