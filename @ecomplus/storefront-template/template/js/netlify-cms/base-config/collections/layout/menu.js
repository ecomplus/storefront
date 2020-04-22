export default ({ baseDir, state }) => ({
  name: 'menu',
  label: 'Menu lateral',
  file: `${baseDir}content/menu.json`,
  fields: [
    {
      label: 'Categorias principais',
      name: 'sort_categories',
      widget: 'list',
      hint: 'Ordenar categorias em primeiro nível',
      field: {
        label: 'Categoria',
        widget: 'select',
        options: state.routes
          .filter(({ resource, name }) => resource === 'categories')
          .map(({ name, path }) => ({
            label: name,
            value: path.slice(1)
          }))
      }
    },
    {
      label: 'Mostrar telefone ou WhatsApp',
      name: 'phone_wpp',
      widget: 'boolean'
    },
    {
      label: 'Mostrar redes sociais',
      name: 'socials',
      widget: 'boolean'
    }
  ]
})
