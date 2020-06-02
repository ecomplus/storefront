export default fn => {
  if (typeof window === 'object' && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(fn)
  } else {
    setTimeout(fn, 500)
  }
}
