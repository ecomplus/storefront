import { isMobile, animateCss, $ } from '@ecomplus/storefront-twbs'
import overlay from './overlay'

const $menu = $('#menu')[0]
let isVisible = false

let $openSubMenu

const closeSubmenu = () => {
  $openSubMenu.style.display = 'none'
  $openSubMenu = null
}

const toggleSubmenu = (slug, isClick) => {
  if (isClick && slug) {
    window.location = `/${slug}`
    return
  }
  if (!isMobile) {
    if ($openSubMenu || isClick) {
      closeSubmenu()
    }
    if (slug) {
      $openSubMenu = document.getElementById(`s-${slug.replace(/\//g, '_')}`)
      if (!$openSubMenu) {
        return
      }

      if ($openSubMenu) {
        $openSubMenu.style.display = 'flex'
        animateCss($openSubMenu, 'fadeIn')
        setTimeout(() => { document.addEventListener('click', checkSubmenuOutClick) }, 200)
      }
    }
  }
}

const checkSubmenuOutClick = (e) => {
  if (!$openSubMenu.contains(e.target)) {
    closeSubmenu()
    document.removeEventListener('click', checkSubmenuOutClick)
  }
}

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
window.toggleSubmenu = toggleSubmenu
