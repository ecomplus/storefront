# storefront-twbs

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-twbs.svg)](https://www.npmjs.org/@ecomplus/storefront-twbs)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Generate custom Bootstrap 4 based theme for E-Com Plus storefront.

**[Small guide](https://developers.e-com.plus/storefront-twbs/) for partners**,
please take a look before creating new
templates and widgets.

## Compiling the storefront theme

### Command line

From CLI, compile the custom SASS theme
and utilities passing directories
and brand colors RGBs (without `#`):

```bash
npm i -g @ecomplus/storefront-twbs
storefront-twbs ~/mytheme ~/mytheme/dist 6f42c1 e83e8c
```

Note that `~/mytheme` directory **must contain**
`theme` folder with at least
`_variables.scss` and `_components.scss` files.

### Node.js

Programmatic usage with `build` method:

```javascript
const buildTheme = require('@ecomplus/storefront-twbs').build
let baseDir = '~/mytheme'
let outputDir = '~/mytheme/dist'
let primaryColor = '6f42c1'
let secondaryColor = 'e83e8c'
// build {outputDir}/storefront-twbs.min.css
buildTheme(baseDir, outputDir, primaryColor, secondaryColor)
```

## Creating custom theme

Clone the [GitHub repository](https://github.com/ecomclub/storefront-twbs)
and install dependencies with NPM:

```bash
git clone https://github.com/ecomclub/storefront-twbs
cd storefront-twbs
npm i
```

Edit the SASS files in the `theme` directory,
we recommend start from `_variables.scss`.
You can also create custom SCSS files inside the same folder and
import them from `_components.scss` file.

Start the localhost test server with:

```bash
npm run test
```

Or optionally just compile the SASS to CSS with:

```bash
npm run build
```

When you're done, generate sourcemap and minified CSS
on `dist` folder by running:

```bash
npm run dist
```

### Components

We're including all Bootstrap 4.3 components,
for complete theme customizations, components styles may be
overridden one by one on `theme/_components.scss`.

### For partners

Note that your dist is not ready for stores,
we also have to compile with the brand colors defined by
the desired merchant.

The customized SASS files on `theme` folder will be used
to compile the theme for each store with respective
brand colors, so these are the files that you should
put on your template source
distributed in the [Market](https://market.e-com.plus).

## Reference

- https://getbootstrap.com/docs/4.3/getting-started/theming/
- https://uxplanet.org/how-to-customize-bootstrap-b8078a011203

## tl;dr

You can also find open source Bootstrap 4 themes
on [Bootswatch](https://bootswatch.com/) :wink:.
