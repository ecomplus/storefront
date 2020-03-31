import sections from './_sections'

export default ({ baseDir }) => ({
  name: 'collections',
  label: 'Coleções',
  hint: 'Configuração geral das páginas de coleções',
  file: `${baseDir}content/collections.json`,
  fields: [
    {
      label: 'Seções',
      name: 'sections',
      widget: 'list',
      types: [
        {
          label: 'Produtos da coleção',
          name: 'brand-retail',
          widget: 'object',
          fields: [
            {
              label: 'Listar produtos da coleção',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        },
        {
          label: 'Banner da coleção',
          name: 'document-banner',
          widget: 'object',
          fields: [
            {
              label: 'Exibir banner da coleção',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        },
        {
          label: 'Descrição da coleção',
          name: 'document-description',
          widget: 'object',
          fields: [
            {
              label: 'Exibir descrição HTML da coleção',
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
