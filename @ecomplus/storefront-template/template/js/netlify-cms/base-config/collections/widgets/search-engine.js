export default ({ baseDir }) => ({
  label: 'Motor de busca',
  name: 'component_search_engine',
  file: `${baseDir}content/widgets/search-engine.json`,
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-search-engine'
    },
    {
      label: 'Ativar',
      hint: 'Widget para exibir resultados de busca na página',
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
})
