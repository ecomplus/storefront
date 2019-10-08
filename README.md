# storefront-template

[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/storefront-template/badge)](https://www.codefactor.io/repository/github/ecomclub/storefront-template)
[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-template.svg)](https://www.npmjs.org/@ecomplus/storefront-template)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

PWA &amp; JAMstack e-commerce theme for E-Com Plus stores

## Template reference

### Element identifiers

IDs and classes to identify elements that you may
want to add custom functionalities or widgets:

> We use (of course) lot of other element identifiers,
but you should use as possible the ones listed below to keep your
widgets more stable, because we will try to keep it even with
new major releases.

- `#menu`
- `#main`
  - `#header`
    - `#logo`
    - `#user-button`
    - `#cart-button`
    - `#search-form`
      - `#search-input`
  - `#content`
    - `.products-carousel`
    - `.retail-grid`
    - `.product-card` (`[data-to-render="true"]`)
    - `#category`
    - `#brand`
    - `#collection`
    - `#product`
      - `#product-block` (`[data-to-render="true"]`)
      - `#product-description`
      - `#product-specs`
    - `#search`
      - `#search-engine`
  - `#overlay`
- `#spa`
  - `#storefront-app`

### Search query

Products on search page must be dynamically loaded,
default HTTP parameters (optionals) to filter search results:

`/search?term&page&categories[]&brands[]`
