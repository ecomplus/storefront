# Storefront Twbs

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-twbs/latest.svg)](https://www.npmjs.org/@ecomplus/storefront-twbs) [![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

:nail_care: Foundation components for
[E-Com Plus Storefront](https://github.com/ecomclub/storefront):

1. **[Boostrap 4.4](https://getbootstrap.com/docs/4.4/getting-started/introduction/)**:
    - [`scss/styles.scss`](scss/styles.scss): Majority part (_but not all_) of Bootstrap CSS is imported, with almost all components, some utility classes and custom additional [CSS vars](#css-vars);
    - [`src/bootstrap.js`](src/bootstrap.js): Bootstrap 4 scripts for respective components, using jQuery and Popper.js normally;

2. Some animations imported from **[Animate.css](https://daneden.github.io/animate.css/)**:
    - [`scss/_animate.scss`](scss/_animate.scss): Curated CSS animations list;
    - [`src/animate-css.js`](src/animate-css.js): Simple utility function to apply animations with JS;

3. Some SVG icons imported from **[Font Awesome 5](https://fontawesome.com/)**:
    - [`src/fontawesome-icons.js`](src/fontawesome-icons.js): Curated SVG icons list;

> We're not importing those frameworks _as is_ to select only common and most useful components for Storefront themes. By this way we're reducing final bundle size and improving website **performance** :rocket:.

> We generally use (and recommend partners to) Vue.js for Storefront components and widgets, but remember that Bootstrap CSS, Font Awesome SVG and Animate.css **are all reusable with any JS framework**.

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

## Styles

We're including almost all Bootstrap 4.4 styles and components, just a few components aren't included by default as you can see at [`scss/styles.scss`](scss/styles.scss).

### Theming

You may use Sass to create a custom theme, you just have to import your own variables before `@ecomplus/storefront-twbs/scss/styles`:

```scss
@import "variables";
@import "node_modules/@ecomplus/storefront-twbs/scss/styles";
```

Take a look on [Bootstrap 4 variables](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss) to see available Sass variables.

### Guide

All E-Com Plus stores should include _Storefront Twbs_ to improve compatibility between brand colors,
store template and third party widgets, keeping as possible a consistent visual identity.

**To create a new template**, you _SHOULD_ use as possible the default Bootstrap components, and/or adapt them to mirror your theme visual identity.

**To create a new widget**, you _MUST_ use Bootstrap components the maximum as possible, to follow the theme and store brand visual identity, you should also use CSS vars and utilities.

#### Brand colors

The merchant would set the `$primary` and `$secondary` colors following the store brand.

##### Primary

Should be used to drive attention to the main tasks that should be done while using the app. It is meant to be used in major interactive elements of the page.

Use examples:

- Links;
- Call to actions;
- Obligatory forms;
- Check boxes;
- Radio buttons;
- Toggles;

##### Secondary

Should be used to drive attention in the elements with relevant info, but where the user is not intended to take action.

Use examples:

- Secondary buttons;
- Badges;
- Sales tags;
- Hotmarks;


### CSS vars

We're replacing default Bootstrap CSS utilities approach with [CSS vars](https://developer.mozilla.org/docs/Web/CSS/var) approach, it provides a lighter and more flexible theme.

Beyond the default ones, more CSS vars are set on `:root` (brands colors, borders, text, spacing...) to be used by Storefront components and widgets, as example:

```css
:root {
  --body-bg: #fff;
  --body-color: #212529;
  --blue: #007bff;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #28a745;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #e83e8c;
  --primary-yiq: #fff;
  --primary-rgb: 232,62,140;
  --secondary: #333;
  --secondary-yiq: #fff;
  --secondary-rgb: 51,51,51;
  --success: #28a745;
  --success-yiq: #fff;
  --success-rgb: 40,167,69;
  --info: #17a2b8;
  --info-yiq: #fff;
  --info-rgb: 23,162,184;
  --warning: #ffc107;
  --warning-yiq: #212529;
  --warning-rgb: 255,193,7;
  --danger: #dc3545;
  --danger-yiq: #fff;
  --danger-rgb: 220,53,69;
  --light: #f8f9fa;
  --light-yiq: #212529;
  --light-rgb: 248,249,250;
  --dark: #343a40;
  --dark-yiq: #fff;
  --dark-rgb: 52,58,64;
  --primary-lightest: #fad4e6;
  --primary-lightest-yiq: #212529;
  --primary-lightest-rgb: 249.92083,212.37917,229.60417;
  --primary-lighter: #f39ec5;
  --primary-lighter-yiq: #212529;
  --primary-lighter-rgb: 243.40417,157.69583,197.02083;
  --primary-light: #ed6ca7;
  --primary-light-yiq: #212529;
  --primary-light-rgb: 237.43056,107.56944,167.15278;
  --secondary-lightest: #878787;
  --secondary-lightest-yiq: #fff;
  --secondary-lightest-rgb: 135.15,135.15,135.15;
  --secondary-lighter: #696969;
  --secondary-lighter-yiq: #fff;
  --secondary-lighter-rgb: 104.55,104.55,104.55;
  --secondary-light: #4d4d4d;
  --secondary-light-yiq: #fff;
  --secondary-light-rgb: 76.5,76.5,76.5;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --border-width: 1px;
  --border-color: #dee2e6;
  --border-radius-sm: 0.2rem;
  --border-radius: 0.25rem;
  --border-radius-lg: 0.3rem;
  --rounded-pill: 50rem;
  --box-shadow-sm: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
  --box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  --box-shadow-lg: 0 1rem 3rem rgba(0,0,0,0.175);
  --spacer-1: 0.25rem;
  --spacer-2: 0.5rem;
  --spacer-3: 1rem;
  --spacer-4: 1.5rem;
  --spacer-5: 3rem;
  --text-muted: #6c757d;
  --font-light: 300;
  --font-normal: 400;
  --font-bold: 700;
  --line-height: 1.5;
  --line-height-lg: 1.5;
  --line-height-sm: 1.2;
  --font-size: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-sm: 0.875rem;
  --h1: 2.5rem;
  --h2: 2rem;
  --h3: 1.75rem;
  --h4: 1.5rem;
  --h5: 1.25rem;
  --h6: 1rem;
  --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
}
```

## JavaScript

Some Bootstrap 4 JS plugins are included at [`src/bootstrap.js`](src/bootstrap.js). It requires jQuery 3 (slim) and Popper.js 1, both included to Storefront Twbs bundle script.

### Font Awesome

Some [Font Awesome](https://fontawesome.com/) SVG icons are also included to the bundle, together with Font Awesome SVG `dom`.

You can use FA icons by just adding respective CSS classes, eg.:

```html
<i class="fas fa-shopping-bag"></i>
```

See available icons at [`src/fontawesome-icons.js`](src/fontawesome-icons.js).
