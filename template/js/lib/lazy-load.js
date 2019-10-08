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
