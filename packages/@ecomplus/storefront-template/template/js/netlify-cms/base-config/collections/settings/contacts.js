export default {
  name: 'contacts',
  file: 'content/contacts.json',
  label: 'Contatos',
  hint: 'Contatos da loja, exibidos em várias páginas',
  fields: [
    {
      label: 'E-mail',
      name: 'email',
      required: false,
      widget: 'string'
    },
    {
      label: 'Telefone',
      name: 'phone',
      required: false,
      widget: 'string'
    },
    {
      label: 'Endereço',
      name: 'address',
      required: false,
      widget: 'string'
    },
    {
      label: 'CNPJ/CPF',
      name: 'doc_number',
      required: false,
      widget: 'string'
    },
    {
      label: 'Whatsapp',
      name: 'whatsapp',
      required: false,
      widget: 'string'
    },
    {
      label: 'Facebook',
      name: 'facebook',
      widget: 'string',
      required: false
    },
    {
      label: 'Twitter',
      name: 'twitter',
      widget: 'string',
      required: false
    },
    {
      label: 'Youtube',
      name: 'youtube',
      widget: 'string',
      required: false
    },
    {
      label: 'Instagram',
      name: 'instagram',
      widget: 'string',
      required: false
    },
    {
      label: 'Pinterest',
      name: 'pinterest',
      widget: 'string',
      required: false
    },
    {
      label: 'LinkedIn',
      name: 'linkedin',
      widget: 'string',
      required: false
    }
  ]
}
