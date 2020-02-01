const md = new window.MarkdownIt({ html: true })

export default (page, key, value, document) => {
  const $els = document.querySelectorAll(`[data-cms-bind="${page}.${key}"],[data-cms-if="${page}.${key}"]`)
  for (let i = 0; i < $els.length; i++) {
    const { cmsMd, cmsIf } = $els[i].dataset

    if (cmsIf) {
      if (value) {
        $els[i].style.display = 'block'
      } else {
        $els[i].style.display = 'none'
      }
    } else if (typeof value === 'string') {
      if (cmsMd) {
        $els[i].innerHTML = md.render(value)
      } else {
        $els[i].innerHTML = value
      }
    }
  }
  return document
}
