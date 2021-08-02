export default ($el, top = 0) => {
  while ($el.offsetParent) {
    top += $el.offsetTop
    $el = $el.offsetParent
  }
  return window.scroll({
    top,
    behavior: 'smooth'
  })
}
