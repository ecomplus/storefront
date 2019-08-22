import $ from './lib/$'

const $searchBar = $('#search-bar')

if ($searchBar) {
  const { classList } = $searchBar
  $searchBar.addEventListener('shown.bs.collapse', () => {
    $('#search-input').focus()
  })

  const onResize = () => {
    const lgDevice = window.screen.width >= 992
    if (lgDevice) {
      classList.add('d-none', 'show')
    } else {
      classList.remove('show', 'd-none')
      $('#mobile-search-btn').setAttribute('aria-expanded', 'false')
    }
  }

  window.addEventListener('resize', onResize)
  onResize()
}
