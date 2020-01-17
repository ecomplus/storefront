export const delay = (fn, milliseconds) => {
  let timer
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, milliseconds)
    }
  }
}
