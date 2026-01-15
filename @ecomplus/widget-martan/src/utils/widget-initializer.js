import Vue from 'vue'

/**
 * Inicializa um widget Vue com IntersectionObserver
 * @param {Object} options - Opções de configuração
 * @param {string} elId - ID do elemento HTML
 * @param {Object} Component - Componente Vue a ser renderizado
 * @param {Object} defaultConfig - Configuração padrão do widget
 */
export default (options = {}, elId, Component, defaultConfig = {}) => {
  const $el = document.getElementById(elId)
  if (!options || !$el || !$el.dataset || !$el.dataset.product) {
    return
  }

  const { product } = $el.dataset

  const config = {
    store_id: null,
    web_id: null,
    widget_key: null,
    widget_rating: null,
    widget_review: null,
    widget_questions: null,
    ...defaultConfig,
    ...options
  }

  const init = () => {
    new Vue({
      render (h) {
        return h(Component, {
          props: {
            config,
            product
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
