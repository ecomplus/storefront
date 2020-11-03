import getRetail from './types/retail'

export default ({ baseDir, sections }) => ({
  name: 'categories',
  label: 'Categorias',
  hint: 'Configuração geral das páginas de categorias',
  file: `${baseDir}content/categories.json`,
  fields: [
    {
      label: 'Seções',
      name: 'sections',
      widget: 'list',
      types: [
        getRetail('category', 'categoria'),
        {
          label: 'Banner da categoria',
          name: 'document-banner',
          widget: 'object',
          fields: [
            {
              label: 'Exibir banner da categoria',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        },
        {
          label: 'Descrição da categoria',
          name: 'document-description',
          widget: 'object',
          fields: [
            {
              label: 'Exibir descrição HTML da categoria',
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
