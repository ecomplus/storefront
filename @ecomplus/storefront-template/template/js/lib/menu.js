import { isMobile, animateCss, Collapse } from '@ecomplus/storefront-twbs'
import overlay from './overlay'

const $menu = document.getElementById('menu')
let isVisible = false

let $openSubMenu
let closeSubmenuTimer = null
let isSubmenuHovered = false

const closeSubmenu = () => {
  $openSubMenu.style.display = 'none'
  $openSubMenu = null
}

const toggleSubmenu = (slug, $categoryLink, isClick) => {
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
        isSubmenuHovered = false
        clearTimeout(closeSubmenuTimer)
        const checkHoverAndClose = () => {
          clearTimeout(closeSubmenuTimer)
          closeSubmenuTimer = setTimeout(() => {
            if (!isSubmenuHovered) {
              $openSubMenu.removeEventListener('mouseover', onSubmenuOver)
              closeSubmenu()
            }
          }, 800)
        }
        if ($categoryLink) {
          $categoryLink.addEventListener('mouseleave', checkHoverAndClose, { once: true })
        }

        const onSubmenuOver = () => {
          isSubmenuHovered = true
          $openSubMenu.addEventListener('mouseleave', () => {
            if (isSubmenuHovered) {
              isSubmenuHovered = false
              checkHoverAndClose()
            }
          }, { once: true })
        }
        $openSubMenu.addEventListener('mouseover', onSubmenuOver)

        $openSubMenu.style.display = 'grid'
        animateCss($openSubMenu, 'fadeIn')
      }
    }
  }
}

const toggleSidenav = (slug, isClose) => {
  let $collapse
  if (slug) {
    $collapse = document.getElementById(`a-${slug.replace(/\//g, '_')}`)
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
        new Collapse($collapse).show()
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
