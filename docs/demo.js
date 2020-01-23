import widget from './../src/'
import appendTest from './../src/append/test'

const options = {
    fbqContainerId: 'FBQ-KMQZKG9',
  parseDomMsDelay: 300
}

window._widgets = false
appendTest(options)

widget(options)

export default widget