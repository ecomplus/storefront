import sections from './_sections'

export default ({ baseDir }) => ({
  name: 'search',
  label: 'Busca',
  hint: 'Configuração geral das páginas de busca',
  file: `${baseDir}content/search.json`,
  fields: [
    {
      label: 'Seções',
      name: 'sections',
      widget: 'list',
      types: [
        {
          label: 'Motor de busca',
          name: 'search-engine',
          widget: 'object',
          fields: [
            {
              label: 'Exibir resultados da busca',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        }
      ].concat(sections)
    }
  ]
})
