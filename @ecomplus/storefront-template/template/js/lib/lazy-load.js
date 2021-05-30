import lozad from 'lozad'

const lazyLoad = className => {
  const observer = lozad('.' + className, {
    loaded ($el) {
      $el.classList.add('show')
    }
  })
  observer.observe()
  return observer
}
const observer = lazyLoad('lozad')

export { observer, lazyLoad }

window.addEventListener('load', () => {
  setTimeout(() => {
    lazyLoad('lozad-delay')
    const $preloadEls = document.querySelectorAll('.lozad[data-preload]')
    for (let i = 0; i < $preloadEls.length; i++) {
      const $el = $preloadEls[i]
      setTimeout(() => observer.triggerLoad($el), Number($el.dataset.preload) || i)
    }
  }, 2000)
})
