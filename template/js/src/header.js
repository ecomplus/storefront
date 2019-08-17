import $ from './$'

const $header = $('#header')
let $headerPadding

const setupStickyHeader = window.screen.width >= 576
window.navFixed = false
let headerOffsetHeight = 0
let headerOffset = 0
let lastScrollPosition = 0

const updateNavbar = fixHeader => {
  $header.classList[fixHeader ? 'add' : 'remove']('header-fixed')
  window.navFixed = fixHeader
}

const onResize = () => {
  updateNavbar(false)
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

  if (fixHeader) {
    if (!window.navFixed) {
      $headerPadding.style.height = headerOffsetHeight + 'px'
    }
  } else if (window.navFixed) {
    $headerPadding.style.height = 0
  }
  updateNavbar(fixHeader)
}

if (setupStickyHeader) {
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll)
  onResize()

  $headerPadding = document.createElement('div')
  $headerPadding.className = 'header-float-fix'
  $headerPadding.style.height = 0
  $header.parentElement.insertBefore($headerPadding, $header)
}
