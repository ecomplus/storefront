import $ from './$'
import $overlay from './$overlay'
import animateCss from './animate-css'

const $menu = $('#menu')

const sidenav = {
  isVisible: false,

  toggle () {
    if (!this.isVisible) {
      $overlay.show()
      $overlay.once('hide', () => {
        this.close()
      })
      $menu.style.display = 'block'
      animateCss($menu, 'slideInLeft')
    } else {
      animateCss($menu, 'slideOutLeft').then(() => {
        $menu.style.display = null
        $overlay.hide()
      })
    }
    this.isVisible = !this.isVisible
  },

  close () {
    this.isVisible = true
    this.toggle()
  }
}

window.toggleSidenav = () => {
  sidenav.toggle()
}

window.closeCollapsedMenu = () => {
  $('#menu .collapse.show').classList.remove('show')
}
