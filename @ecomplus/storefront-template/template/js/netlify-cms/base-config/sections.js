const bannerFields = [
  {
    label: 'Imagem',
    name: 'img',
    widget: 'image'
  },
  {
    label: 'Link',
    required: false,
    name: 'link',
    widget: 'string'
  },
  {
    label: 'Alt',
    required: false,
    name: 'alt',
    widget: 'string'
  },
  {
    label: 'Imagem para mobile',
    required: false,
    name: 'mobile_img',
    widget: 'image'
  }
]

export default ({ state }) => [
  {
    label: 'Banner responsivo',
    name: 'responsive-banner',
    widget: 'object',
    fields: bannerFields
  },
  {
    label: 'Grid de banners',
    name: 'banners-grid',
    widget: 'object',
    fields: [
      {
        label: 'Banners',
        name: 'banners',
        widget: 'list',
        fields: bannerFields
      }
    ]
  },
  {
    label: 'Conteúdo customizado',
    name: 'custom-content',
    widget: 'object',
    fields: [
      {
        label: 'Conteúdo markdown customizado',
        name: 'markdown',
        widget: 'markdown',
        hint: 'Markdown parseado para HTML'
      }
    ]
  },
  {
    label: 'Slider de banners',
    name: 'banner-slider',
    widget: 'object',
    fields: [
      {
        label: 'Slides',
        name: 'slides',
        widget: 'list',
        fields: bannerFields.concat([
          {
            label: 'Data de início',
            required: false,
            name: 'start',
            widget: 'datetime',
            dateFormat: 'DD/MM/YYYY',
            timeFormat: 'HH:mm'
          },
          {
            label: 'Data de encerramento',
            required: false,
            name: 'end',
            widget: 'datetime',
            dateFormat: 'DD/MM/YYYY',
            timeFormat: 'HH:mm'
          }
        ])
      },
      {
        label: 'Slider autoplay',
        name: 'autoplay',
        hint: 'Exibição de cada slide em milisegundos, defina 0 para desabilitar autoplay',
        min: 0,
        step: 1000,
        default: 9000,
        widget: 'number'
      }
    ]
  },
  {
    label: 'Temporizador de ofertas',
    name: 'offers-timer',
    widget: 'object',
    fields: [
      {
        label: 'Ofertas',
        name: 'offers',
        widget: 'list',
        field: {
          label: 'SKU do produto',
          name: 'product_id',
          widget: 'select',
          options: state.routes
            .filter(({ sku }) => typeof sku === 'string')
            .map(({ _id, sku }) => ({
              label: sku,
              value: _id
            }))
        }
      },
      {
        label: 'Data de início',
        required: false,
        name: 'start',
        widget: 'datetime',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm'
      },
      {
        label: 'Data de encerramento',
        name: 'end',
        widget: 'datetime',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm'
      },
      {
        label: 'Notas',
        required: false,
        name: 'notes',
        hint: 'Descrição auxiliar sobre a promoção',
        widget: 'text'
      },
      {
        label: 'Máximo de horas',
        name: 'max_hours',
        hint: 'Tempo máximo exibido no contador',
        widget: 'number',
        default: 24
      }
    ]
  },
  {
    label: 'Barra de informações',
    name: 'info-bar',
    widget: 'object',
    fields: [
      {
        label: 'Exibir barra de informações',
        name: 'enabled',
        widget: 'boolean',
        default: true
      }
    ]
  },
  {
    label: 'Estante de produtos',
    name: 'collection-shelf',
    widget: 'object',
    fields: [
      {
        label: 'Coleção de produtos',
        required: false,
        name: 'collection_id',
        hint: 'Se este campo não for preenchido, serão listados os produtos mais populares da loja',
        widget: 'select',
        options: [{
          resource: 'collections',
          label: ''
        }, {
          resource: 'categories',
          label: 'Categoria: '
        }, {
          resource: 'brands',
          label: 'Marca: '
        }].reduce((options, shelf) => {
          state.routes.forEach(({ _id, resource, name, path }) => {
            if (resource === shelf.resource) {
              options.push({
                label: shelf.label + name,
                value: `${_id}:${resource}:${name}:${path}`
              })
            }
          })
          return options
        }, [])
      },
      {
        label: 'Ordenação',
        required: false,
        name: 'sort',
        widget: 'select',
        options: [
          {
            label: 'Relevância',
            value: 'views'
          },
          {
            label: 'Mais vendidos',
            value: 'sales'
          },
          {
            label: 'Lançamento',
            value: 'news'
          },
          {
            label: 'Ofertas',
            value: 'offers'
          },
          {
            label: 'Menor preço',
            value: 'lowest_price'
          },
          {
            label: 'Maior preço',
            value: 'highest_price'
          },
          {
            label: 'Alfabética (slug)',
            value: 'slug'
          }
        ]
      },
      {
        label: 'Embaralhar produtos',
        name: 'shuffle',
        widget: 'boolean',
        default: false
      },
      {
        label: 'Título da estante',
        required: false,
        name: 'title',
        hint: 'Usará o nome da coleção por padrão',
        widget: 'string'
      },
      {
        label: 'Link no título',
        required: false,
        name: 'link',
        hint: 'Usará o slug da coleção por padrão',
        widget: 'string'
      },
      {
        label: 'Sem cabeçalho',
        required: false,
        name: 'headless',
        widget: 'boolean',
        hint: 'Mostrar apenas a lista de produtos, sem título ou link'
      },
      {
        label: 'Limite de itens',
        required: false,
        name: 'limit',
        widget: 'number',
        min: 1,
        max: 24,
        default: 12
      },
      {
        label: 'Paginação',
        required: false,
        name: 'page',
        hint: 'Aumente o número da página para pular os itens iniciais e repetir estantes com a mesma coleção',
        widget: 'number',
        min: 1,
        default: 1
      }
    ]
  },
  {
    label: 'Carrossel de marcas',
    name: 'brands-carousel',
    widget: 'object',
    fields: [
      {
        label: 'Ordenação',
        required: false,
        name: 'sort',
        widget: 'select',
        options: [
          {
            label: 'Padrão',
            value: ''
          },
          {
            label: 'Alfabética',
            value: 'name'
          }
        ]
      },
      {
        label: 'Limite de marcas',
        name: 'limit',
        widget: 'number',
        min: 1,
        max: 48,
        default: 24
      },
      {
        label: 'Offset de marcas',
        name: 'offset',
        widget: 'hidden',
        default: 0
      },
      {
        label: 'Carousel autoplay',
        required: false,
        name: 'autoplay',
        hint: 'Exibição de cada página em milisegundos, 0 desativa o autoplay',
        min: 0,
        step: 1000,
        widget: 'number'
      }
    ]
  },
  {
    label: 'Breadcrumbs',
    name: 'breadcrumbs',
    widget: 'object',
    fields: [
      {
        label: 'Exibir breadcrumbs',
        name: 'enabled',
        widget: 'boolean',
        default: true
      }
    ]
  },
  {
    label: 'Título da página (SEO)',
    name: 'page-title',
    widget: 'object',
    fields: [
      {
        label: 'Título (H1)',
        required: false,
        name: 'title',
        hint: 'Por padrão será usado o título salvo no conteúdo ou nome do documento se houver',
        widget: 'string'
      },
      {
        label: 'Descrição curta',
        required: false,
        name: 'description',
        hint: 'Será usada a descrição curta da marca ou categoria nas respectivas páginas',
        widget: 'string'
      }
    ]
  },
  {
    label: 'Blog',
    name: 'blog',
    widget: 'object',
    fields: [
      {
        label: 'Listar posts do blog',
        name: 'enabled',
        widget: 'boolean',
        default: true
      }
    ]
  },
  {
    label: 'Código HTML',
    name: 'custom-html',
    widget: 'object',
    fields: [
      {
        label: 'Conteúdo HTML customizado',
        name: 'html',
        widget: 'code',
        default_language: 'html',
        output_code_only: true
      }
    ]
  }
]
