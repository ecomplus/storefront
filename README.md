# storefront-twbs

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-twbs.svg)](https://www.npmjs.org/@ecomplus/storefront-twbs)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Boostrap 4.3](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
and [BootstrapVue](https://bootstrap-vue.js.org/docs/components/)
wrapper for E-Com Plus storefront.

## Installation

You can install the package with bundlers such as Webpack and Browserify,
or install from CNDs like jsDelivr or UNPKG.

### With bundlers

```bash
npm i --save @ecomplus/storefront-twbs
```

```js
// Load some BootstrapVue components on global Vue instance
import '@ecomplus/storefront-twbs'
```

```scss
// Bootstrap 4 styles
@import "../node_modules/@ecomplus/storefront-twbs/scss/styles";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs/dist/storefront-twbs.min.css">
```

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs/dist/storefront-twbs.min.js"></script>
```

## Styleguide

All E-Com Plus stores should include
Bootstrap 4.3 theme to improve compatibility between brand colors,
store template and third party widgets,
keeping as possible a consistent visual identity.

**To create a new template**, you _SHOULD_ use as possible the
default Bootstrap components, and/or adapt them to mirror your theme visual identity.

**To create a new widget**, you _MUST_ use Bootstrap components the maximum as possible,
to follow the theme and store brand visual identity,
you should also use utilities and CSS vars.

### Brand colors

The merchant would set the primary and secondary colors following the store brand.

#### Primary

Should be used to drive attention to the main tasks
that should be done while using the app.
It is meant to be used in major interactive elements of the page.

Use examples:

- Links;
- Call to actions;
- Obligatory forms;
- Check boxes;
- Radio buttons;
- Toggles;

#### Secondary

Should be used to drive attention in the elements with relevant info,
but where the user is not intended to take action.

Use examples:

- Secondary buttons;
- Badges;
- Sales tags;
- Hotmarks;
