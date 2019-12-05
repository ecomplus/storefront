import $ from './$'
import $overlay from './$overlay'
import * as Slideout from 'slideout'

const slideout = new Slideout({
  panel: $('#main'),
  menu: $('#menu'),
  padding: 300,
  tolerance: 70
})

if (slideout) {
  const $fixedNav = $('[data-slideout-fixed]')

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
}
