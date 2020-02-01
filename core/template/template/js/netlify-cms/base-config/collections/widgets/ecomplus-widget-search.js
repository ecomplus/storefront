export default {
  label: 'Busca instantânea',
  name: 'ecomplus_widget_search',
  file: 'content/widgets/ecomplus-widget-search.json',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-search'
    },
    {
      label: 'Ativar',
      hint: 'Exibe uma prévia de resultado de busca logo abaixo do campo de pesquisa',
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
