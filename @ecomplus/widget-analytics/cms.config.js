import { name } from './package.json'

export default () => ({
  label: 'Google Analytics',
  thumbnail: 'https://ecom.nyc3.cdn.digitaloceanspaces.com/storefront/widgets/analytics.png',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar o acompanhamento to GA',
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
          label: 'ID do acompanhamento',
          name: 'gaTrackingId',
          widget: 'string'
        },
        {
          label: 'ID de acompanhamento de conversões do Google Ads',
          name: 'googleAdsId',
          widget: 'string',
          hint: 'Insira o texto AW-000000000/bbb-CCClllEEEIbbbYYY que mostra no script gerado no Google Adwords'
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
