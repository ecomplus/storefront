/* eslint-disable no-eval */

export default jsClient => {
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  const loadPromise = new Promise(resolve => {
    script.onload = () => {
      const expression = jsClient.onload_expression
      if (expression) {
        try {
          eval(expression)
        } catch (err) {
          console.error(err, expression)
        }
      }
      resolve()
    }
  })
  script.setAttribute('src', jsClient.script_uri)
  document.head.appendChild(script)
  return loadPromise
}
