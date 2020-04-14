import { animateCss, $ } from '@ecomplus/storefront-twbs'
import overlay from './overlay'

const $menu = $('#menu')[0]
let isVisible = false

const toggleSidenav = (slug, isClose) => {
  let $collapse
  if (slug) {
    $collapse = $(`#a-${slug}`)
    if (!$collapse.length) {
      window.location = `/${slug}`
      return
    }
  }

  if (!isVisible) {
    if (isClose !== true) {
      overlay.show()
      overlay.once('hide', () => {
        toggleSidenav(null, true)
      })
      $menu.style.display = 'flex'
      animateCss($menu, 'slideInLeft')
      isVisible = true
      if ($collapse) {
        $collapse.collapse('show')
      }
    }
  } else {
    animateCss($menu, 'slideOutLeft').then(() => {
      $menu.style.display = null
      overlay.hide()
    })
    isVisible = false
  }
}

window.toggleSidenav = toggleSidenav
