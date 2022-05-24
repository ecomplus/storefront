export default ($el, h, canSetDefault = true) => {
  const scopedSlots = {}
  if (canSetDefault) {
    scopedSlots.default = function () {
      return h('div', {
        domProps: {
          innerHTML: $el.outerHTML
        }
      })
    }
  }

  $el.querySelectorAll('[data-slot]').forEach(function ($dataSlot) {
    const innerHTML = $dataSlot.innerHTML
    scopedSlots[$dataSlot.dataset.slot] = function () {
      return h('span', {
        domProps: { innerHTML }
      })
    }
  })

  return scopedSlots
}
