import { name } from './package.json'

export default () => ({
  label: 'Widget Addi com preço dos produtos',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Habilitar widget addi',
      name: 'active',
      widget: 'boolean'
    },
    {
      name: 'desktopOnly',
      widget: 'hidden',
      default: false
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'Habilitar widget na página de produto',
          name: 'enableWidgetProduct',
          widget: 'boolean',
          default: false
        },
        {
          label: 'Ally slug',
          name: 'allySlug',
          widget: 'string'
        }
      ]
    },
    {
      name: 'productSlots',
      widget: 'hidden',
      default: 'src/append/product-slots'
    },
    {
      name: 'bodyAppend',
      widget: 'hidden',
      default: 'src/append/body'
    }
  ]
})
