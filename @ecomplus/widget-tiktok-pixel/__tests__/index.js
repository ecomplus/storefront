import widget from './../src/'
import appendTest from './../src/append/test'

const options = {
  tiktokPixelId: 'CDCP353C77U6290RJIU0',
  debug: true
}

window._widgets = false
appendTest(options)

widget(options)

export default widget
