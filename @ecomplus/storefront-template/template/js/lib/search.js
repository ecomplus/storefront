import { isScreenLg } from './_env'
import $ from 'jquery'

const $searchBar = $('#search-bar')

if ($searchBar) {
  $searchBar.on('shown.bs.collapse', () => {
    $('#search-input').trigger('focus')
  })

  let resizeState
  const onResize = () => {
    if (resizeState !== isScreenLg) {
      if (isScreenLg) {
        $searchBar.addClass('d-none')
        $searchBar.collapse('show')
      } else {
        $searchBar.collapse('hide')
        $searchBar.removeClass('d-none')
      }
      resizeState = isScreenLg
    }
  }

  window.addEventListener('resize', onResize)
  onResize()
}
