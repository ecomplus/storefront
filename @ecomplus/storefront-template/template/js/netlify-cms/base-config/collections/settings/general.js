export default ({ baseDir }) => ({
  name: 'general',
  label: 'Configurações gerais',
  file: `${baseDir}content/settings.json`,
  fields: [
    {
      label: 'Store ID',
      name: 'store_id',
      hint: 'Id da loja, pode ser encontrado na página de configurações do painel',
      required: false,
      widget: 'number'
    },
    {
      label: 'Domínio',
      name: 'domain',
      widget: 'string'
    },
    {
      label: 'Name',
      name: 'name',
      widget: 'string'
    },
    {
      label: 'Short Name',
      name: 'short_name',
      widget: 'string',
      hint: 'Deve conter apenas letras, sem caracteres especiais ou espaços'
    },
    {
      label: 'Short Description',
      name: 'description',
      widget: 'text'
    },
    {
      label: 'Primary Color',
      name: 'primary_color',
      widget: 'color'
    },
    {
      label: 'Secondary Color',
      name: 'secondary_color',
      widget: 'color'
    },
    {
      label: 'App Background Color',
      name: 'bg_color',
      widget: 'color'
    },
    {
      label: 'Tema',
      name: 'theme',
      widget: 'object',
      fields: [
        {
          label: 'Estilo',
          name: 'bootswatch',
          widget: 'select',
          options: [
            {
              label: 'Padrão',
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
              label: 'Superhero',
              value: 'superhero'
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
      label: 'Logo',
      name: 'logo',
      widget: 'image',
      required: false
    },
    {
      label: 'Mini Logo',
      name: 'mini_logo',
      widget: 'image',
      required: false
    },
    {
      label: 'Icon',
      name: 'icon',
      widget: 'image'
    },
    {
      label: 'Large Icon',
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
