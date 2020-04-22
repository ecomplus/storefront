export default ({ baseDir }) => ({
  label: 'Informações',
  file: `${baseDir}content/info.json`,
  name: 'info',
  hint: 'Informações gerais da loja, exibidas em várias páginas',
  widget: 'object',
  fields: [
    {
      label: 'Frete',
      name: 'shipping',
      widget: 'object',
      fields: [
        {
          label: 'Texto',
          required: false,
          name: 'text',
          widget: 'string'
        },
        {
          label: 'Link',
          required: false,
          name: 'link',
          widget: 'string'
        },
        {
          label: 'Exibir na barra de informações',
          name: 'show',
          widget: 'boolean',
          default: true,
          required: false
        }
      ]
    },
    {
      label: 'Parcelamento',
      name: 'installments',
      widget: 'object',
      fields: [
        {
          label: 'Texto',
          required: false,
          name: 'text',
          widget: 'string'
        },
        {
          label: 'Link',
          required: false,
          name: 'link',
          widget: 'string'
        },
        {
          label: 'Exibir na barra de informações',
          name: 'show',
          widget: 'boolean',
          default: true,
          required: false
        }
      ]
    },
    {
      label: 'Trocas',
      name: 'exchange',
      widget: 'object',
      fields: [
        {
          label: 'Texto',
          required: false,
          name: 'text',
          widget: 'string'
        },
        {
          label: 'Link',
          required: false,
          name: 'link',
          widget: 'string'
        },
        {
          label: 'Exibir na barra de informações',
          name: 'show',
          widget: 'boolean',
          default: true,
          required: false
        }
      ]
    },
    {
      label: 'Promoção',
      name: 'promo',
      widget: 'object',
      fields: [
        {
          label: 'Texto',
          required: false,
          name: 'text',
          widget: 'string'
        },
        {
          label: 'Link',
          required: false,
          name: 'link',
          widget: 'string'
        },
        {
          label: 'Exibir na barra de informações',
          name: 'show',
          widget: 'boolean',
          default: true,
          required: false
        }
      ]
    }
  ]
})
