export default ({ baseDir, state }) => ({
  name: 'header',
  label: 'Cabeçalho',
  file: `${baseDir}content/header.json`,
  fields: [
    {
      label: 'Tarja de marketing',
      name: 'marketing_stripe',
      widget: 'object',
      hint: 'Tarja com anúncio em destaque no topo da loja',
      fields: [
        {
          label: 'Texto',
          name: 'text',
          required: false,
          widget: 'string'
        },
        {
          label: 'Link',
          name: 'link',
          required: false,
          widget: 'string'
        }
      ]
    },
    {
      label: 'Barra de contatos',
      name: 'contacts_stripe',
      widget: 'object',
      hint: 'Informações de contato, redes sociais e páginas institucionais importantes',
      fields: [
        {
          label: 'Páginas',
          name: 'pages',
          widget: 'list',
          fields: [
            {
              label: 'Título',
              name: 'title',
              required: false,
              widget: 'string'
            },
            {
              label: 'Link',
              name: 'link',
              required: false,
              widget: 'string'
            }
          ]
        },
        {
          label: 'Mostrar telefone e WhatsApp',
          name: 'phone_wpp',
          widget: 'boolean'
        },
        {
          label: 'Mostrar redes sociais',
          name: 'socials',
          widget: 'boolean'
        }
      ]
    },
    {
      label: 'Lista de categorias',
      name: 'categories_list',
      widget: 'object',
      hint: 'Categorias em destaque exibidas diretamente no cabeçalho',
      fields: [
        {
          label: 'Categorias selecionadas',
          name: 'featured',
          widget: 'list',
          field: {
            label: 'Categoria/coleção/marca',
            widget: 'select',
            options: state.routes
              .filter(({ resource, name }) => Boolean(resource !== 'products' && name))
              .map(({ name, path }) => ({
                label: name,
                value: `${path}?${name}`
              }))
          }
        },
        {
          label: 'Categorias aleatórias',
          name: 'random',
          widget: 'number',
          min: 0,
          max: 20,
          hint: 'Máximo de categorias em primeiro nível escolhidas randomicamente'
        }
      ]
    },
    {
      label: 'Mostrar input de busca',
      name: 'search_input',
      widget: 'boolean'
    }
  ]
})
