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
        options: state.routes
          .filter(({ resource }) => resource === 'collections')
          .map(({ name, _id }) => ({
            label: name,
            value: _id
          }))
      },
      {
        label: 'Embaralhar produtos',
        name: 'shuffle',
        widget: 'boolean',
        hint: 'Alterar ordem dos produtos aleatoriamente',
        default: true
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
    label: 'Título da página',
    name: 'page-title',
    widget: 'object',
    fields: [
      {
        label: 'Título',
        required: false,
        name: 'title',
        hint: 'Por padrão será usado o título salvo no conteúdo ou nome do documento e descrição curta',
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
