export default ({ baseDir }) => ({
  label: 'Manutenção',
  file: `${baseDir}content/maintanance.json`,
  name: 'maintanance',
  fields: [
    {
      label: 'URL de Manutenção',
      required: false,
      name: 'link',
      widget: 'string',
      hint: 'Configure a URL de manutenção. Caso abra qualquer página do site, será direcionada para essa'
    },
    {
      label: 'Ativar Página de Manutenção',
      name: 'activate',
      widget: 'boolean',
      default: false,
      required: false
    } 
  ]
})
