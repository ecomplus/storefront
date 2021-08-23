export default ({ baseDir }) => ({
  label: 'Manutenção',
  file: `${baseDir}content/maintenance.json`,
  name: 'maintenance',
  fields: [
    {
      label: 'Loja em manutenção',
      name: 'active',
      widget: 'boolean',
      default: false
    },
    {
      label: 'Título da página de manutenção',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Corpo',
      name: 'body',
      widget: 'markdown'
    }
  ]
})
