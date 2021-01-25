# Storefront App

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-app.svg)](https://www.npmjs.org/@ecomplus/storefront-app) [![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Vue 2 SPA with cart, checkout and account pages for [E-Com Plus Storefront](https://developers.e-com.plus/storefront/):

- Integrated with [`EcomCart`](https://developers.e-com.plus/shopping-cart/EcomCart.html) and [`EcomPassport`](https://developers.e-com.plus/passport-client/EcomPassport.html);
- Ready for [E-Com Plus REST APIs](https://developers.e-com.plus/docs/reference/);
- [Internationalization support](https://github.com/ecomplus/i18n);
- A11Y compliance;
- Built with Vue CLI 4;

[CHANGELOG](https://developers.e-com.plus/storefront/@ecomplus/storefront-app/CHANGELOG)

## Installation

You can install the package and import raw source when using bundlers such as Webpack and Browserify, or load compiled from CNDs like jsDelivr or UNPKG.

It requires and doesn't include [`@ecomplus/utils`](https://developers.e-com.plus/utils/) (peer dependency), it should be used to declare store settings before starting the checkout SPA, check the following examples and edit `$ecomConfig.set` with your store values.

Component styles will be loaded on demand, but [_Storefront Twbs_](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/) styles should be previously imported for base UI.

### With bundlers

```bash
npm i --save @ecomplus/utils @ecomplus/storefront-app
```

```js
// config.js
import { $ecomConfig } from '@ecomplus/utils'
$ecomConfig.set('store_id', 1011)
$ecomConfig.set('lang', 'pt_br')
$ecomConfig.set('currency', 'BRL')
$ecomConfig.set('country_code', 'BR')
```

```js
// checkout.js
import './config.js'
import '@ecomplus/storefront-app/src/main'
```

```scss
@import "node_modules/@ecomplus/storefront-twbs/scss/styles";
```

### CDN

Add the scripts below right before `</body>` on your cart/checkout page:

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/utils@1/dist/ecom-utils.polyfill.min.js"></script>
<script>
  $ecomConfig.set('store_id', 1011);
  $ecomConfig.set('lang', 'pt_br');
  $ecomConfig.set('currency', 'BRL');
  $ecomConfig.set('country_code', 'BR');
</script>
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app@latest/dist/lib/js/app.js"></script>
```

And base UI styles before `</head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs@5/dist/storefront-twbs.min.css">
```

## Usage

You just need to have a `#storefront-app` element on your HTML:

```html
<body>
  <main>
    <div id="storefront-app"></div>
  </main>
  <!-- scripts -->
</body>
```

[Sample JSFiddle](https://jsfiddle.net/gtjeb7Lr/)

We recommend running the SPA at the `/app/` route (eg.: `/app/index.html`).

### Manipulating cart items

Please refer to [`EcomCart`](https://developers.e-com.plus/shopping-cart/EcomCart.html) docs.

Note that you can import `@ecomplus/shopping-cart` on other ecommerce pages to add items before redirecting user to cart:

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/shopping-cart@2/dist/ecom-cart.bundle.min.js"></script>
<script>
$('#buy-button').click(function () {
  // add item to cart
  ecomCart.addItem({
    _id: '12300000000000000000000f',
    product_id: '123a5432109876543210cdef',
    sku: 's-MP_2B4',
    name: 'Mens Pique Polo Shirt',
    quantity: 4,
    price: 42.9,
    keep_item_price: false
  });
  // redirect to checkout
  window.location.href = '/app/';
})
</script>
```

### Manipulating customer account

Please refer to [`EcomPassport`](https://developers.e-com.plus/passport-client/EcomPassport.html) docs.
