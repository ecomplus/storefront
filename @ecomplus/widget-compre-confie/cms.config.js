import { name } from './package.json'

export default () => ({
  label: 'Avaliações Confi',
  thumbnail: 'https://ecom.nyc3.cdn.digitaloceanspaces.com/storefront/widgets/compre-confie.png',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar selo Confi',
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
          label: 'Store Id Confi',
          name: 'compreConfieStoreId',
          widget: 'string',
          hint: 'ID da loja que é informado pelo Confi'
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
