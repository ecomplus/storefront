import lozad from 'lozad'

const lazyLoad = className => {
  const observer = lozad('.' + className, {
    loaded ($el) {
      $el.classList.remove(className)
      setTimeout(() => $el.classList.add('show'), 400)
    }
  })
  observer.observe()
  return observer
}
const observer = lazyLoad('lozad')

export { observer, lazyLoad }
