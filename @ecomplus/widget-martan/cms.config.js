import { name } from './package.json'

const label = 'Martan'
const thumbnail = 'https://ik.imagekit.io/2wovc1fdm/review-6ee734d1-0d51-4b83-8911-5bd8e74fd18f-1767972806198-logo-nbg_R-cm00EY6.png'

const martan = {
  label: 'Configuração dos Widgets',
  name: 'options',
  widget: 'object',
  hint: 'Para ajuda com a configuração use nossa documentação.(https://docs.martan.app/integracoes/ecomplus)',
  fields: [
    {
      label: 'ID da loja (Store ID)',
      hint: 'Obtenha aqui https://dash.martan.app/stores',
      name: 'store_id',
      widget: 'number',
      required: true
    },
    {
      label: 'Web ID (API-Key)',
      name: 'web_id',
      widget: 'string',
      required: true,
      hint: 'Obtenha aqui https://dash.martan.app/stores'
    }
  ]
}

const widgetRating = {
  label: 'Widget de Avaliações Card de Produtos (Rating)',
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
      default: true
    },
    {
      label: 'Tamanho da font (px) da estrela',
      name: 'font_size',
      hint: 'Tamanho do icone da estrela nos cards de produtos',
      widget: 'number',
      default: 15,
      required: false
    },
    {
      label: 'Cor do icone de estrela',
      hint: 'Cor do incone de estrela que será exibido no widget de reviews',
      name: 'star_color',
      widget: 'color',
      required: false,
      default: '#ffc107'
    },
    {
      label: 'Estilo do widget',
      name: 'theme',
      widget: 'select',
      required: false,
      default: 'normal',
      options: [
        {
          label: 'Compacto',
          value: 'compact'
        },
        {
          label: 'Nota Completa',
          value: 'normal'
        }
      ]
    },
    {
      label: 'Quando exibir o widget',
      hint: 'É possível exibir este widget apenas quando houver avaliações',
      name: 'display',
      widget: 'select',
      required: false,
      default: 'gt1',
      options: [
        {
          label: 'Sempre',
          value: 'always'
        },
        {
          label: 'Apenas quando houver +1 avaliação',
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
      required: false,
      default: '#ffc107'
    },
    {
      label: 'Estilo do Cabeçalho',
      name: 'header_layout',
      widget: 'select',
      required: false,
      default: 'Histogram',
      options: [
        {
          label: 'Padrão',
          value: 'Padrao'
        },
        {
          label: 'Compacto',
          value: 'compact'
        },
        {
          label: 'Centralizado',
          value: 'Center'
        },
        {
          label: 'Resumo',
          value: 'Summary'
        },
        {
          label: 'Histograma',
          value: 'Histogram'
        }
      ]
    },
    {
      label: 'Estilo do layout de avaliações',
      name: 'reviews_layout',
      widget: 'select',
      required: false,
      default: 'list-grid',
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

const widgetQuestions = {
  label: 'Perguntas e Respostas',
  name: 'widget_questions',
  widget: 'object',
  hint: 'Este widget é exibido apenas na página de produtos, exibindo uma listagem com as perguntas e respostas dos compradores.',
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
      default: 'Perguntas e respostas',
      required: false
    },
    {
      label: 'Habilitar novas pergunta',
      name: 'enable_new_questions',
      widget: 'boolean',
      default: true
    }
  ]
}

martan.fields.push(widgetRating)
martan.fields.push(widgetReview)
martan.fields.push(widgetQuestions)

configDefault.fields.push(martan)
export default () => configDefault
