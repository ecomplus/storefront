/* eslint-disable no-eval */

export default (jsClient, skipOnloadExpression) => {
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  const loadPromise = new Promise(resolve => {
    script.onload = () => {
      let expression = jsClient.onload_expression
      const runExpression = (checkoutData) => {
        window._checkout = checkoutData
        if (expression) {
          try {
            eval(expression)
          } catch (err) {
            console.error(err, expression)
          }
          if (!jsClient.container_html) {
            expression = null
          }
        }
      }
      if (!skipOnloadExpression) {
        runExpression()
        resolve()
      } else {
        resolve(runExpression)
      }
    }
  })
  script.setAttribute('src', jsClient.script_uri)
  document.head.appendChild(script)
  return loadPromise
}
