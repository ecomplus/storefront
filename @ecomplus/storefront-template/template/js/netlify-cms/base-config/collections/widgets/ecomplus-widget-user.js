export default ({ baseDir }) => ({
  label: 'Login de usuários',
  name: 'ecomplus_widget_user',
  file: `${baseDir}content/widgets/ecomplus-widget-user.json`,
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: '@ecomplus/widget-user'
    },
    {
      label: 'Ativar',
      hint: 'Caixa de login na página, sem redirecionar ou abrir nova guia',
      name: 'active',
      required: false,
      widget: 'boolean'
    },
    {
      label: 'Apenas em desktops',
      name: 'desktopOnly',
      hint: 'Desativa o widget em dispositivos móveis',
      required: false,
      widget: 'boolean'
    }
  ]
})
