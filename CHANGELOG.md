# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.9.0](https://github.com/ecomclub/storefront-framework/compare/v4.8.0...v4.9.0) (2019-08-28)


### Features

* **output:** specify chunkfilename to support dynamic imports properly ([f4d1895](https://github.com/ecomclub/storefront-framework/commit/f4d1895))

## [4.8.0](https://github.com/ecomclub/storefront-framework/compare/v4.7.0...v4.8.0) (2019-08-27)


### Features

* **preload:** also get grids list before rendering ([eb5a216](https://github.com/ecomclub/storefront-framework/commit/eb5a216))

## [4.7.0](https://github.com/ecomclub/storefront-framework/compare/v4.6.3...v4.7.0) (2019-08-25)


### Features

* **webpack:** handling WEBPACK_BUILD_DEV env to exclude sw register ([b0beccf](https://github.com/ecomclub/storefront-framework/commit/b0beccf))

### [4.6.3](https://github.com/ecomclub/storefront-framework/compare/v4.6.2...v4.6.3) (2019-08-25)


### Bug Fixes

* **webpack:** start service worker on production only ([c575f1a](https://github.com/ecomclub/storefront-framework/commit/c575f1a))

### [4.6.2](https://github.com/ecomclub/storefront-framework/compare/v4.6.1...v4.6.2) (2019-08-24)


### Bug Fixes

* **config:** setup E-Com Plus global config ([3fd5cdc](https://github.com/ecomclub/storefront-framework/commit/3fd5cdc))

### [4.6.1](https://github.com/ecomclub/storefront-framework/compare/v4.6.0...v4.6.1) (2019-08-24)


### Bug Fixes

* **babel-config:** fix default regex to babel loader test and exclude ([7d2e4c5](https://github.com/ecomclub/storefront-framework/commit/7d2e4c5))

## [4.6.0](https://github.com/ecomclub/storefront-framework/compare/v4.5.0...v4.6.0) (2019-08-23)


### Features

* **babel-config:** handle optional BABEL_LOADER_EXCLUDE env ([cf2c0bf](https://github.com/ecomclub/storefront-framework/commit/cf2c0bf))

## [4.5.0](https://github.com/ecomclub/storefront-framework/compare/v4.4.0...v4.5.0) (2019-08-21)


### Features

* **renderer:** add EcomSearch constructor to template params ([28180ab](https://github.com/ecomclub/storefront-framework/commit/28180ab))

## [4.4.0](https://github.com/ecomclub/storefront-framework/compare/v4.3.2...v4.4.0) (2019-08-20)


### Features

* **renderer:** abstraction for dictionary content ([65f0ef4](https://github.com/ecomclub/storefront-framework/commit/65f0ef4))

### [4.3.2](https://github.com/ecomclub/storefront-framework/compare/v4.3.1...v4.3.2) (2019-08-19)

### [4.3.1](https://github.com/ecomclub/storefront-framework/compare/v4.3.0...v4.3.1) (2019-08-17)


### Bug Fixes

* **renderer:** edit cms function to handle folders and list slugs ([03cf79d](https://github.com/ecomclub/storefront-framework/commit/03cf79d))

## [4.3.0](https://github.com/ecomclub/storefront-framework/compare/v4.2.0...v4.3.0) (2019-08-16)


### Features

* **renderer:** adding lodash lib to template params ([f851e07](https://github.com/ecomclub/storefront-framework/commit/f851e07))

## [4.2.0](https://github.com/ecomclub/storefront-framework/compare/v4.1.4...v4.2.0) (2019-08-14)


### Features

* **paths:** adding support for SF_TEMPLATE_DIR env var ([a68a79b](https://github.com/ecomclub/storefront-framework/commit/a68a79b))

### [4.1.4](https://github.com/ecomclub/storefront-framework/compare/v4.1.3...v4.1.4) (2019-08-14)


### Bug Fixes

* **renderer:** fix context object for cms collections ([ff813a0](https://github.com/ecomclub/storefront-framework/commit/ff813a0))

### [4.1.3](https://github.com/ecomclub/storefront-framework/compare/v4.1.2...v4.1.3) (2019-08-14)

### [4.1.2](https://github.com/ecomclub/storefront-framework/compare/v4.1.1...v4.1.2) (2019-08-14)


### Bug Fixes

* **store-data:** fix handling list requests ([c9fd830](https://github.com/ecomclub/storefront-framework/commit/c9fd830))

### [4.1.1](https://github.com/ecomclub/storefront-framework/compare/v4.1.0...v4.1.1) (2019-08-14)

## [4.1.0](https://github.com/ecomclub/storefront-framework/compare/v4.0.0...v4.1.0) (2019-08-14)


### Features

* **renderer:** adding resolve route function to params ([f0204f4](https://github.com/ecomclub/storefront-framework/commit/f0204f4))

## [4.0.0](https://github.com/ecomclub/storefront-framework/compare/v3.2.3...v4.0.0) (2019-08-14)


### ⚠ BREAKING CHANGES

* **renderer:** template data changed, old ejs templates can fail

* **renderer:** wrapping template params on _ (global) property ([98afd64](https://github.com/ecomclub/storefront-framework/commit/98afd64))

### [3.2.3](https://github.com/ecomclub/storefront-framework/compare/v3.2.2...v3.2.3) (2019-08-13)


### Bug Fixes

* **webpack:** fix removing files from public folder with clean plugin ([cd76a83](https://github.com/ecomclub/storefront-framework/commit/cd76a83))

### [3.2.2](https://github.com/ecomclub/storefront-framework/compare/v3.2.1...v3.2.2) (2019-08-13)


### Bug Fixes

* **webpack:** clear output folder only if unset WEBPACK_BUILD_LIB ([1c34b1e](https://github.com/ecomclub/storefront-framework/commit/1c34b1e))

### [3.2.1](https://github.com/ecomclub/storefront-framework/compare/v3.2.0...v3.2.1) (2019-08-13)

## [3.2.0](https://github.com/ecomclub/storefront-framework/compare/v3.1.7...v3.2.0) (2019-08-13)


### Features

* **renderer:** support rendering xml files ([f2a8145](https://github.com/ecomclub/storefront-framework/commit/f2a8145))

### [3.1.7](https://github.com/ecomclub/storefront-framework/compare/v3.1.6...v3.1.7) (2019-08-13)

### [3.1.6](https://github.com/ecomclub/storefront-framework/compare/v3.1.5...v3.1.6) (2019-08-13)


### Bug Fixes

* **renderer:** read json content with fs to prevent node require cache ([fa99378](https://github.com/ecomclub/storefront-framework/commit/fa99378))

### [3.1.5](https://github.com/ecomclub/storefront-framework/compare/v3.1.4...v3.1.5) (2019-08-13)

### [3.1.4](https://github.com/ecomclub/storefront-framework/compare/v3.1.3...v3.1.4) (2019-08-12)

### [3.1.3](https://github.com/ecomclub/storefront-framework/compare/v3.1.2...v3.1.3) (2019-08-12)

### [3.1.2](https://github.com/ecomclub/storefront-framework/compare/v3.1.1...v3.1.2) (2019-08-11)


### Bug Fixes

* **webpack:** fix entry files order to export correclty ([d850df2](https://github.com/ecomclub/storefront-framework/commit/d850df2))

### [3.1.1](https://github.com/ecomclub/storefront-framework/compare/v3.1.0...v3.1.1) (2019-08-10)


### Bug Fixes

* **store-data:** fix handling ecom manifest ([6097e2f](https://github.com/ecomclub/storefront-framework/commit/6097e2f))

## [3.1.0](https://github.com/ecomclub/storefront-framework/compare/v3.0.2...v3.1.0) (2019-08-10)


### Features

* **build:** try to minify html output ([b40e193](https://github.com/ecomclub/storefront-framework/commit/b40e193))

### [3.0.2](https://github.com/ecomclub/storefront-framework/compare/v3.0.1...v3.0.2) (2019-08-10)

### [3.0.1](https://github.com/ecomclub/storefront-framework/compare/v3.0.0...v3.0.1) (2019-08-10)


### Bug Fixes

* **bin:** watch source files to reload and stream ([6b14038](https://github.com/ecomclub/storefront-framework/commit/6b14038))
* **webpack:** using css extract even on development ([7941107](https://github.com/ecomclub/storefront-framework/commit/7941107))

## [3.0.0](https://github.com/ecomclub/storefront-framework/compare/v3.0.0-beta.1...v3.0.0) (2019-08-10)


### Bug Fixes

* **main:** fix exported object ([b4cebc4](https://github.com/ecomclub/storefront-framework/commit/b4cebc4))
* **renderer:** edit slug regex to enable views on admin path ([9ff46d3](https://github.com/ecomclub/storefront-framework/commit/9ff46d3))
* **renderer:** fix resolving file paths ([bdf5beb](https://github.com/ecomclub/storefront-framework/commit/bdf5beb))
* **server:** handling renderer correctly ([43acf31](https://github.com/ecomclub/storefront-framework/commit/43acf31))
* **server:** passing url path correctly to renderer ([7aee4ad](https://github.com/ecomclub/storefront-framework/commit/7aee4ad))


### Features

* **build:** build all cms folder collection slugs ([4055a53](https://github.com/ecomclub/storefront-framework/commit/4055a53))
* **build:** prerendering pages, storefront routes and additional views ([a4a6d66](https://github.com/ecomclub/storefront-framework/commit/a4a6d66))
* **renderer:** adding markdown parser ([da842d1](https://github.com/ecomclub/storefront-framework/commit/da842d1))
* **renderer:** handle prerenderization with ejs async ([1c3e69b](https://github.com/ecomclub/storefront-framework/commit/1c3e69b))
* **renderer:** render cms collections, store resources and custom views ([3eb2fd8](https://github.com/ecomclub/storefront-framework/commit/3eb2fd8))

## [3.0.0-beta.1](https://github.com/ecomclub/storefront-framework/compare/v2.14.0...v3.0.0-beta.1) (2019-08-09)


### ⚠ BREAKING CHANGES

* **pkg:** commands functionality entirely changed

* **pkg:** update main file, bin command and scripts ([2285af2](https://github.com/ecomclub/storefront-framework/commit/2285af2))


### Bug Fixes

* **bin:** update serve and build scripts path ([d0c4ffb](https://github.com/ecomclub/storefront-framework/commit/d0c4ffb))
* **js:** stop importing libs on example template js index ([6f49a7c](https://github.com/ecomclub/storefront-framework/commit/6f49a7c))
* **template:** remove initial imports ([c0efa94](https://github.com/ecomclub/storefront-framework/commit/c0efa94))


### Features

* **store-data:** load E-Com Plus data for template renderization ([5fcae5e](https://github.com/ecomclub/storefront-framework/commit/5fcae5e))
* **sw:** checking for custom service worker file on pub dir ([90245c2](https://github.com/ecomclub/storefront-framework/commit/90245c2))

## 2.14.0 (2019-08-07)


### Bug Fixes

* copy storefront-app builded files if dir exists ([1b7cfb0](https://github.com/ecomclub/storefront-framework/commit/1b7cfb0))
* create 'manifest.json' file (no fingerprint) ([ab2184c](https://github.com/ecomclub/storefront-framework/commit/ab2184c))
* debug errors while reading ejs partials (includes) ([1a01c36](https://github.com/ecomclub/storefront-framework/commit/1a01c36))
* debug invalid include and skip fatal errors ([ea63de7](https://github.com/ecomclub/storefront-framework/commit/ea63de7))
* do not inject bundles on /app/index (storefront-app) ([732ce24](https://github.com/ecomclub/storefront-framework/commit/732ce24))
* do not inject bundles on /app/index, not publishing settings.json ([034f7b4](https://github.com/ecomclub/storefront-framework/commit/034f7b4))
* do not minize css on dev mode ([8b437f0](https://github.com/ecomclub/storefront-framework/commit/8b437f0))
* edit compiled icon sizes ([9cf137f](https://github.com/ecomclub/storefront-framework/commit/9cf137f))
* fix error (\ at end of pattern) on windows ([1973edb](https://github.com/ecomclub/storefront-framework/commit/1973edb))
* fix path separator on include name (Windows compat) ([9e6a5c9](https://github.com/ecomclub/storefront-framework/commit/9e6a5c9))
* fix pwa icons src from pub dir ([0f747a7](https://github.com/ecomclub/storefront-framework/commit/0f747a7))
* fixing html plugin template parameters ([8766d37](https://github.com/ecomclub/storefront-framework/commit/8766d37))
* fixing some workbox (sw) routes ([ae1bf10](https://github.com/ecomclub/storefront-framework/commit/ae1bf10))
* get stats options from webpack.config.js ([2ad4b42](https://github.com/ecomclub/storefront-framework/commit/2ad4b42))
* getting cms content from nested folders correctly ([de9aa8f](https://github.com/ecomclub/storefront-framework/commit/de9aa8f))
* handling pwa icons from pub dir ([3d975a5](https://github.com/ecomclub/storefront-framework/commit/3d975a5))
* meta 'theme-color' istead of 'theme_color' ([f65cfeb](https://github.com/ecomclub/storefront-framework/commit/f65cfeb))
* node env as webpack mode ([f161ee3](https://github.com/ecomclub/storefront-framework/commit/f161ee3))
* pass all template params when rendering partials ([96f1fbb](https://github.com/ecomclub/storefront-framework/commit/96f1fbb))
* paths on include names ([765c2bc](https://github.com/ecomclub/storefront-framework/commit/765c2bc))
* prevent slug change by reference on template params ([c08c0bf](https://github.com/ecomclub/storefront-framework/commit/c08c0bf))
* read views/partials directory ([3d1d5f3](https://github.com/ecomclub/storefront-framework/commit/3d1d5f3))
* rename 'include' to 'partial' to keep ejs compatibility ([9e49f99](https://github.com/ecomclub/storefront-framework/commit/9e49f99))
* returns webpack plugin class and partial function for tmp includes ([bcdf2a7](https://github.com/ecomclub/storefront-framework/commit/bcdf2a7))
* rewrite and reorder workbox routes ([dc9f55a](https://github.com/ecomclub/storefront-framework/commit/dc9f55a))
* skip undefined slug ([c79dd11](https://github.com/ecomclub/storefront-framework/commit/c79dd11))


### Features

* add md (markdown it) to template parameters ([70de4fb](https://github.com/ecomclub/storefront-framework/commit/70de4fb))
* add meta generator with webpakc html plugin ([2fab72a](https://github.com/ecomclub/storefront-framework/commit/2fab72a))
* add slug to template parameters ([0d1b9a5](https://github.com/ecomclub/storefront-framework/commit/0d1b9a5))
* also copy storefront-app static folder ([ae25662](https://github.com/ecomclub/storefront-framework/commit/ae25662))
* also not inject bundles on /admin/index ([3c5f0df](https://github.com/ecomclub/storefront-framework/commit/3c5f0df))
* automatically opens browser tab with --open argument ([7b96580](https://github.com/ecomclub/storefront-framework/commit/7b96580))
* copy content/settings.json to output ([050a17d](https://github.com/ecomclub/storefront-framework/commit/050a17d))
* copy storefront-app builded files if dir exists ([4a3d860](https://github.com/ecomclub/storefront-framework/commit/4a3d860))
* copying files from static folder ([ff3f508](https://github.com/ecomclub/storefront-framework/commit/ff3f508))
* handling ECOM_STORE_ID and ECOM_STORE_OBJECT_ID end vars ([28f0d55](https://github.com/ecomclub/storefront-framework/commit/28f0d55))
* handling html minification properly ([4f25ff4](https://github.com/ecomclub/storefront-framework/commit/4f25ff4))
* handling site settings with netlify cms, setup settings.json ([0367d36](https://github.com/ecomclub/storefront-framework/commit/0367d36))
* importing all js dependencies ([ece948a](https://github.com/ecomclub/storefront-framework/commit/ece948a))
* including storefront-twbs on styles.scss ([c1c2536](https://github.com/ecomclub/storefront-framework/commit/c1c2536))
* minify css with cssnano ([74158ae](https://github.com/ecomclub/storefront-framework/commit/74158ae))
* prerender homepage ([6c75756](https://github.com/ecomclub/storefront-framework/commit/6c75756))
* set 'theme_color' on manifest and html meta ([c187b1c](https://github.com/ecomclub/storefront-framework/commit/c187b1c))
* settings (and defaults) for pwa manifest ([b96e482](https://github.com/ecomclub/storefront-framework/commit/b96e482))
* start importing storefront scripts ([742e07d](https://github.com/ecomclub/storefront-framework/commit/742e07d))
* supporting dynamic import ([5a3e24f](https://github.com/ecomclub/storefront-framework/commit/5a3e24f))
* try to get dev server port from cli args (--port=) ([07dde09](https://github.com/ecomclub/storefront-framework/commit/07dde09))
