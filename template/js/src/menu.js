import { IS_MOBILE } from './lib/env'
import $ from './lib/$'
import $overlay from './lib/$overlay'
import Slideout from 'slideout'

const slideout = new Slideout({
  panel: $('#main'),
  menu: $('#menu'),
  padding: 300,
  tolerance: 70
})

let $fixedNav
if (!IS_MOBILE) {
  $fixedNav = $('[data-slideout-fixed]')
}

slideout.on('beforeopen', () => {
  if ($fixedNav && window.navFixed && window.pageYOffset > 0) {
    $fixedNav.style.position = 'absolute'
    $fixedNav.style.top = `${window.pageYOffset}px`
  }

  $overlay.show()
  const close = $overlay.hide
  slideout.once('close', close)
  $overlay.once('hide', () => {
    slideout.off('close', close)
    slideout.close()
  })
})

if ($fixedNav) {
  slideout.on('close', () => {
    $fixedNav.style.position = null
    $fixedNav.style.top = null
  })
}

window.toggleSidenav = () => {
  slideout.toggle()
}

window.closeCollapsedMenu = () => {
  $('#menu .collapse.show').classList.remove('show')
}
