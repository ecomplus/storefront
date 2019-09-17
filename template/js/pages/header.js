import $ from './lib/$'

const $header = $('#header')
if ($header) {
  let $headerPadding
  window.navFixed = false
  let headerOffsetHeight = 0
  let headerOffset = 0
  let lastScrollPosition = 0

  let updateNavTimer
  const updateNavbar = fixHeader => {
    if (window.navFixed !== fixHeader) {
      clearTimeout(updateNavTimer)
      const headerClass = 'header--fixed'

      if (fixHeader) {
        updateNavTimer = setTimeout(() => {
          $header.style.transform = 'none'
          $header.style.opacity = 1
        }, 150)

        $header.classList.add(headerClass)
        $headerPadding.style.height = headerOffsetHeight + 'px'
      } else {
        updateNavTimer = setTimeout(() => {
          $header.removeAttribute('style')
        }, 250)

        $header.style.transform = 'translateY(-25%)'
        $header.classList.remove(headerClass)
        $headerPadding.style.height = 0
      }

      window.navFixed = fixHeader
    }
  }

  const onResize = () => {
    const { offsetTop, offsetHeight } = $header
    headerOffsetHeight = offsetHeight
    headerOffset = offsetTop + offsetHeight
  }

  const onScroll = () => {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    if (currentScrollPosition < 0) {
      return
    }
    const scrollingUp = lastScrollPosition > currentScrollPosition
    lastScrollPosition = currentScrollPosition

    let offset = headerOffset
    offset *= scrollingUp ? 1.2 : 0.8
    const fixHeader = offset < currentScrollPosition
    updateNavbar(fixHeader)
  }

  setTimeout(() => {
    window.addEventListener('resize', onResize)
    updateNavbar(false)
    onResize()

    $headerPadding = document.createElement('div')
    $headerPadding.className = 'header-float-fix'
    $headerPadding.style.height = 0
    $header.parentElement.insertBefore($headerPadding, $header)

    let onScrollTimer
    window.addEventListener('scroll', () => {
      clearTimeout(onScrollTimer)
      onScrollTimer = setTimeout(onScroll, 50)
    })
  }, 500)
}
