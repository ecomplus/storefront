import general from './settings/general'
import contacts from './settings/contacts'
import info from './settings/info'
import social from './settings/social'
import dictionary from './settings/dictionary'

export default {
  name: 'settings',
  label: 'Configurações',
  description: 'Configurações gerais para identidade e metadados do site',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    general,
    contacts,
    info,
    social,
    dictionary
  ]
}
