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
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
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
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
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
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
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
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
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
      label: 'Pop up',
      name: 'popup',
      required: false,
      widget: 'object',
      fields: [
        {
          label: 'Imagem do popup',
          hint: 'Respeitar largura máxima de 600px',
          required: false,
          name: 'img',
          widget: 'image',
          media_library: {
            config: {
              max_file_size: 300000
            }
          }
        },
        {
          label: 'Exibir popup',
          name: 'show',
          widget: 'boolean',
          default: false,
          required: false
        }
      ]
    }
  ]
})
