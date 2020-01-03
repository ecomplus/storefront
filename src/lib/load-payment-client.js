/* eslint-disable no-eval */

const startedScriptsRefs = []

export default (jsClient, skipOnloadExpression) => {
  const src = jsClient.script_uri
  let scriptRef = startedScriptsRefs.find(scriptRef => scriptRef.src === src)

  let $script
  if (scriptRef) {
    $script = scriptRef.$script
  } else {
    $script = document.createElement('script')
    $script.async = true
    $script.defer = true
    scriptRef = { src, $script }
    startedScriptsRefs.push(scriptRef)

    setTimeout(() => {
      $script.setAttribute('src', src)
      document.head.appendChild($script)
    }, Math.random() * (200 - 50) + 50)
  }

  return new Promise(resolve => {
    $script.onload = () => {
      scriptRef.isLoaded = true
      let expression = jsClient.onload_expression

      const runExpression = checkoutData => {
        window._checkout = checkoutData
        Object.assign(window.storefrontApp, window._checkout)
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

    if (scriptRef.isLoaded) {
      $script.onload()
    }
  })
}
