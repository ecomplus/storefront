import { name } from './package.json'

export default () => ({
  label: 'Google Tag Manager',
  thumbnail: 'https://ecom.nyc3.cdn.digitaloceanspaces.com/storefront/widgets/tag-manager.png',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar o Gerenciador de tags do Google',
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
          label: 'Código do contêiner GTM',
          name: 'gtmContainerId',
          widget: 'string'
        },
        {
          name: 'dataLayerVar',
          widget: 'hidden',
          default: 'dataLayer'
        },
        {
          name: 'parseDomMsDelay',
          widget: 'hidden',
          default: 300
        },
        {
          label: 'Carregamento otimizado (beta)',
          name: 'partytown',
          widget: 'hidden',
          required: false,
          default: false,
          description: 'APENAS PARA GA4: Usar Partytown para melhor performance importando as tags em web worker'
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
