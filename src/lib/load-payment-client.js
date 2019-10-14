/* eslint-disable no-eval */

export default jsClient => {
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  const loadPromise = new Promise(resolve => {
    script.onload = () => {
      resolve()
      const expression = jsClient.onload_expression
      if (expression) {
        try {
          eval(expression)
        } catch (err) {
          console.error(err, expression)
        }
      }
    }
  })
  script.setAttribute('src', jsClient.script_uri)
  document.head.appendChild(script)
  return loadPromise
}
