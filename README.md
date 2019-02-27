# storefront-twbs

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-twbs.svg)](https://www.npmjs.org/@ecomplus/storefront-twbs)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Generate Bootstrap 4 custom theme for E-Com Plus storefront

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
