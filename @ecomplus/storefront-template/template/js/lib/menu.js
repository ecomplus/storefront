import { animateCss, $ } from '@ecomplus/storefront-twbs'
import overlay from './overlay'

const $menu = $('#menu')[0]
let isVisible = false

const toggleSidenav = (slug, isClose) => {
  let $collapse
  if (slug) {
    $collapse = $(`#a-${slug.replace(/\//g, '_')}`)
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
// Mega Menu Implementation JS //

const $menuMega = $('#menu__mega')[0]

const megaMenu = () => {
  if (!isVisible) {
    animateCss($menuMega, 'fadeIn')
    $menuMega.style.display = 'flex'
    isVisible = true
  } else {
    animateCss($menuMega, 'fadeOut').then(() => {
      $menuMega.style.display = null
      isVisible = false
    })
  }
}
window.megaMenu = megaMenu
