import Vue from 'vue'
import Snippets from './Snippets.vue'

export default (options = {}, elId = 'snippet_widget') => {
  const $el = document.getElementById(elId)

  if (!options || !$el || !$el.dataset || !$el.dataset.sku) {
    return
  }

  const { sku } = $el.dataset

  const storeId = options.store_id
  const webId = options.web_id
  const widgetOptions = options.widget_snippet || {}

  const starColor = widgetOptions.star_color || null
  const border = widgetOptions.border || false
  const backgroundColor = widgetOptions.background_color || null
  const textColor = widgetOptions.text_color || null
  const borderColor = widgetOptions.border_color || null

  const obs = new IntersectionObserver((_, observe) => {
    new Vue({
      render(h) {
        return h(Snippets, {
          props: {
            product: sku,
            storeId,
            webId,
            starColor,
            border,
            borderColor,
            backgroundColor,
            textColor
          }
        })
      }
    }).$mount($el)

    observe.disconnect()
  })

  obs.observe($el)
}
