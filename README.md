# storefront-app

[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/storefront-app/badge)](https://www.codefactor.io/repository/github/ecomclub/storefront-app)
[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-app.svg)](https://www.npmjs.org/@ecomplus/storefront-app)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Vue.js ecommerce app with cart, checkout and account pages

## Deploy

Demo with [Netlify](https://www.netlify.com/) published
[here](https://storefront-app.e-com.plus/).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ecomclub/storefront-app)

## Using as library

If you don't want to customize,
you can just use the default _Storefront-App_ built files:

- Styles:
  1. `https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app/lib/app.min.css`;
- Scripts:
  1. `https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app/lib/manifest.min.js`;
  2. `https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app/lib/vendor.min.js`;
  3. `https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app/lib/app.min.js`;

Importing it into your HTML view as following:

```ejs
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="ecom-store-id" content="<%= store_id %>">
    <meta name="ecom-store-object-id" content="<%= store_object_id %>">
    <title></title>
    <link href="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app/lib/app.min.css" rel="stylesheet">
  </head>
  <body style="opacity: 0">
    <div id="app"></div>
    <div id="credits">
      Powered by
      <a href="https://e-com.plus" target="_blank">E-Com Plus</a>
    </div>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app/lib/manifest.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app/lib/vendor.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-app/lib/app.min.js"></script>
  </body>
</html>
```

Meta tags `ecom-store-id` and `ecom-store-object-id`
are not required if you're using a domain associated to your E-Com Plus store.

## Build setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production as library
npm run build:lib

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work,
check out the [guide](http://vuejs-templates.github.io/webpack/)
and [docs for vue-loader](http://vuejs.github.io/vue-loader).
