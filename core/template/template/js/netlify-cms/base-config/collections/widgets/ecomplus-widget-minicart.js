export default {
  label: 'Minicart',
  name: 'ecomplus_widget_minicart',
  file: 'content/widgets/ecomplus-widget-minicart.json',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-minicart'
    },
    {
      label: 'Ativar',
      hint: 'Esse widget faz que o carrinho seja aberto na lateral da tela sem redirecionar da página',
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
    }
  ]
}
