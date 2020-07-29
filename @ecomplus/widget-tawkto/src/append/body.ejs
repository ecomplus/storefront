<script>
  // Start of Tawk.to Script
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/<%- options.tawktoPropertyId %>/<%- options.tawktoChatWidget || "default" %>';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();
  // End of Tawk.to Script

  (function () {
    var customer;
    if (ecomPassport.checkLogin()) {
      customer = ecomPassport.getCustomer();
      Tawk_API.visitor = {
        name: ecomPassport.getCustomerName(),
        email: customer.main_email
      };
    }

    Tawk_API.onLoad = function () {
      var tawkAttrs = {};
      var addTawkAttrs = function (prefix, obj) {
        if (obj) {
          for (var field in obj) {
            if (obj[field] && field.substr(0, 4) !== 'body') {
              switch (typeof obj[field]) {
                case 'string':
                case 'number':
                  tawkAttrs[prefix + '-' + field.replace(/[^a-z0-9]/ig, '-')] = obj[field].toString();
                  break;
              }
            }
          }
        }
      };
      addTawkAttrs('customer', customer);
      addTawkAttrs('context', storefront.context);
      addTawkAttrs('cart', ecomCart.data);
      Tawk_API.setAttributes(tawkAttrs, function (error) {
        if (typeof error !== 'undefined') {
          var err = new Error('tawk.to: ' + error);
          err.attributes = tawkAttrs;
          console.error(err);
        }
      });
    };
  }());
</script>
