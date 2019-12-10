export default {
  label: 'Google Tag Manager',
  name: 'widget_tag_manager',
  file: 'content/widgets/widget-tag-manager.json',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-tag-manager'
    },
    {
      label: 'Ativar',
      hint: 'Instalar o Gerenciador de tags do Google',
      name: 'active',
      required: false,
      widget: 'boolean'
    },
    {
      label: 'Apenas em desktops',
      name: 'desktopOnly',
      hint: 'Desativa o widget em dispositivos móveis',
      required: false,
      widget: 'boolean'
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
          widget: 'string',
          required: true
        },
        {
          name: 'dataLayerVar',
          widget: 'hidden',
          default: 'dataLayer'
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
}
