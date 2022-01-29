import { name } from './package.json'

export default () => ({
  label: 'Facebook Pixel',
  thumbnail: 'https://ecom.nyc3.cdn.digitaloceanspaces.com/storefront/widgets/fb-pixel.png',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar o pixel do Facebook',
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
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'ID do pixel',
          name: 'fbqContainerId',
          widget: 'string'
        },
        {
          label: 'Desabilitar evento de compra',
          name: 'disablePurchase',
          required: false,
          widget: 'boolean',
          hint: 'Contar as conversões somente via Facebook Conversions API'
        },
        {
          name: 'debug',
          widget: 'hidden',
          default: false
        }
      ]
    },
    {
      name: 'headAppend',
      widget: 'hidden',
      default: 'src/append/head'
    },
    {
      name: 'bodyAppend',
      widget: 'hidden',
      default: 'src/append/body'
    }
  ]
})
