# Storefront Twbs

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-twbs.svg)](https://www.npmjs.org/@ecomplus/storefront-twbs) [![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

:nail_care: Foundation components for [E-Com Plus Storefront](https://github.com/ecomclub/storefront):

1. **[Boostrap 4.5](https://getbootstrap.com/docs/4.5/getting-started/introduction/)**:
    - [`scss/styles.scss`](https://github.com/ecomplus/storefront/tree/master/@ecomplus/storefront-twbs/scss/styles.scss): Majority part (_but not all_) of Bootstrap CSS is imported, with almost all components, some utility classes and custom additional [CSS vars](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/docs/05-vars.html);
    - [`src/bootstrap.js`](https://github.com/ecomplus/storefront/tree/master/@ecomplus/storefront-twbs/src/bootstrap.js): Bootstrap 4 scripts for respective components, using jQuery and Popper.js normally;

2. Some animations imported from **[Animate.css 3](https://daneden.github.io/animate.css/)**:
    - [`scss/_animate.scss`](https://github.com/ecomplus/storefront/tree/master/@ecomplus/storefront-twbs/scss/_animate.scss): Curated CSS animations list;
    - [`src/animate-css.js`](https://github.com/ecomplus/storefront/tree/master/@ecomplus/storefront-twbs/src/animate-css.js): Simple utility function to apply animations with JS;

3. Some webfont icons from **[Font Awesome 5](https://fontawesome.com/)**:
    - [`scss/_icons.scss`](https://github.com/ecomplus/storefront/tree/master/@ecomplus/storefront-twbs/scss/_icons.scss): Curated icons list;

> We're not importing those frameworks _as is_ to select only common and most useful components for Storefront themes. By this way we're reducing final bundle size and improving website **performance** :rocket:.

> We generally use (and recommend partners to) Vue.js for Storefront components and widgets, but remember that Bootstrap CSS, Font Awesome and Animate.css **are all reusable with any JS framework**.

## Installation

You can install the package with bundlers such as Webpack and Browserify, or load from CNDs like jsDelivr or UNPKG.

### With bundlers

```bash
npm i --save @ecomplus/storefront-twbs
```

```js
import '@ecomplus/storefront-twbs'
```

```scss
@import "node_modules/@ecomplus/storefront-twbs/scss/styles";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs/dist/storefront-twbs.min.css">
```

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs/dist/storefront-twbs.bundle.min.js"></script>
```

Or with no dependencies included:

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs/dist/storefront-twbs.min.js"></script>
```

## Usage

- [Bootstrap components](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/docs/01-components.html);
- [Colors guide](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/docs/02-colors.html);
- [Font Awesome icons](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/docs/03-icons.html);
- [CSS animations](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/docs/04-animations.html);
- [CSS vars](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/docs/05-vars.html);
- [Included JavaScript](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/docs/06-javascript.html);
- [Theming](https://developers.e-com.plus/storefront/@ecomplus/storefront-twbs/docs/07-theming.html);
