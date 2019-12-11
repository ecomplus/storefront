export default (options = {}) => {
  const { gtmContainerId, dataLayerVar } = options

  ;(function (w, d) {
    w[d] = []
    if (w.storefront && w.storefront.context) {
      var context = w.storefront.context
      if (context) {
        var data = {
          storefront: true
        }
        for (var field in context) {
          if (typeof context[field] === 'string') {
            data[field] = context[field]
          }
        }
        if (context && context.body) {
          data.resourceId = context.body._id
        }
        w[d].push(data)
      }
    }
  }(window, dataLayerVar))

  const $scripts = document.getElementsByTagName('script')
  const $lastScript = $scripts[$scripts.length - 1]
  if ($lastScript) {
    const $gtmScript = document.createElement('script')
    $gtmScript.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','${dataLayerVar}','${gtmContainerId}');`
    $lastScript.parentNode.insertBefore($gtmScript, $lastScript.nextSibling)
  }
}
