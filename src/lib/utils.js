export const callWithDelay = (fn, ms) => {
  let timer
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, ms)
    }
  }
}
