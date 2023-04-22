import getContacts from './settings/contacts'
import getGeneral from './settings/general'
import getInfo from './settings/info'
import getMaintenance from './settings/maintenance'
import getSocial from './settings/social'
import getStamps from './settings/stamps'

export default options => ({
  name: 'settings',
  label: 'Configurações',
  description: 'Configurações gerais para identidade e metadados do site',
  delete: false,
  editor: {
    preview: false
  },
  files: [
    getContacts(options),
    getInfo(options),
    getGeneral(options),
    getMaintenance(options),
    getSocial(options),
    getStamps(options)
  ]
})
