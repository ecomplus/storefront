import { name } from './package.json'

export default () => ({
  label: 'Detalhes do produto',
  thumbnail: 'https://ecom.nyc3.cdn.digitaloceanspaces.com/storefront/widgets/product.png',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Hidrata (atualiza) bloco principal em todas as páginas de produtos',
      name: 'active',
      widget: 'boolean'
    },
    {
      label: 'Apenas em desktops',
      name: 'desktopOnly',
      hint: 'Desativa o widget em dispositivos móveis',
      widget: 'boolean'
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'Rótulo do botão',
          name: 'buyText',
          required: false,
          widget: 'string',
          hint: 'Texto a ser usado no botão de compra, o padrão é a palavra "comprar"'
        },
        {
          label: 'HTML do botão',
          required: false,
          name: 'buy',
          widget: 'code',
          hint: 'Pode ser usado para substituir o botão "comprar" padrão',
          default_language: 'html',
          output_code_only: true
        },
        {
          label: 'Seletor de quantidade',
          name: 'strHasQuantitySelector',
          widget: 'select',
          options: [
            {
              label: 'Padrão do tema',
              value: '_'
            },
            {
              label: 'Apenas botão (adiciona 1 unidade)',
              value: ' '
            },
            {
              label: 'Input antes do botão',
              value: 'true'
            }
          ]
        },
        {
          label: 'Tag de Desconto',
          name: 'strHasDiscountTagOnUtm',
          widget: 'select',
          options: [
            {
              label: 'Padrão do tema',
              value: '_'
            },
            {
              label: 'Padrão e quando tem utm',
              value: 'true'
            }
          ]
        },
        {
          label: 'Temporizador de oferta',
          name: 'strHasPromotionTimer',
          widget: 'select',
          options: [
            {
              label: 'Padrão do tema',
              value: '_'
            },
            {
              label: 'Sem temporizador',
              value: ' '
            },
            {
              label: 'Temporizador em produtos com oferta e prazo',
              value: 'true'
            }
          ]
        },
        {
          label: 'Alerta de quantidade',
          name: 'lowQuantityToWarn',
          widget: 'number',
          min: 0,
          max: 999999,
          default: 12,
          hint: 'Quantidade máxima disponível para informar estoque baixo (gatilho da escassez)'
        },
        {
          label: 'Máximo de botões por variação',
          name: 'maxVariationOptionsBtns',
          widget: 'number',
          min: 0,
          max: 50,
          default: 6,
          hint: 'Máximo de opções por grade (tamanho, cor...) que poderão ser listadas com botões, ' +
            'acima do máximo as opções serão listadas em um seletor'
        }
      ]
    }
  ]
})
