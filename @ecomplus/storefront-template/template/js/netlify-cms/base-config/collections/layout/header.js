export default ({ baseDir }) => ({
  name: 'header',
  label: 'Header',
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
          label: 'Mostrar telefone e whatsapp',
          name: 'phone_wpp',
          required: false,
          widget: 'boolean'
        },
        {
          label: 'Mostrar redes sociais',
          name: 'socials',
          required: false,
          widget: 'boolean'
        }
      ]
    },
    {
      label: 'Lista de categorias',
      name: 'max_categories',
      hint: 'Máximo de categorias principais exibidas diretamente no cabeçalho',
      min: 0,
      max: 20,
      required: false,
      widget: 'number'
    }
  ]
})
