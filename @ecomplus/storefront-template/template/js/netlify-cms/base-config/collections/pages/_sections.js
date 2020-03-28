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
    name: 'banners',
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
        name: 'collection_id',
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
  }
]
