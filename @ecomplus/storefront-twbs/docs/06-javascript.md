# Included JavaScript

Some Bootstrap 4 JS plugins are included at [`src/bootstrap.js`](https://github.com/ecomplus/storefront/tree/master/@ecomplus/storefront-twbs/src/bootstrap.js). It requires jQuery 3 (slim) and Popper.js 1, both included to Storefront Twbs bundle script.

## jQuery

jQuery will be available globally as `window.$`. For example, you can setup [tooltips](https://getbootstrap.com/docs/4.6/components/tooltips/) with jQuery following Bootstrap documentation:

```js
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
```

## Animate.css util

Storefront Twbs provides a JS helper to work with [CSS animations](./04-animations.md), it's available globally as `window.animateCss`. Example usage with shopping cart:

```js
animateCss($cartCount, 'fadeOut').then(() => {
  $cartCount.innerText = ecomCart.data.items.length
  animateCss($cartCount, 'fadeIn')
})
```

## ES imports

When using ES, jQuery, `animateCss` and some env constants may be imported from `@ecomplus/storefront-twbs`:

```js
import {
  isSafari,
  isIOS,
  isIE,
  sMobile,
  isScreenXs,
  isScreenLg,
  $,
  animateCss
} from '@ecomplus/storefront-twbs'
```
