export default {
  name: 'brands',
  label: 'Marcas',
  hint: 'Configuração geral das páginas de marca',
  file: 'content/brands.json',
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
      hint: 'Markdown exibido no fim do container das páginas das marcas',
      required: false
    }
  ]
}
