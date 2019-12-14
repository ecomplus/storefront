// creates DOM document object for preview
export default html => {
  const parser = new DOMParser()
  const vDocument = parser.parseFromString(html, 'text/html')

  // find script tags with hidden components
  const $dataCmsHtml = vDocument.querySelectorAll('[data-cms-html]')

  // replace script tag with your inner content
  if ($dataCmsHtml.length) {
    for (let i = 0; i < $dataCmsHtml.length; i++) {
      const element = $dataCmsHtml[i]
      const content = element.text
      const childs = element.parentNode.childNodes
      for (let j = 0; j < childs.length; j++) {
        const child = childs[j]
        if (child.nodeName === 'SCRIPT') {
          const el = document.createElement('div')
          el.innerHTML = content
          element.parentNode.replaceChild(el, child)
        }
      }
    }
  }

  return vDocument
}
