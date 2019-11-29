# storefront-twbs

[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/storefront-twbs/badge)](https://www.codefactor.io/repository/github/ecomclub/storefront-twbs)
[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-twbs.svg)](https://www.npmjs.org/@ecomplus/storefront-twbs)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

:nail_care: Foundation components for
[E-Com Plus Storefront](https://github.com/ecomclub/storefront):

1. **[Boostrap 4.4](https://getbootstrap.com/docs/4.4/getting-started/introduction/)**
with [BootstrapVue](https://bootstrap-vue.js.org/docs/components/) and
[BootstrapNative](https://github.com/thednp/bootstrap.native) (_no_ jQuery):
    - [`scss/styles.scss`](https://github.com/ecomclub/storefront-twbs/blob/master/scss/styles.scss):
    Almost all (_but not all_) Bootstrap CSS is imported;
    - [`src/index.js`](https://github.com/ecomclub/storefront-twbs/blob/master/src/index.js):
    Only some components are imported from BootstrapVue/BootstrapNative,
    you should use only normal Bootstrap CSS classes when no JS is
    required for the component;

2. Some animations imported from
**[Animate.css](https://daneden.github.io/animate.css/)**:
    - [`scss/_animate.scss`](https://github.com/ecomclub/storefront-twbs/blob/master/scss/_animate.scss):
    Curated CSS animations list;

3. Some SVG icons imported from
**[Font Awesome 5](https://fontawesome.com/)**:
    - [`src/fontawesome-icons.js`](https://github.com/ecomclub/storefront-twbs/blob/master/src/fontawesome-icons.js):
    Curated SVG icons list;

> We're not importing those frameworks _as is_ to select only common and
most useful components for Storefront themes. By this way we're reducing
final bundle size and improving website **performance** :rocket:.

> We generally use (and encourage partners to) Vue.js for
[Storefront widgets](https://github.com/ecomclub?utf8=%E2%9C%93&q=widget&type=&language=),
but remember that Bootstrap CSS, Font Awesome SVG and Animate.css
**are all reusable with any JS framework**.

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

We're including almost all Bootstrap 4.4 styles and components,
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
Bootstrap 4.4 theme to improve compatibility between brand colors,
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
    --secondary: #333;
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
    --primary-rgb: 232,62,140;
    --secondary-rgb: 51,51,51;
    --primary-lightest: #fad4e6;
    --primary-lightest-yiq: #212529;
    --primary-lighter: #f39ec5;
    --primary-lighter-yiq: #212529;
    --primary-light: #ed6ca7;
    --primary-light-yiq: #212529;
    --secondary-lightest: #878787;
    --secondary-lightest-yiq: #fff;
    --secondary-lighter: #696969;
    --secondary-lighter-yiq: #fff;
    --secondary-light: #4d4d4d;
    --secondary-light-yiq: #fff;
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
[collapse](https://getbootstrap.com/docs/4.4/components/collapse/),
[dropdowns](https://getbootstrap.com/docs/4.4/components/dropdowns/),
[modal](https://getbootstrap.com/docs/4.4/components/modal/) and
[tooltips](https://getbootstrap.com/docs/4.4/components/tooltips/)
scripts from [`bootstrap.native`](https://github.com/thednp/bootstrap.native).

Also some
[BootstrapVue](https://bootstrap-vue.js.org/docs/components/)
components/directives and
[PortalVue](https://portal-vue.linusb.org/)
added directly to global Vue instance,
you can see the available components at
[`src/index.js`](https://github.com/ecomclub/storefront-twbs/blob/master/src/index.js).

**It requires and does not include [Vue.js](https://vuejs.org/)**.
jQuery is _not_ required.


### Font Awesome

Some [Font Awesome](https://fontawesome.com/) SVG icons
are also included to the bundle, together with Font Awesome SVG `dom`.

You can use FA icons by just adding respective CSS classes, eg.:

```html
<i class="fas fa-shopping-bag"></i>
```

See available icons at
[`src/fontawesome-icons.js`](https://github.com/ecomclub/storefront-twbs/blob/master/src/fontawesome-icons.js).
