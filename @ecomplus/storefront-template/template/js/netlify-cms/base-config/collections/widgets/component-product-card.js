export default ({ baseDir }) => ({
  label: 'Card de produtos',
  name: 'component_product_card',
  file: `${baseDir}content/widgets/component-product-card.json`,
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-product-card'
    },
    {
      label: 'Ativar',
      hint: 'Card de produtos exibido na vitrine e em vários outros pontos da loja',
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
})
