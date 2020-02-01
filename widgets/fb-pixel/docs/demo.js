import widget from './../src/'
import appendTest from './../src/append/test'

const options = {
  fbqContainerId: 'FBQ-KMQZKG9',
  debug: true
}

window._widgets = false
appendTest(options)

widget(options)

export default widget
