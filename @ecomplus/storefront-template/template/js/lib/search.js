import { isScreenLg, Collapse } from '@ecomplus/storefront-twbs'

const $searchBar = document.getElementById('search-bar')

if ($searchBar) {
  $searchBar.addEventListener('shown.bs.collapse', () => {
    const focusEvent = new Event('focus')
    document.getElementById('search-input').dispatchEvent(focusEvent)
  })

  let resizeState
  const onResize = () => {
    if (resizeState !== isScreenLg) {
      if (isScreenLg) {
        $searchBar.classList.add('d-none')
        new Collapse($searchBar).show()
      } else {
        new Collapse($searchBar).hide()
        $searchBar.classList.remove('d-none')
      }
      resizeState = isScreenLg
    }
  }

  window.addEventListener('resize', onResize)
  onResize()
}
