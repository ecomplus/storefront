import sections from './_sections'

export default ({ baseDir }) => ({
  name: 'brands',
  label: 'Marcas',
  hint: 'Configuração geral das páginas de marcas',
  file: `${baseDir}content/brands.json`,
  fields: [
    {
      label: 'Seções',
      name: 'sections',
      widget: 'list',
      types: [
        {
          label: 'Produtos da marca',
          name: 'brand-retail',
          widget: 'object',
          fields: [
            {
              label: 'Listar produtos da marca',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        },
        {
          label: 'Banner da marca',
          name: 'document-banner',
          widget: 'object',
          fields: [
            {
              label: 'Exibir banner da marca',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        },
        {
          label: 'Descrição da marca',
          name: 'document-description',
          widget: 'object',
          fields: [
            {
              label: 'Exibir descrição HTML da marca',
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
