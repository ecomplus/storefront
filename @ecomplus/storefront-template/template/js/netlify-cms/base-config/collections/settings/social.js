export default ({ baseDir }) => ({
  name: 'social',
  file: `${baseDir}content/social.json`,
  label: 'Sociais',
  hint: 'Configurações para compartilhamento da loja',
  fields: [
    {
      label: 'Open Graphs Image',
      name: 'og_image',
      required: false,
      widget: 'image',
      hint: 'Imagem que é exibida quando o site é compartilhado'
    },
    {
      label: 'ID do app Facebook',
      name: 'fb_app_id',
      required: false,
      widget: 'string'
    },
    {
      label: 'Username do twitter',
      name: 'twitter_username',
      required: false,
      widget: 'string'
    }
  ]
})
