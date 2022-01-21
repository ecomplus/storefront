export default ({ baseDir }) => ({
  name: 'general',
  label: 'Configurações gerais',
  file: `${baseDir}content/settings.json`,
  editor: {
    preview: true
  },
  fields: [
    {
      label: 'E-Com Plus Store ID',
      name: 'store_id',
      widget: 'hidden'
    },
    {
      label: 'Repositório',
      name: 'repository',
      widget: 'hidden'
    },
    {
      label: 'Domínio',
      name: 'domain',
      widget: 'string'
    },
    {
      label: 'Nome da loja',
      name: 'name',
      widget: 'string'
    },
    {
      label: 'Nome curto',
      name: 'short_name',
      widget: 'string',
      hint: 'Título do aplicativo quando instalado (PWA)'
    },
    {
      label: 'Descrição curta',
      name: 'description',
      widget: 'text'
    },
    {
      label: 'Logo',
      name: 'logo',
      widget: 'image'
    },
    {
      label: 'Tema',
      name: 'theme',
      widget: 'object',
      fields: [
        {
          label: 'Storefront',
          name: 'custom',
          widget: 'select',
          options: [
            {
              label: 'Storefront padrão',
              value: '_'
            },
            {
              label: 'Clean: Branco',
              value: 'clean-white'
            },
            {
              label: 'Clean: Escala de cinza',
              value: 'clean-gray'
            },
            {
              label: 'Clean: Preto',
              value: 'clean-dark'
            },
            {
              label: 'Nicho: Bebê',
              value: 'niche-baby'
            },
            {
              label: 'Nicho: Flores',
              value: 'niche-flowers'
            },
            {
              label: 'Nicho: Game',
              value: 'niche-game'
            }
          ]
        },
        {
          label: 'UI base',
          name: 'bootswatch',
          hint: 'Powered by https://bootswatch.com/',
          widget: 'select',
          options: [
            {
              label: 'Bootstrap padrão',
              value: '_'
            },
            {
              label: 'Cerulean',
              value: 'cerulean'
            },
            {
              label: 'Cosmo',
              value: 'cosmo'
            },
            {
              label: 'Cyborg',
              value: 'cyborg'
            },
            {
              label: 'Darkly',
              value: 'darkly'
            },
            {
              label: 'Flatly',
              value: 'flatly'
            },
            {
              label: 'Journal',
              value: 'journal'
            },
            {
              label: 'Litera',
              value: 'litera'
            },
            {
              label: 'Lumen',
              value: 'lumen'
            },
            {
              label: 'Lux',
              value: 'lux'
            },
            {
              label: 'Materia',
              value: 'materia'
            },
            {
              label: 'Minty',
              value: 'minty'
            },
            {
              label: 'Pulse',
              value: 'pulse'
            },
            {
              label: 'Sandstone',
              value: 'sandstone'
            },
            {
              label: 'Simplex',
              value: 'simplex'
            },
            {
              label: 'Sketchy',
              value: 'sketchy'
            },
            {
              label: 'Slate',
              value: 'slate'
            },
            {
              label: 'Solar',
              value: 'solar'
            },
            {
              label: 'Spacelab',
              value: 'spacelab'
            },
            {
              label: 'United',
              value: 'united'
            },
            {
              label: 'Yeti',
              value: 'yeti'
            }
          ]
        }
      ]
    },
    {
      label: 'Cor primária',
      name: 'primary_color',
      widget: 'color',
      required: false
    },
    {
      label: 'Cor secundária',
      name: 'secondary_color',
      widget: 'color',
      required: false
    },
    {
      label: 'Cor de fundo do app',
      name: 'bg_color',
      widget: 'color'
    },
    {
      label: 'Ícone do app',
      name: 'icon',
      widget: 'image'
    },
    {
      label: 'Ícone grande',
      name: 'large_icon',
      widget: 'image'
    },
    {
      label: 'Favicon',
      name: 'favicon',
      widget: 'image'
    },
    {
      label: 'Language',
      name: 'lang',
      widget: 'hidden',
      default: 'pt_br'
    },
    {
      label: 'Moeda',
      name: 'currency',
      widget: 'hidden',
      default: 'BRL'
    },
    {
      label: 'Símbolo da moeda',
      name: 'currency_symbol',
      widget: 'hidden',
      default: 'R$'
    },
    {
      label: 'Código do país',
      name: 'country_code',
      widget: 'hidden',
      default: 'BR'
    }
  ]
})
