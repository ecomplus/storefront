import { name } from './package.json'

export default () => ({
  label: 'Avaliações Compre confie',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar Compre confie',
      name: 'active',
      widget: 'boolean'
    },
    {
      label: 'Apenas em desktops',
      name: 'desktopOnly',
      hint: 'Desativa o widget em dispositivos móveis',
      widget: 'boolean'
    },
    {
      name: 'enableCheckout',
      widget: 'hidden',
      default: true
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
          label: 'Store Id Compre confie',
          name: 'compreConfieStoreId',
          widget: 'string',
          hint: 'Store Id que é informado pelo Compre confie'
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
