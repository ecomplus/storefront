# storefront-framework


[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/storefront-framework/badge)](https://www.codefactor.io/repository/github/ecomclub/storefront-framework)
[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-framework.svg)](https://www.npmjs.org/@ecomplus/storefront-framework)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Webpack](https://webpack.js.org/) based
tool to develop and build
[JAMstack](https://jamstack.org/) &
[PWA](https://developers.google.com/web/progressive-web-apps/)
e-commerce templates with
[E-Com Plus APIs](https://developers.e-com.plus/docs/reference/)

## Getting started

First things first, install the module as dev dependency:

```bash
npm i --save-dev @ecomplus/storefront-framework
```

> Note: while you can install and run `storefront-pack` globally,
we recommend installing it locally.

### Commands

- `storefront-pack serve`:
Starts Webpack development server on port _9123_ (http://localhost:9123);
- `storefront-pack build`:
Compile assets bundles for production and prerender e-commerce pages;

### NPM scripts

NPM `package.json` scripts are a convenient and useful means to run
locally installed binaries without having to be concerned
about their full paths. Simply define a script as such:

```json
{
  "scripts": {
    "serve": "storefront-pack serve",
    "build": "storefront-pack build"
  }
}
```

And run the following in your terminal/console:

```bash
npm run serve
```

Building for production:

```bash
npm run build
```

## Deploy with Netlify

### Sample

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?stack=cms&repository=https://github.com/ecomclub/storefront-boilerplate)
