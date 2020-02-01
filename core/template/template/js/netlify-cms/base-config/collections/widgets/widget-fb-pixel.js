export default {
  label: 'Facebook Pixel',
  name: 'widget_fb_pixel',
  file: 'content/widgets/widget-fb-pixel.json',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-fb-pixel'
    },
    {
      label: 'Ativar',
      hint: 'Instalar o pixel do Facebook',
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
}
