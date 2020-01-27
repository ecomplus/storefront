export default (options = {}) => {
  const { fbqContainerId } = options

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
  }(window))

  const $scripts = document.getElementsByTagName('script')
  const $lastScript = $scripts[$scripts.length - 1]
  if ($lastScript) {
    const $gtmScript = document.createElement('script')
    $gtmScript.text = `(function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${fbqContainerId}');
                        fbq('track', 'PageView'));`
    $lastScript.parentNode.insertBefore($gtmScript, $lastScript.nextSibling)
  }
}
