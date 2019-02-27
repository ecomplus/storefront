# storefront-twbs

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-twbs.svg)](https://www.npmjs.org/@ecomplus/storefront-twbs)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Generate Bootstrap 4 custom theme for E-Com Plus storefront.

## Compiling the storefront theme

From CLI, compile the custom SASS theme to new storefront
Bootstrap kit and utilities passing directories
and brand colors RGBs (without `#`):

```bash
npm i -g storefront-twbs
storefront-twbs ~/mytheme/scss ~/mytheme/dist 6f42c1 e83e8c
```

Note that `~/mytheme/scss` directory **must contain**
`theme` folder with at least
`_variables.scss` and `_components.scss` files.

## Creating custom theme

Clone the [GitHub repository](https://github.com/ecomclub/storefront-twbs)
and install dependencies with NPM:

```bash
git clone https://github.com/ecomclub/storefront-twbs
cd storefront-twbs
npm i
```

Edit the SASS files in the `scss/theme` directory,
we recommend start from `_variables.scss`.

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

### For partners

Note that your dist is not ready for stores,
we also have to compile with the brand colors defined by
the desired merchant.

The customized SASS files on `theme` folder will be used
to compile the theme for each store with respective
brand colors, so these are the files that you should
publish on [Market](https://market.e-com.plus) to distribute
your theme.

## Reference

- https://getbootstrap.com/docs/4.3/getting-started/theming/
- https://uxplanet.org/how-to-customize-bootstrap-b8078a011203

## tl;dr

You can also find open source Bootstrap 4 themes
on [Bootswatch](https://bootswatch.com/) :wink:.
