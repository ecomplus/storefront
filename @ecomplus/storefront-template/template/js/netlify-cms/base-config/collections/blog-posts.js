export default ({ baseDir, sections }) => ({
  name: 'blog-posts',
  label: 'Posts do blog',
  description: 'Posts para o blog da loja com conteúdo atrativo para o seu público',
  folder: `${baseDir}content/posts`,
  extension: 'json',
  create: true,
  slug: '{{slug}}-{{year}}-{{month}}-{{day}}',
  fields: [
    {
      label: 'Título',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Data de publicação',
      name: 'date',
      widget: 'datetime',
      required: false
    },
    {
      label: 'Imagem em destaque',
      name: 'thumbnail',
      widget: 'image',
      required: false,
      hint: 'Sugerimos 900px como largura máxima'
    },
    {
      label: 'Descrição curta',
      name: 'description',
      widget: 'text',
      required: false
    },
    {
      label: 'Corpo',
      name: 'body',
      widget: 'markdown',
      required: false
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
      hint: 'Por padrão o layout será composto por breadcrumbs, título e corpo do post',
      widget: 'list',
      types: [
        {
          label: 'Corpo do post',
          name: 'blog-post',
          widget: 'object',
          fields: [
            {
              label: 'Exibir conteúdo do post',
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
