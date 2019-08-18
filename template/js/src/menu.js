import $ from './lib/$'
import $overlay from './lib/$overlay'
import Slideout from 'slideout'

const slideout = new Slideout({
  panel: $('#main'),
  menu: $('#menu'),
  padding: 300,
  tolerance: 70
})

slideout.on('beforeopen', () => {
  $overlay.show()
  const close = $overlay.hide
  slideout.once('close', close)
  $overlay.once('hide', () => {
    slideout.off('close', close)
    slideout.close()
  })
})

window.toggleSidenav = () => {
  slideout.toggle()
}

window.closeCollapsedMenu = () => {
  $('#menu .collapse.show').classList.remove('show')
}
