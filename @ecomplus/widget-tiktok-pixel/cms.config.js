import { name } from './package.json'

export default () => ({
  label: 'Tiktok Pixel',
  thumbnail: 'https://ecom.nyc3.cdn.digitaloceanspaces.com/storefront/widgets/fb-pixel.png',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar o pixel do Tiktok',
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
          name: 'tiktokPixelId',
          widget: 'string',
          description: 'Cole apenas o pixel id e não o código completo'
        },
        {
          name: 'debug',
          widget: 'hidden',
          default: false
        },
        {
          label: 'Carregamento otimizado (beta)',
          name: 'partytown',
          widget: 'hidden',
          required: false,
          default: false,
          description: 'Usar Partytown para melhor performance importando o pixel em web worker'
        }
      ]
    },
    {
      name: 'headAppend',
      widget: 'hidden',
      default: 'src/append/head'
    }
  ]
})
