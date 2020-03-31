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
  }
]

export default [
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
    label: 'HTML customizado',
    name: 'custom-content',
    widget: 'object',
    fields: [
      {
        label: 'Conteúdo HTML customizado',
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
        fields: bannerFields
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
        widget: 'collections'
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
  }
]
