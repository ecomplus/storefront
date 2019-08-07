# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
