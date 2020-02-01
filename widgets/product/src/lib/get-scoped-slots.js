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
    const { dataset, outerHTML } = $childs[i]
    if (dataset && dataset.slot) {
      scopedSlots[dataset.slot] = function () {
        return h('span', {
          domProps: {
            innerHTML: outerHTML
          }
        })
      }
    }
  }

  return scopedSlots
}
