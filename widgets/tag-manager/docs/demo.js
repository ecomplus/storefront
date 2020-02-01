import widget from './../src/'
import appendTest from './../src/append/test'

const options = {
  gtmContainerId: 'GTM-KMQZKG9',
  dataLayerVar: 'dataLayer',
  parseDomMsDelay: 300
}

window._widgets = false
appendTest(options)

widget(options)

export default widget
