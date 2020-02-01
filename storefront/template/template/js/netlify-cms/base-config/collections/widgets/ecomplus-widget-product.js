export default {
  label: 'Produtos',
  name: 'ecomplus_widget_product',
  file: 'content/widgets/ecomplus-widget-product.json',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-product'
    },
    {
      label: 'Ativar',
      hint: 'Produto a ser exibido na página de produto',
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
          label: 'Propriedades',
          name: 'props',
          widget: 'object',
          hint: '',
          fields: [
            {
              label: 'Texto de comprar',
              name: 'buyText',
              required: false,
              widget: 'string'
            }
          ]
        },
        {
          label: 'Customização',
          name: 'slots',
          widget: 'object',
          hint: '',
          fields: [
            {
              label: 'Código HTML para comprar',
              name: 'buy',
              required: false,
              widget: 'string'
            }
          ]
        }
      ]
    }
  ]
}
