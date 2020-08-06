import { name } from './package.json'

export default () => ({
  label: 'Chat Tawk.to',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar chat Tawk.to',
      name: 'active',
      widget: 'boolean'
    },
    {
      name: 'desktopOnly',
      widget: 'hidden',
      default: false
    },
    {
      name: 'enableCheckout',
      widget: 'hidden',
      default: false
    },
    {
      name: 'disablePages',
      widget: 'hidden',
      default: true
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'ID da propriedade Tawk.to',
          name: 'tawktoPropertyId',
          widget: 'string',
          hint: 'Property ID em disponível em https://dashboard.tawk.to/#/admin/'
        },
        {
          label: 'Chat widget',
          required: false,
          name: 'tawktoChatWidget',
          widget: 'string'
        }
      ]
    },
    {
      name: 'bodyAppend',
      widget: 'hidden',
      default: 'src/append/body'
    }
  ]
})
