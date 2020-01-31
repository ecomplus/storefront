import $ from './$'
import $overlay from './$overlay'
import animateCss from './animate-css'

const $menu = $('#menu')
let isVisible = false

const toggleSidenav = (isClose) => {
  if (!isVisible) {
    if (isClose !== true) {
      $overlay.show()
      $overlay.once('hide', () => {
        toggleSidenav(true)
      })
      $menu.style.display = 'block'
      animateCss($menu, 'slideInLeft')
      isVisible = true
    }
  } else {
    animateCss($menu, 'slideOutLeft').then(() => {
      $menu.style.display = null
      $overlay.hide()
    })
    isVisible = false
  }
}

window.toggleSidenav = toggleSidenav

window.closeCollapsedMenu = () => {
  $('#menu .collapse.show').classList.remove('show')
}
