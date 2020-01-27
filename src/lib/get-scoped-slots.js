export default ($el, h) => {
  const scopedSlots = {
    default () {
      return h('div', {
        domProps: {
          innerHTML: $el.outerHTML
        }
      })
    }
  }

  const $childs = $el.childNodes
  for (let i = 0; i < $childs.length; i++) {
    const { slot } = $childs[i].dataset
    if (slot) {
      scopedSlots[slot] = function () {
        return h('span', {
          domProps: {
            innerHTML: $childs[i].outerHTML
          }
        })
      }
    }
  }

  return scopedSlots
}
