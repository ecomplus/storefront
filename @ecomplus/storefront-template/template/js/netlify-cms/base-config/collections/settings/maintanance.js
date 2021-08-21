export default ({ baseDir }) => ({
  label: 'Manutenção',
  file: `${baseDir}content/maintanance.json`,
  name: 'maintanance',
  fields: [
    {
      label: 'Título da página de manutenção',
      required: false,
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Corpo',
      name: 'body',
      widget: 'markdown'
    },
    {
      label: 'Loja em manutenção',
      name: 'active',
      widget: 'boolean',
      default: false,
      required: false
    } 
  ]
})