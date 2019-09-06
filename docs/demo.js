import widget from './../src/'

window._widgets = false
widget({
  /*
  props: {
    buyText: 'BUY'
  },
  */
  slots: {
    buy: '<img id="logo" class="header__logo" src="/img/uploads/logo.png" alt="My Shop">'
  }
})

export default widget
