import Vue from 'vue'
import Reviews from './Reviews.vue'

export default (options = {}, elId = 'reviews_widget') => {
  const $el = document.getElementById(elId)
  if (!options || !$el || !$el.dataset || !$el.dataset.product) {
    return
  }

  const { product } = $el.dataset

  const storeId = options.store_id
  const webId = options.web_id
  const widgetOptions = options.widget_review || {}

  const starColor = widgetOptions.star_color || null
  const title = widgetOptions.title || null
  const headerLayout = widgetOptions.header_layout || null
  const reviewsLayout = widgetOptions.reviews_layout || null

  const obs = new IntersectionObserver(
    (entries, observe) => {
      entries.forEach(function (entry) {
        const { isIntersecting, intersectionRatio } = entry
        if (isIntersecting === true || intersectionRatio > 0) {
          new Vue({
            render(h) {
              return h(Reviews, {
                props: {
                  product,
                  storeId,
                  webId,
                  title,
                  starColor,
                  headerLayout,
                  reviewsLayout
                }
              })
            }
          }).$mount($el)

          observe.disconnect()
        }
      })
    },
    {
      rootMargin: '250px'
    }
  )

  obs.observe($el)
}
