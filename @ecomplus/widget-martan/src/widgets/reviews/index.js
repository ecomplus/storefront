import Vue from 'vue'

import Reviews from './Reviews.vue'

export default (options = {}, elId = 'reviews_widget') => {
  const $el = document.getElementById(elId)
  if (!options || !$el || !$el.dataset || !$el.dataset.product) {
    return
  }

  const { product } = $el.dataset

  const storeId = parseInt(options.store_id, 10)
  const webId = options.web_id

  const config = {
    store_id: null,
    web_id: null,
    widget_key: null,
    widget_rating: null,
    widget_review: null,
    ...options
  }

  const init = () => {
    new Vue({
      render (h) {
        return h(Reviews, {
          props: {
            config,
            product,
            storeId,
            webId
          }
        })
      }
    }).$mount($el)
  }

  if (typeof window.IntersectionObserver === 'function') {
    const obs = new window.IntersectionObserver(
      (entries, observer) => {
        entries.forEach(function (entry) {
          const { isIntersecting, intersectionRatio } = entry
          if (isIntersecting === true || intersectionRatio > 0) {
            init()
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '250px'
      }
    )

    obs.observe($el)
  }
}
