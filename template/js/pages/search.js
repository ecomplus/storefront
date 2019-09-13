import $ from './lib/$'

const $searchBar = $('#search-bar')

if ($searchBar) {
  const { classList } = $searchBar
  $searchBar.addEventListener('shown.bs.collapse', () => {
    $('#search-input').focus()
  })

  let resizeState
  const onResize = () => {
    const lgDevice = document.body.offsetWidth >= 992
    if (resizeState !== lgDevice) {
      if (lgDevice) {
        classList.add('d-none', 'show')
      } else {
        classList.remove('show', 'd-none')
        $('#mobile-search-btn').setAttribute('aria-expanded', 'false')
      }
      resizeState = lgDevice
    }
  }

  window.addEventListener('resize', onResize)
  onResize()
}
