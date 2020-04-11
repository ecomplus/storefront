import getGeneral from './settings/general'
import getContacts from './settings/contacts'
import getInfo from './settings/info'
import getSocial from './settings/social'

export default options => ({
  name: 'settings',
  label: 'Configurações',
  description: 'Configurações gerais para identidade e metadados do site',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    getGeneral(options),
    getContacts(options),
    getInfo(options),
    getSocial(options)
  ]
})
