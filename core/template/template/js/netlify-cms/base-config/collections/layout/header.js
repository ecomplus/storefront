export default {
  name: 'header',
  label: 'Header',
  file: 'content/header.json',
  fields: [
    {
      label: 'Tarja de marketing ',
      name: 'marketing_stripe',
      widget: 'object',
      hint: 'Tarja na cor secundária com texto e botão, caso não seja configurada não é exibida na loja',
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
      label: 'Tarja de contatos',
      name: 'contacts_stripe',
      widget: 'object',
      hint: 'Tarja com contatos da loja, como páginas internas, telefones e redes sociais',
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
    }
  ]
}
