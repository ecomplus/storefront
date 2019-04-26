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

### Basic directory tree

```
├── content
└── template
    ├── assets
    ├── js
    ├── public
    │   ├── admin
    │   └── img
    │       └── uploads
    ├── scss
    │   └── storefront-twbs
    │       └── theme
    └── views
        ├── includes
        └── pages
```

#### `/content`

Root directory for Netlify CMS (or any other headless CMS)
[collections](https://www.netlifycms.org/docs/add-to-your-site/#collections)
JSON content.
You may create and/or edit content here to preset
some content for examples or defaults.

[`settings.json`](https://github.com/ecomclub/storefront-framework/blob/master/content/settings.json)
is required and must have at least the
properties preseted as default.

#### `/template`

Source template files.
All JS, SCSS, images and other assets files should be placed here.

#### `/template/assets`

Predefined template assets (such as images, videos, sounds...)
that should be imported inside `js` or `scss` files.

#### `/template/js`

JS source files,
[`index.js`](https://github.com/ecomclub/storefront-framework/blob/master/template/js/index.js)
is required,
other files and modules should be imported from index.

#### `/template/public`

Any static assets placed in the `public`
folder will simply be copied and not go through Webpack.
You need to reference them using absolute paths.

#### `/template/public/admin`

Setup for [Netlify CMS](https://www.netlifycms.org/),
is optional if you're not planning to use the the referred CMS.

[`config.yml`](https://github.com/ecomclub/storefront-framework/blob/master/template/public/admin/config.yml)
should be
[configured](https://www.netlifycms.org/docs/add-to-your-site/#configuration)
following your template options and features.
The settings collection (file `content/settings.json`)
must have at least the preseted fields.

#### `/template/public/img`

Place default favicon and app icons here.

#### `/template/public/img/uploads`

Netlify CMS
[media](https://www.netlifycms.org/docs/add-to-your-site/#media-and-public-folders)
on `uploads` folder, where the merchant may
upload custom logo, banners, icons and other assets from
CMS dashboard.

#### `/template/scss`

[SCSS](https://sass-lang.com/)
to compile CSS stylesheet,
[`styles.scss`](https://github.com/ecomclub/storefront-framework/blob/master/template/scss/styles.scss)
is required, other files and modules
should be imported inside it.

#### `/template/scss/storefront-twbs/theme`

[Custom storefront Bootstrap theme](https://github.com/ecomclub/storefront-twbs#creating-custom-theme),
`_components.scss` and `_variables.scss` are required.

#### `/template/views`

[EJS](https://ejs.co/) markup to compile HTML files.

#### `/template/views/includes`

EJS partials to be included on pages, receiving all parsed
CMS content and optionally additional arguments.
Import the partial by filename, eg.:

```ejs
<%= include('head', { title: 'Hello World' }) %>
```

#### `/template/views/pages`

EJS views to compile HTML pages, predefined files:

```
├── index.ejs
├── _brands.ejs
├── _categories.ejs
├── _collections.ejs
└── _products.ejs
```

The above files are required,
with the specified names. They have to be in the
root of `pages` directory.

To complete the storefront template,
you should also create other EJS views.
It's possible to use as many pages as you want,
and you can choose any filenames.

#### `/template/views/pages/_cms`

EJS views for
[folder collections](https://www.netlifycms.org/docs/collection-types/#folder-collections),
witch produces multiple slugs.

For example, for a blog folder collection on folder `content/blog-posts`,
you should have a view `_cms/blog-posts.ejs`, it will generate an HTML page for each
post saved by CMS.

## Deploy with Netlify

As a JAMstack app, your template may be easily deployed with Netlify,
to do that you should add a simple
[netlify.toml](https://github.com/ecomclub/storefront-framework/blob/master/netlify.toml)
file and a
[deploy button](https://www.netlify.com/docs/deploy-button/) with link to your
template repository and
`stack=cms` param (considering you're using Netlify CMS).

### Sample

```md
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?stack=cms&repository=https://github.com/ecomclub/storefront-framework)
```

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?stack=cms&repository=https://github.com/ecomclub/storefront-framework)
