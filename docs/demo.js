import widget from './../src/'
import EcomCart from '@ecomplus/shopping-cart'

window._widgets = false
widget()

EcomCart.on('increaseItemQnt', () => {
  window.alert('demo')
})

export default widget
