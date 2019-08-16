# storefront-twbs

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-twbs.svg)](https://www.npmjs.org/@ecomplus/storefront-twbs)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Boostrap 4.3](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
and [BootstrapVue](https://bootstrap-vue.js.org/docs/components/)
wrapper for E-Com Plus storefront.

## Installation

You can install the package with bundlers such as Webpack and Browserify,
or load from CNDs like jsDelivr or UNPKG.

### With bundlers

```bash
npm i --save @ecomplus/storefront-twbs
```

```js
// Load collapse, dropdown and tooltip Bootstrap native components
// Add some BootstrapVue components on global Vue instance
import '@ecomplus/storefront-twbs'
```

```scss
// Bootstrap 4 styles
@import "node_modules/@ecomplus/storefront-twbs/scss/styles";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs/dist/storefront-twbs.min.css">
```

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs/dist/storefront-twbs.min.js"></script>
```

## Styles

We're including almost all Bootstrap 4.3 styles and components,
just a few components aren't included by default as you can see at
[`scss/styles.scss`](https://github.com/ecomclub/storefront-twbs/blob/master/scss/styles.scss).

### Theming

You should use Sass to create a custom theme,
you just have to import your own variables before
`@ecomplus/storefront-twbs/scss/styles`:

```scss
@import "variables";
@import "node_modules/@ecomplus/storefront-twbs/scss/styles";
```

Take a look on
[Bootstrap 4 variables](https://github.com/twbs/bootstrap/blob/master/scss/_variables.scss)
to see available Sass variables.

### Guide

All E-Com Plus stores should include
Bootstrap 4.3 theme to improve compatibility between brand colors,
store template and third party widgets,
keeping as possible a consistent visual identity.

**To create a new template**, you _SHOULD_ use as possible the
default Bootstrap components, and/or adapt them to mirror your theme visual identity.

**To create a new widget**, you _MUST_ use Bootstrap components the maximum as possible,
to follow the theme and store brand visual identity,
you should also use utilities and CSS vars.

#### Brand colors

The merchant would set the `$primary` and `$secondary` colors following the store brand.

##### Primary

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

##### Secondary

Should be used to drive attention in the elements with relevant info,
but where the user is not intended to take action.

Use examples:

- Secondary buttons;
- Badges;
- Sales tags;
- Hotmarks;


### CSS vars

We're also adding more CSS vars on `:root`, specially for brands colors,
to be used by storefront widgets, as example (default):

```css
:root {
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
    --primary: #ff015b;
    --primary-yiq: #fff;
    --secondary: #6c757d;
    --secondary-yiq: #fff;
    --success: #28a745;
    --success-yiq: #fff;
    --info: #17a2b8;
    --info-yiq: #fff;
    --warning: #ffc107;
    --warning-yiq: #212529;
    --danger: #dc3545;
    --danger-yiq: #fff;
    --light: #f8f9fa;
    --light-yiq: #212529;
    --dark: #343a40;
    --dark-yiq: #fff;
    --primary-lightest: #ffa9c8;
    --primary-lightest-yiq: #212529;
    --primary-lighter: #ff6ca0;
    --primary-lighter-yiq: #212529;
    --primary-light: #ff347c;
    --primary-light-yiq: #fff;
    --primary-dark: #cd0049;
    --primary-dark-yiq: #fff;
    --primary-darker: #950035;
    --primary-darker-yiq: #fff;
    --primary-darkest: #58001f;
    --primary-darkest-yiq: #fff;
    --secondary-lightest: #c5c9cd;
    --secondary-lightest-yiq: #212529;
    --secondary-lighter: #a4aab0;
    --secondary-lighter-yiq: #212529;
    --secondary-light: #868e96;
    --secondary-light-yiq: #fff;
    --secondary-dark: #545b62;
    --secondary-dark-yiq: #fff;
    --secondary-darker: #3a3f44;
    --secondary-darker-yiq: #fff;
    --secondary-darkest: #1e2023;
    --secondary-darkest-yiq: #fff;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
}
```

## JavaScript

The package includes
[collapse](https://getbootstrap.com/docs/4.3/components/collapse/),
[dropdowns](https://getbootstrap.com/docs/4.3/components/dropdowns/) and
[tooltips](https://getbootstrap.com/docs/4.3/components/tooltips/)
scripts from [`bootstrap.native`](https://github.com/thednp/bootstrap.native).

Also some
[BootstrapVue](https://bootstrap-vue.js.org/docs/components/)
components and directives
added directly to global Vue instance,
you can see the available components at
[`src/index.js`](https://github.com/ecomclub/storefront-twbs/blob/master/src/index.js).

**It requires and does not include [Vue.js](https://vuejs.org/)**.
jQuery is _not_ required.
