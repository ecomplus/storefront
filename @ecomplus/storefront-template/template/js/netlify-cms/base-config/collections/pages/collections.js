export default ({ baseDir }) => ({
  name: 'collections',
  label: 'Coleções',
  hint: 'Configuração geral das páginas de coleções',
  file: `${baseDir}content/collections.json`,
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
      hint: 'Markdown exibido no fim do container da página das coleções',
      required: false
    }
  ]
})
