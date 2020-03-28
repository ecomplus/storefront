# Storefront Template

[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-template.svg)](https://www.npmjs.org/@ecomplus/storefront-template) [![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Netlify Status](https://api.netlify.com/api/v1/badges/c5f6676c-5b7f-4d5b-b348-b714f56f83d0/deploy-status)](https://app.netlify.com/sites/storefront-template/deploys)

PWA &amp; JAMstack e-commerce theme for E-Com Plus stores

## Template reference

### Element identifiers

IDs and classes to identify elements that you may
want to add custom functionalities or widgets:

> We use (of course) lot of other element identifiers,
but you should use as possible the ones listed below to keep your
widgets more stable, because we will try to keep it even with
new major releases.

- `aside#menu`
- `main#main`
  - `header#header`
    - `img#logo`
    - `a#user-button`
    - `a#cart-button`
    - `form#search-form`
      - `input#search-input`
  - `article#content`
    - `section.products-carousel[data-title]`
    - `section.retail-grid`
    - `article[data-product="{...}"]`
      - `div.product-card[data-to-render="true"]`
    - `div#category`
    - `div#brand`
    - `div#collection`
    - `div#product`
      - `section#product-block[data-to-render="true"]`
      - `section#product-description`
      - `section#product-specs`
    - `section#search`
      - `div#search-engine`
  - `div#overlay`
- `main#spa`
  - `div#storefront-app`

### Search query

Products on search page must be dynamically loaded,
default HTTP parameters (optionals) to filter search results:

`/search?term&page&categories[]&brands[]`
