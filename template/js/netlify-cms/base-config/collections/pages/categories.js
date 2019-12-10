export default {
  name: 'categories',
  label: 'Categorias',
  hint: 'Configuração geral das páginas de categorias',
  file: 'content/categories.json',
  fields: [
    {
      label: 'Exibir barra de informações',
      name: 'pitbar',
      widget: 'boolean',
      default: false,
      required: false
    },
    {
      label: 'Conteúdo adicional',
      name: 'additional_content',
      widget: 'markdown',
      hint: 'Markdown exibido no fim do container das páginas de categoria',
      required: false
    }
  ]
}
