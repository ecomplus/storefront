import $ from './$'
import $overlay from './$overlay'
import animateCss from './animate-css'

const $menu = $('#menu')

const toggleSidenav = (isClose) => {
  if (isClose !== true && $menu.style.display !== 'block') {
    $overlay.show()
    $overlay.once('hide', () => {
      toggleSidenav(true)
    })
    $menu.style.display = 'block'
    animateCss($menu, 'slideInLeft')
  } else {
    animateCss($menu, 'slideOutLeft').then(() => {
      $menu.style.display = null
      $overlay.hide()
    })
  }
}

window.toggleSidenav = toggleSidenav

window.closeCollapsedMenu = () => {
  $('#menu .collapse.show').classList.remove('show')
}
