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

## Project structure

```
├── content
│   └── settings.json
└── template
    ├── assets
    ├── js
    │   └── index.js
    ├── public
    │   ├── admin
    │   │   ├── config.yml
    │   │   └── index.html
    │   └── img
    │       ├── uploads
    │       │   ├── favicon.png
    │       │   ├── icon.png
    │       │   ├── large-icon.png
    │       │   ├── logo.png
    │       │   └── og-image.png
    │       ├── icon.png
    │       └── large-icon.png
    ├── scss
    │   ├── storefront-twbs
    │   │   └── theme
    │   │       ├── assets
    │   │       ├── _components.scss
    │   │       └── _variables.scss
    │   └── styles.scss
    └── views
        ├── includes
        │   ├── head.ejs
        │   └── html.ejs
        └── pages
            ├── _cms
            │   ├── blog-posts.ejs
            │   └── extra-pages.ejs
            ├── _brands.ejs
            ├── _categories.ejs
            ├── _collections.ejs
            ├── _products.ejs
            ├── blog.ejs
            └── index.ejs
```

### `@/content`

Root directory for Netlify CMS (or any other headless CMS)
[collections](https://www.netlifycms.org/docs/add-to-your-site/#collections)
JSON content.
You may create and/or edit content here to preset
some content for examples or defaults.

**[`settings.json`](https://github.com/ecomclub/storefront-framework/blob/master/content/settings.json)
is required** and must have at least the
properties preseted as default.

### `@/template`

Source template files.
All JS, SCSS, images and other assets files should be placed here.

### `@/template/assets`

Predefined template assets (such as images, videos, sounds...)
that should be imported inside `js` or `scss` files.

### `@/template/js`

JS source files,
**[`index.js`](https://github.com/ecomclub/storefront-framework/blob/master/template/js/index.js)
is required**,
other files and modules should be imported from index.

### `@/template/public`

Any static assets placed in the `public`
folder will simply be copied and not go through Webpack.
You need to reference them using absolute paths.

### `@/template/public/admin`

Setup for [Netlify CMS](https://www.netlifycms.org/),
is optional if you're not planning to use the the referred CMS.

[`config.yml`](https://github.com/ecomclub/storefront-framework/blob/master/template/public/admin/config.yml)
should be
[configured](https://www.netlifycms.org/docs/add-to-your-site/#configuration)
following your template options and features.
The settings collection (file `content/settings.json`)
must have at least the preseted fields.

## Deploy with Netlify

### Sample

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?stack=cms&repository=https://github.com/ecomclub/storefront-boilerplate)
