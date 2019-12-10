export default {
  name: 'blog',
  label: 'Blog',
  hint: 'Configuração geral da página do blog',
  file: 'content/blog.json',
  fields: [
    {
      label: 'Conteúdo adicional',
      name: 'additional_content',
      widget: 'markdown',
      hint: 'Markdown exibido no fim do container da página do blog',
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
}
