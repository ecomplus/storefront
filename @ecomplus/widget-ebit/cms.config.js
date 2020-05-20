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
      hint: 'Instalar Ebit',
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
      default: true
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Configurar ebit',
      fields: [
        {
          label: 'Store Id Ebit',
          name: 'ebitStoreId',
          widget: 'number',
          hint: 'Store Id que está no email de boas vindas do Ebit'
        }
      ]
    },
    {
      name: 'stampsAppend',
      widget: 'hidden',
      default: 'src/append/stamps'
    }
  ]
})
