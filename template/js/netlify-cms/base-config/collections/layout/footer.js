export default {
  name: 'footer',
  label: 'Footer',
  file: 'content/footer.json',
  fields: [
    {
      label: 'Descrição',
      name: 'description',
      widget: 'object',
      fields: [
        {
          label: 'Título',
          hint: 'Em destaque, dentro de uma tag H2',
          required: false,
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Texto',
          required: false,
          name: 'text',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Lista de links 1',
      name: 'links_1',
      widget: 'object',
      hint: 'Lista de links normalmente utilizada para exibir páginas como, Sobre nós e Política de privacidade',
      fields: [
        {
          label: 'Listar páginas',
          hint: 'Ativar para listar as páginas extra automáticamente',
          name: 'list_pages',
          widget: 'boolean',
          default: true
        },
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Links',
          name: 'list',
          widget: 'list',
          fields: [
            {
              label: 'Texto',
              required: false,
              name: 'text',
              widget: 'string'
            },
            {
              label: 'URL',
              required: false,
              name: 'url',
              widget: 'string'
            }
          ]
        }
      ]
    },
    {
      label: 'Lista de links 2',
      name: 'links_2',
      widget: 'object',
      hint: 'Lista adicional de links, para exibir páginas',
      fields: [
        {
          label: 'Listar categorias',
          hint: 'Ativar para listar as categorias da loja automáticamente',
          name: 'list_categories',
          widget: 'boolean',
          default: true
        },
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Links',
          name: 'list',
          widget: 'list',
          fields: [
            {
              label: 'Texto',
              required: false,
              name: 'text',
              widget: 'string'
            },
            {
              label: 'URL',
              required: false,
              name: 'url',
              widget: 'string'
            }
          ]
        }
      ]
    },
    {
      label: 'Contatos',
      name: 'contacts',
      widget: 'object',
      hint: 'Contatos da loja',
      fields: [
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Mostrar telefone e whatsapp',
          name: 'phone_wpp',
          required: false,
          widget: 'boolean'
        },
        {
          label: 'Mostar email',
          required: false,
          name: 'email',
          widget: 'boolean'
        },
        {
          label: 'Mostrar redes  sociais',
          name: 'socials',
          required: false,
          widget: 'boolean'
        }
      ]
    },
    {
      label: 'Selos',
      name: 'stamps',
      widget: 'list',
      fields: [
        {
          label: 'Imagem',
          required: false,
          name: 'src',
          widget: 'image'
        },
        {
          label: 'alt',
          required: false,
          name: 'alt',
          widget: 'string'
        },
        {
          label: 'Link',
          required: false,
          name: 'link',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Meios de pagamento',
      name: 'payment_methods',
      widget: 'object',
      fields: [
        {
          label: 'Boleto',
          name: 'boleto',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Visa',
          name: 'visa',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Mastercard',
          name: 'mastercard',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Elo',
          name: 'elo',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'American Express',
          name: 'amex',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Hipercard',
          name: 'hipercard',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Hiper',
          name: 'hiper',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Diners',
          name: 'diners',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Aura',
          name: 'aura',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Itaú',
          name: 'itau',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Bradesco',
          name: 'bradesco',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Banco do Brasil',
          name: 'bb',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Santander',
          name: 'santander',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Citibank',
          name: 'citibank',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'HSBC',
          name: 'hsbc',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Banrisul',
          name: 'banrisul',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Mais',
          name: 'mais',
          widget: 'boolean',
          default: true,
          required: false
        },
        {
          label: 'Paypal',
          name: 'paypal',
          widget: 'boolean',
          default: true,
          required: false
        }
      ]
    },
    {
      label: 'Créditos',
      name: 'credits',
      widget: 'string',
      required: false
    }
  ]
}
