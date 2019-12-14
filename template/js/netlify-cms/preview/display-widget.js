export default (key, value, document) => {
  const $els = document.querySelectorAll(`[data-cms-bind="home.${key}"],[data-cms-if="home.${key}"]`)
  for (let i = 0; i < $els.length; i++) {
    const { cmsBind, cmsIf } = $els[i].dataset
    if (cmsIf) {
      if (value) {
        $els[i].style.display = 'block'
      } else {
        $els[i].style.display = 'none'
      }
    } else if (typeof value === 'string') {
      $els[i].innerHTML = value
    }
  }
  return document
}
