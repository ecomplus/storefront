export default ({ baseDir, sections }) => ({
  name: 'blog',
  label: 'Blog',
  hint: 'Configuração geral da página do blog',
  file: `${baseDir}content/blog.json`,
  fields: [
    {
      label: 'Título do blog',
      name: 'title',
      widget: 'string'
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
      widget: 'list',
      types: sections
    }
  ]
})
