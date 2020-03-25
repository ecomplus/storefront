export default ({ baseDir }) => ({
  name: 'search',
  label: 'Busca',
  hint: 'Configuração geral das páginas de busca',
  file: `${baseDir}content/search.json`,
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
      hint: 'Markdown exibido no fim do container da página de busca',
      required: false
    }
  ]
})
