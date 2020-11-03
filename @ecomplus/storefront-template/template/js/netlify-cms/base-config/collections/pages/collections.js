import getRetail from './types/retail'

export default ({ baseDir, sections }) => ({
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
        getRetail('collection', 'coleção'),
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
