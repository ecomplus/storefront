export default ({ baseDir }) => ({
  name: 'blog_posts',
  label: 'Posts para o blog',
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
      label: 'Alt da imagem',
      name: 'alt',
      widget: 'string',
      required: false,
      hint: 'Alt tag da imagem'
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
      hint: 'Título da página exibido na aba do navegador e nas respostas em motores de busca, relevante para SEO',
      required: false
    },
    {
      label: 'Meta description',
      name: 'meta_description',
      widget: 'string',
      hint: 'Ddescrição da página exibida nos resultados de motores de busca, relevante para SEO',
      required: false
    }
  ]
})
