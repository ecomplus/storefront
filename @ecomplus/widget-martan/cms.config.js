import { name } from './package.json'

const label = 'Martan'
const thumbnail = 'https://ik.imagekit.io/2wovc1fdm/storefront-widget.png'

const martan = {
  label: 'Configuração dos Widgets',
  name: 'options',
  widget: 'object',
  hint: 'Para ajuda com a configuração use nossa documentação.(https://docs.martan.app/integracoes/ecomplus)',
  fields: [
    {
      label: 'ID da loja',
      hint: 'Obtenha aqui https://app.martan.app/settings',
      name: 'store_id',
      widget: 'number',
      required: true
    },
    {
      label: 'Widget Key',
      name: 'widget_key',
      widget: 'string',
      required: true,
      hint: 'Obtenha aqui https://app.martan.app/settings'
    },
    {
      label: 'Web ID',
      name: 'web_id',
      widget: 'string',
      required: true,
      hint: 'Obtenha aqui https://app.martan.app/settings'
    }
  ]
}

const widgetRating = {
  label: 'Média de avaliações',
  name: 'widget_rating',
  widget: 'object',
  hint: 'Este widget é exibido no card dos produtos exibindo a média das avaliações através de estrelas.',
  fields: [
    {
      label: 'Habilitar Widget',
      hint: 'Exibir estrela com classificação média das notas nos produtos.',
      name: 'is_enabled',
      widget: 'boolean',
      default: true
    },
    {
      label: 'Exibir na página de pesquisa?',
      hint: 'Exibir estrela com classificação média das notas nos cards de resultado de pesquisa',
      name: 'search_page',
      widget: 'boolean',
      default: false
    },
    {
      label: 'Tamanho da font (px) da estrela',
      name: 'font_size',
      hint: 'Tamanho do icone da estrela nos cards de produtos',
      widget: 'number',
      default: 12,
      required: false
    },
    {
      label: 'Cor do icone de estrela',
      hint: 'Cor do incone de estrela que será exibido no widget de reviews',
      name: 'star_color',
      widget: 'color',
      required: false
    },
    {
      label: 'Quando exibir o widget',
      hint: 'É possível exibir este widget apenas quando houver avaliações',
      name: 'display',
      widget: 'select',
      required: false,
      default: 'always',
      options: [
        {
          label: 'Sempre',
          value: 'always'
        },
        {
          label: 'Apenas quando houver avaliações',
          value: 'gt1'
        }
      ]
    }
  ]
}

const widgetReview = {
  label: 'Review de Produtos',
  name: 'widget_review',
  widget: 'object',
  hint: 'Este widget é exibido apenas na página de produtos, exibindo uma listagem com os comentários dos compradores.',
  fields: [
    {
      label: 'Habilitar Widget',
      name: 'is_enabled',
      widget: 'boolean',
      default: true
    },
    {
      label: 'Título',
      name: 'title',
      widget: 'string',
      default: 'Avaliações dos Clientes',
      required: false
    },
    {
      label: 'Cor do icone de estrela',
      name: 'star_color',
      widget: 'color',
      required: false
    },
    {
      label: 'Estilo do Cabeçalho',
      name: 'header_layout',
      widget: 'select',
      required: false,
      default: 'header-minimal',
      options: [
        {
          label: 'Minimal',
          value: 'header-minimal'
        },
        {
          label: 'Expandido',
          value: 'header-expanded'
        }
      ]
    },
    {
      label: 'Estilo do layout de avaliações',
      name: 'reviews_layout',
      widget: 'select',
      required: false,
      default: 'list-expanded',
      options: [
        {
          label: 'Lista',
          value: 'list-expanded'
        },
        {
          label: 'Grid',
          value: 'list-grid'
        }
      ]
    }
  ]
}

const widgetSnippet = {
  label: 'Snippet de Reviews',
  name: 'widget_snippet',
  widget: 'object',
  hint: 'Este widget será exibido na página de produtos acima do preço do produto.',
  fields: [
    {
      label: 'Habilitar Widget',
      name: 'is_enabled',
      widget: 'boolean',
      default: true
    },
    {
      label: 'Cor de fundo',
      name: 'background_color',
      widget: 'color',
      required: false
    },
    {
      label: 'Cor do Texto',
      name: 'text_color',
      widget: 'color',
      required: false
    },
    {
      label: 'Cor do icone de estrela',
      name: 'star_color',
      widget: 'color',
      required: false
    },
    {
      label: 'Bordas',
      name: 'border',
      widget: 'boolean',
      default: false,
      required: false
    },
    {
      label: 'Cor da borda',
      name: 'border_color',
      hint: 'Borda será aplicada apenas se opção acima estiver habilitada',
      widget: 'color',
      required: false
    }
  ]
}

const configDefault = {
  label,
  thumbnail,
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      name: 'active',
      label: 'Ativar',
      hint: 'Habilitar Martan',
      widget: 'boolean'
    },
    {
      name: 'desktopOnly',
      widget: 'hidden',
      default: false
    },
    {
      name: 'enableCheckout',
      widget: 'hidden',
      default: false
    },
    {
      name: 'disablePages',
      widget: 'hidden',
      default: true
    },
    {
      name: 'headAppend',
      widget: 'hidden',
      default: 'src/append/head'
    },
    {
      name: 'bodyAppend',
      widget: 'hidden',
      default: 'src/append/body'
    },
    {
      name: 'productDescriptionAppend',
      widget: 'hidden',
      default: 'src/append/product-block'
    },
    {
      name: 'productCardSlots',
      widget: 'hidden',
      default: 'src/append/product-card-slots'
    },
    {
      name: 'productSlots',
      widget: 'hidden',
      default: 'src/append/product-slots'
    }
  ]
}

martan.fields.push(widgetRating)
martan.fields.push(widgetReview)
martan.fields.push(widgetSnippet)

configDefault.fields.push(martan)
export default () => configDefault
