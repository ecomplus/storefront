# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.8.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.7.6...@ecomplus/storefront-renderer@2.8.0) (2021-07-08)


### Features

* **renderer/ejs-data:** abstracting comming image size handler for local images with `tryImageSize` ([0b3cc31](https://github.com/ecomplus/storefront/commit/0b3cc31e5da798c78485b193dae2bbfdc5d318ec))





## [2.7.6](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.7.5...@ecomplus/storefront-renderer@2.7.6) (2021-07-05)


### Bug Fixes

* **deps:** update all non-major dependencies ([#489](https://github.com/ecomplus/storefront/issues/489)) ([7a29e5f](https://github.com/ecomplus/storefront/commit/7a29e5f08703d2d6b78a39f4490387b4fa45afa8))





## [2.7.5](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.7.4...@ecomplus/storefront-renderer@2.7.5) (2021-07-02)


### Bug Fixes

* **renderer/ejs:** prevent including from template pkg when not running with framework by default ([4f30f38](https://github.com/ecomplus/storefront/commit/4f30f384d89d6af14233ddd8843ce9a7ad5af8a0))
* **renderer/redirects:** add `proxy-revalidate` to cache control for 302 redirects ([bfa14bb](https://github.com/ecomplus/storefront/commit/bfa14bb9f20b4cbe9aa2eca954a99bc727fe29c7))





## [2.7.4](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.7.3...@ecomplus/storefront-renderer@2.7.4) (2021-06-17)


### Bug Fixes

* **deps:** update @ecomplus/search-engine to v2.6.1 ([20214c5](https://github.com/ecomplus/storefront/commit/20214c5cc27c75a2ba597da9557b6352b84a92a8))





## [2.7.3](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.7.2...@ecomplus/storefront-renderer@2.7.3) (2021-06-11)


### Bug Fixes

* **deps:** update all non-major dependencies ([#478](https://github.com/ecomplus/storefront/issues/478)) ([f3b5f96](https://github.com/ecomplus/storefront/commit/f3b5f96c6d863d446d806668c4fbab92e785cce2))





## [2.7.2](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.7.1...@ecomplus/storefront-renderer@2.7.2) (2021-05-18)


### Bug Fixes

* **deps:** update @ecomplus/i18n to v1.21.0 ([a235058](https://github.com/ecomplus/storefront/commit/a2350580c50480e9caf74ac64dde14e4b618a057))





## [2.7.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.7.0...@ecomplus/storefront-renderer@2.7.1) (2021-04-28)


### Bug Fixes

* **deps:** update dependency image-size to v1 ([#446](https://github.com/ecomplus/storefront/issues/446)) ([3e3cb08](https://github.com/ecomplus/storefront/commit/3e3cb08e6769e30f9102aaa8116cb59caaf105a2))





# [2.7.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.6.2...@ecomplus/storefront-renderer@2.7.0) (2021-04-19)


### Features

* **renderer/get-store-data:** handle store data cache with optional env vars ([e85d3f9](https://github.com/ecomplus/storefront/commit/e85d3f96c5dd89eaee864800574a2bfe2424ea25))


### Performance Improvements

* **renderer/ssr:** enable store data from cache with env var ([d674ecb](https://github.com/ecomplus/storefront/commit/d674ecbdede790541bcc35cff6cf32d7bc09c316))





## [2.6.2](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.6.1...@ecomplus/storefront-renderer@2.6.2) (2021-04-18)


### Bug Fixes

* **renderer/ssr:** fix cache headers with lower max age for redirect responses ([bb3788e](https://github.com/ecomplus/storefront/commit/bb3788e22c1f28a403d49d717f7ad0b7d55a001e))





## [2.6.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.6.0...@ecomplus/storefront-renderer@2.6.1) (2021-03-30)


### Bug Fixes

* **ssr:** edit default cache control when no long cache set (lower) ([7f87f3e](https://github.com/ecomplus/storefront/commit/7f87f3ed444b96ded1eb453f1d999d617a38c899))





# [2.6.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.5.0...@ecomplus/storefront-renderer@2.6.0) (2021-03-29)


### Features

* **ssr:** handling `STOREFRONT_LONG_CACHE` optional env ([2533f3b](https://github.com/ecomplus/storefront/commit/2533f3b75134a30fccafa1fa398d3eb67a50972c))





# [2.5.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.15...@ecomplus/storefront-renderer@2.5.0) (2021-03-29)


### Features

* **ssr:** support new `getCacheControl` callback arg ([6c8bd34](https://github.com/ecomplus/storefront/commit/6c8bd340a7ed94104d6766f5a7eda5b942643107))





## [2.4.15](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.14...@ecomplus/storefront-renderer@2.4.15) (2021-03-12)


### Bug Fixes

* **deps:** update @ecomplus/client to v2.2.1 ([574f93f](https://github.com/ecomplus/storefront/commit/574f93fd027220bb64cad19443e38ce559c69e62))





## [2.4.14](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.13...@ecomplus/storefront-renderer@2.4.14) (2021-02-27)


### Bug Fixes

* **get-assets-reference:** should not require './entry.js' ([289e0c5](https://github.com/ecomplus/storefront/commit/289e0c558138f9961445c01281aaebb213e39f05))





## [2.4.13](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.12...@ecomplus/storefront-renderer@2.4.13) (2021-02-15)

**Note:** Version bump only for package @ecomplus/storefront-renderer





## [2.4.12](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.11...@ecomplus/storefront-renderer@2.4.12) (2021-01-25)

**Note:** Version bump only for package @ecomplus/storefront-renderer





## [2.4.11](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.10...@ecomplus/storefront-renderer@2.4.11) (2021-01-14)

**Note:** Version bump only for package @ecomplus/storefront-renderer





## [2.4.10](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.9...@ecomplus/storefront-renderer@2.4.10) (2020-12-24)

**Note:** Version bump only for package @ecomplus/storefront-renderer





## [2.4.9](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.8...@ecomplus/storefront-renderer@2.4.9) (2020-12-16)


### Performance Improvements

* **entry:** remove starter from webpack entry ([d54f939](https://github.com/ecomplus/storefront/commit/d54f93988897a5417ae880ca6071a8988c9d6212))





## [2.4.8](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.7...@ecomplus/storefront-renderer@2.4.8) (2020-12-15)

**Note:** Version bump only for package @ecomplus/storefront-renderer





## [2.4.7](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.6...@ecomplus/storefront-renderer@2.4.7) (2020-12-15)

**Note:** Version bump only for package @ecomplus/storefront-renderer





## [2.4.6](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.5...@ecomplus/storefront-renderer@2.4.6) (2020-12-15)

**Note:** Version bump only for package @ecomplus/storefront-renderer





## [2.4.5](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.4...@ecomplus/storefront-renderer@2.4.5) (2020-12-01)


### Performance Improvements

* **ssr-cache:** increase fallback cache headers ([78610e0](https://github.com/ecomplus/storefront/commit/78610e026ec4be3ec016879fa8d2e1ba6cb1f7ed))





## [2.4.4](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.3...@ecomplus/storefront-renderer@2.4.4) (2020-11-27)


### Bug Fixes

* **deps:** update @ecomplus/search-engine to v2.5.0 ([012ae01](https://github.com/ecomplus/storefront/commit/012ae01702f4d3077ed11bc7f8993bdc66c032d5))





## [2.4.3](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.2...@ecomplus/storefront-renderer@2.4.3) (2020-11-18)


### Bug Fixes

* **html-minifier:** set 'removeAttributeQuotes' false (keep attr quotes) ([1344f1a](https://github.com/ecomplus/storefront/commit/1344f1a169869a1c7125c62624ed287a135477dc))





## [2.4.2](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.1...@ecomplus/storefront-renderer@2.4.2) (2020-11-09)


### Bug Fixes

* **deps:** update all non-major dependencies ([#357](https://github.com/ecomplus/storefront/issues/357)) ([63ed559](https://github.com/ecomplus/storefront/commit/63ed559c2d93c1aa133a786bb67bbc46358afd7c))





## [2.4.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.4.0...@ecomplus/storefront-renderer@2.4.1) (2020-11-03)


### Bug Fixes

* **deps:** update all non-major dependencies ([#344](https://github.com/ecomplus/storefront/issues/344)) ([ae49403](https://github.com/ecomplus/storefront/commit/ae4940343a6c656efef8f7536e16b5f88e3f48dd))





# [2.4.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.3.1...@ecomplus/storefront-renderer@2.4.0) (2020-10-26)


### Bug Fixes

* **deps:** update dependency markdown-it to v12 ([#340](https://github.com/ecomplus/storefront/issues/340)) ([edfcd4a](https://github.com/ecomplus/storefront/commit/edfcd4a6f76589ba09878b78614f263abb30b042))
* **ssr-function:** handle redirect for not found ending with slash ([18da1eb](https://github.com/ecomplus/storefront/commit/18da1eb59c68540cf1ec11f40ec8773ea6ad0513))
* **ssr-function:** redirect to 404 passing origin as url param ([d7c77c6](https://github.com/ecomplus/storefront/commit/d7c77c6fba334834c386e2e8f08b1347d2d99394))


### Features

* **ssr-function:** pass 'url' param on 404 redirect ([0ad6660](https://github.com/ecomplus/storefront/commit/0ad6660a00faa1db2d0e86e274f706eb7874ff37))





## [2.3.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.3.0...@ecomplus/storefront-renderer@2.3.1) (2020-10-15)


### Bug Fixes

* **ssr-cache:** set server max age to 10m ([d612fe0](https://github.com/ecomplus/storefront/commit/d612fe0d1a4f6f482135a3e3d764d5bd53c86b57))





# [2.3.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.2.1...@ecomplus/storefront-renderer@2.3.0) (2020-10-14)


### Features

* **partial-build:** try env STOREFRONT_BUNDLES_PATH to get past bundles data ([2dd7282](https://github.com/ecomplus/storefront/commit/2dd7282fc3c61dc9b0d539ffd1d23f7bb7130f03))





## [2.2.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.2.0...@ecomplus/storefront-renderer@2.2.1) (2020-10-14)


### Bug Fixes

* **deps:** update all non-major dependencies ([#332](https://github.com/ecomplus/storefront/issues/332)) ([b8c0abc](https://github.com/ecomplus/storefront/commit/b8c0abc6937636157df27287ea2478374fa842ad))
* **ssr-function:** fix not found cache headers ([38d4f33](https://github.com/ecomplus/storefront/commit/38d4f331824f38e836916852606f506558dfd982))





# [2.2.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.1.1...@ecomplus/storefront-renderer@2.2.0) (2020-10-07)


### Features

* **functions:** serverless function for ssr ([63fdb56](https://github.com/ecomplus/storefront/commit/63fdb566153d73d4b097949f12499e560cba812e))





## [2.1.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-renderer@2.1.0...@ecomplus/storefront-renderer@2.1.1) (2020-10-06)


### Bug Fixes

* **deps:** fix pkg dependencies ([2a53ad8](https://github.com/ecomplus/storefront/commit/2a53ad807a398b96c8f9c873c8b211158d6d573d))





# 2.1.0 (2020-10-06)


### Features

* **storefront-renderer:** new @ecomplus/storefront-renderer pkg for ssr only (no bundler) ([e6d8851](https://github.com/ecomplus/storefront/commit/e6d88516687014fb3347dde6034c94ac02a0d12b))
