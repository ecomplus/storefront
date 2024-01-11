<% if (options.gmcMerchantId) {
  let lang = _.ecomUtils.$ecomConfig.get('lang')
  if (lang.indexOf('_') > -1) {
    const [idiom, country] = lang.split('_')
    lang = `${idiom}_${country.toUpperCase()}`
  }
  %>

  <div id="gmc-ratings-badge"><div></div></div>
  <script>
    window.renderGmcBadge = function () {
      var $ratingBadge = document.getElementById('gmc-ratings-badge').firstChild;
      window.gapi.load('ratingbadge', function () {
        window.gapi.ratingbadge.render(
          $ratingBadge, {
            merchant_id: <%- options.gmcMerchantId %>,
            position: "<%- (options.badgePosition || 'BOTTOM_LEFT') %>"
          });
      });
    }
    window.___gcfg = {
      lang: "<%- lang %>"
    };
    const appendScript = () => {
      const script = document.createElement('script');
      script.setAttribute('src','https://apis.google.com/js/platform.js?onload=renderGmcBadge');
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    if (location.pathname.startsWith('/app/')) {
      appendScript();
    } else {
      let isLoaded = false;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoaded) {
          isLoaded = true;
          appendScript();
        }
      }, {
        rootMargin: '150px 0px',
        threshold: 0,
      });
      observer.observe(document.getElementById('gmc-ratings-badge'));
    }
  </script>
<% } %>
