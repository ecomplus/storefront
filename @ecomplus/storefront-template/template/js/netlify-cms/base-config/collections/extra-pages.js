export default ({ baseDir, sections }) => ({
  name: 'extra_pages',
  label: 'Páginas extra',
  description: 'Páginas extra para conteúdo como Sobre nós, Política de privacidade, etc',
  folder: `${baseDir}content/pages`,
  extension: 'json',
  create: true,
  slug: '{{slug}}',
  fields: [
    {
      label: 'Título',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Corpo',
      name: 'body',
      widget: 'markdown'
    },
    {
      label: 'Meta title',
      name: 'meta_title',
      widget: 'string',
      hint: 'Título exibido na aba do navegador e nos resultados de motores de busca, relevante para SEO',
      required: false
    },
    {
      label: 'Meta description',
      name: 'meta_description',
      widget: 'string',
      hint: 'Descrição exibida nos resultados de motores de busca, relevante para SEO',
      required: false
    },
    {
      label: 'Seções',
      name: 'sections',
      required: false,
      hint: 'Por padrão o layout será composto por breadcrumbs, título e corpo da página',
      widget: 'list',
      types: [
        {
          label: 'Corpo do página',
          name: 'extra-page',
          widget: 'object',
          fields: [
            {
              label: 'Exibir conteúdo da página',
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
