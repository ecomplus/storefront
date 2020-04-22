import { $ } from '@ecomplus/storefront-twbs'

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

  $($el).find('[data-slot]').each(function () {
    const innerHTML = $(this).html()
    scopedSlots[$(this).data('slot')] = function () {
      return h('span', {
        domProps: { innerHTML }
      })
    }
  })

  return scopedSlots
}
