export default ({ baseDir }) => ({
  label: 'Trustvox',
  name: 'widget_trustvox',
  file: `${baseDir}content/widgets/trustvox.json`,
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-trustvox'
    },
    {
      label: 'Ativar',
      hint: 'Avaliações de produtos via Trustvox',
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
      default: false
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'ID da loja na Trustvox',
          name: 'trustvoxStoreId',
          widget: 'number'
        }
      ]
    }
  ]
})
