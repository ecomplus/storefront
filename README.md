# Storefront

[![Netlify Status](https://api.netlify.com/api/v1/badges/c5f6676c-5b7f-4d5b-b348-b714f56f83d0/deploy-status)](https://app.netlify.com/sites/storefront-template/deploys) [![Test build](https://github.com/ecomplus/storefront/workflows/Test%20build/badge.svg)](https://github.com/ecomplus/storefront/actions?workflow=Test+build) [![Publish](https://github.com/ecomplus/storefront/workflows/Publish/badge.svg)](https://github.com/ecomplus/storefront/actions?workflow=Publish) [![CodeFactor](https://www.codefactor.io/repository/github/ecomplus/storefront/badge)](https://www.codefactor.io/repository/github/ecomplus/storefront) [![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

:rocket: Modern and high performant **headless eCommerce Storefront**:

- PWA & JAMstack architecture;
- Ready for [E-Com Plus REST APIs](https://developers.e-com.plus/docs/reference/);
- Micro-frontends built with Vue.js 2;
- Extensible through widgets;
- Easy to customize with [Netlify CMS](https://www.netlifycms.org/);
- Conversion focused following [Google Retail UX Playbook](https://services.google.com/fh/files/events/pdf_retail_ux_playbook.pdf);
- [Internationalization support](https://github.com/ecomplus/i18n);
- A11Y compliance;
- Going for Lighthouse :100: overall;

## Quick start for merchants

> If you just want to deploy your [E-Com Plus](https://e-com.plus) store, take a look at the **[Storefront Starter](https://github.com/ecomplus/storefront-starter)**.

## Demo store

:shopping: https://storefront-demo.e-com.plus

## Development

Fork/clone this monorepo and install dependencies normally:

```bash
git clone https://github.com/ecomplus/storefront
cd storefront
npm i
```

Then you can edit source files at [`@ecomplus/*`](@ecomplus) folders and test template locally with `npm run serve`.

> As any project maintained with [Lerna](https://lerna.js.org/), you should run commands from root directory.

### Packages

Official packages composing Storefront are [listed here](https://github.com/ecomplus/storefront/packages) with respective description and latest version.

They're published for both [npm](https://www.npmjs.com/) and [GPR](https://github.com/features/packages).

### Contributing

Please read the [contribution guidelines](CONTRIBUTING.md).

<details>
  <summary>
  Check some example useful commands
  </summary>

#### Compile template for production

```bash
npm run build
```

#### Compile all packages

```bash
npx lerna exec -- build
```

#### Serve template locally

```bash
npm run serve
```

#### Serve some specific package tests

```bash
lerna run --scope=@ecomplus/{pkg} serve --stream
```

#### Lint changed files

```bash
npx lerna exec -- lint-staged
```

#### Release and publish all changed packages

```bash
npm run release
```

</details>

![E-Com Plus Storefront banner](https://repository-images.githubusercontent.com/183649678/1c624a80-3180-11ea-8761-1f45e0f675a5)
