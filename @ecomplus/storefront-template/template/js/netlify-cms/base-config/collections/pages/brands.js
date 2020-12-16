import getRetail from './types/retail'

export default ({ baseDir, sections }) => ({
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
        getRetail('brand', 'marca'),
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
      ].concat(sections.filter(({ name }) => name !== 'collection-shelf'))
    }
  ]
})
