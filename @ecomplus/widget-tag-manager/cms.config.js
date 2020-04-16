import { name } from './package.json'

export default () => ({
  label: 'Google Tag Manager',
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
