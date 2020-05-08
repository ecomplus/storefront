# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.12.2](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.12.1...@ecomplus/storefront-framework@5.12.2) (2020-05-08)


### Bug Fixes

* **renderer:** fix tested slug regex ([46e18ca](https://github.com/ecomplus/storefront/commit/46e18ca3222b3f1d6ce817ccca2e4ae9ee61e8e0))





## [5.12.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.12.0...@ecomplus/storefront-framework@5.12.1) (2020-05-05)


### Bug Fixes

* **deps:** update @ecomplus/i18n to v1.9.0 ([534a235](https://github.com/ecomplus/storefront/commit/534a23571d6d054a9f8186fb0d9e069dac78836f))
* **deps:** update dependency terser-webpack-plugin to v3 ([#209](https://github.com/ecomplus/storefront/issues/209)) ([2575644](https://github.com/ecomplus/storefront/commit/25756448c6aca10969d1ab89ec05979548362603))





# [5.12.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.11.1...@ecomplus/storefront-framework@5.12.0) (2020-05-01)


### Bug Fixes

* **deps:** update @ecomplus/storefront-router to v2.2.0 ([0b15965](https://github.com/ecomplus/storefront/commit/0b1596560eb6262128b601af6cb026b44480c647))


### Features

* **server:** support monorepo hot reload with MONOREPO_SERVER ([a754d00](https://github.com/ecomplus/storefront/commit/a754d00917a07b652cbd6155db70bdf28894f399))





## [5.11.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.11.0...@ecomplus/storefront-framework@5.11.1) (2020-04-23)


### Bug Fixes

* **deps:** update @ecomplus/i18n to 1.7.1 ([6a55c90](https://github.com/ecomplus/storefront/commit/6a55c90b370ae5e872ee96c0763febc94462484d))
* **deps:** update @ecomplus/i18n to v1.8.0 ([63140b8](https://github.com/ecomplus/storefront/commit/63140b837537442f92532ae98a8e14caa55edc55))





# [5.11.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.10.0...@ecomplus/storefront-framework@5.11.0) (2020-04-16)


### Bug Fixes

* **deps:** update all non-major dependencies ([#196](https://github.com/ecomplus/storefront/issues/196)) ([9a9c188](https://github.com/ecomplus/storefront/commit/9a9c18889a091c40064441e3079a9ed6d8905589))


### Features

* **webpack:** support function to custom config (merge) ([0784ace](https://github.com/ecomplus/storefront/commit/0784acec243fb5507f91f60c91203f44715cb6a0))





# [5.10.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.9.0...@ecomplus/storefront-framework@5.10.0) (2020-04-03)


### Bug Fixes

* **webpack:** fix i18n alias to src of respective lang ([8bd1337](https://github.com/ecomplus/storefront/commit/8bd1337bb27e67d85739cc423da1cd583e782832))


### Features

* **renderer:** add `imageSize` lib to default data ([23e1743](https://github.com/ecomplus/storefront/commit/23e1743631a37d7f6dbfbc6b4d93579162e4442c))





# [5.9.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.8.1...@ecomplus/storefront-framework@5.9.0) (2020-03-28)


### Bug Fixes

* **deps:** update @ecomplus/i18n to ^1.7.0 ([8c2b1c7](https://github.com/ecomplus/storefront/commit/8c2b1c70e1fb131b69e38eb9893a46fc6b2157d5))
* **deps:** update \@ecomplus/utils to v1.3.4 ([5b3b40a](https://github.com/ecomplus/storefront/commit/5b3b40a8f9d0d5154512a2401fff333239aabc1a))
* **deps:** update all non-major dependencies ([#171](https://github.com/ecomplus/storefront/issues/171)) ([d94b3fe](https://github.com/ecomplus/storefront/commit/d94b3fec0726e5d92becd3dd53f3833c77bb03cc))
* **deps:** update to @ecomplus/client v2.0.4 ([48e2ff4](https://github.com/ecomplus/storefront/commit/48e2ff4e3688200cdf598c2eba592c99bb93ff19))
* **webpack:** manifest and sw plugins on production only ([92e1bd9](https://github.com/ecomplus/storefront/commit/92e1bd91ae516a4b49c0faac3d05d263cb5e7055))


### Features

* **renderer:** add ejs include paths for node modules and pages dir ([62ab492](https://github.com/ecomplus/storefront/commit/62ab492ea22faa3acd23118cf99c17dc89e01eda))
* **webpack:** preset alias for @ecomplus/i18n, add raw-loader ([70a95ad](https://github.com/ecomplus/storefront/commit/70a95ad9a140c136f3d5056d8f1be71b8fdc55d4))


### Performance Improvements

* **build:** concurrency build resources routes ([bab4ab6](https://github.com/ecomplus/storefront/commit/bab4ab68fca42ca1fdd7b849f9a2bf654ba053a2))





## [5.8.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.8.0...@ecomplus/storefront-framework@5.8.1) (2020-02-27)


### Bug Fixes

* **build:** fix using mkdirp v1 ([7e3b3c2](https://github.com/ecomplus/storefront/commit/7e3b3c291fc21f615983657fcc96a504e8b8948e))
* **deps:** update dependency mkdirp to v1 ([#157](https://github.com/ecomplus/storefront/issues/157)) ([c1af584](https://github.com/ecomplus/storefront/commit/c1af5842a43b7e146a39cc62d65bd8fc5338f8c8))
* **deps:** update dependency workbox-webpack-plugin to v5 ([#158](https://github.com/ecomplus/storefront/issues/158)) ([e400474](https://github.com/ecomplus/storefront/commit/e400474a6ed2b3efe718a0e5aae7cf276ef9b028))
* **sw:** add some trusted global cdns, fix storage api images regex ([b167983](https://github.com/ecomplus/storefront/commit/b1679830dfe6c81b121d75d74af7cd7c53bff2a6))
* **sw:** add some trusted global cdns, fix storage api images regex ([02736a2](https://github.com/ecomplus/storefront/commit/02736a25e9df77d0ce6a47c9cbd2e6861a4870bc))


### Performance Improvements

* **sw:** fixing sw for new workbox v5 ([69e30f7](https://github.com/ecomplus/storefront/commit/69e30f7f1d3c35b6783c09a2abbab8445e1a0847))





# [5.8.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-framework@5.7.4...@ecomplus/storefront-framework@5.8.0) (2020-02-13)


### Bug Fixes

* **custom-config:** supporting monorepo directory structure ([60559ca](https://github.com/ecomplus/storefront/commit/60559caa937d1d857e36b5b0f53fd93f72214d7e))


### Features

* **webpack:** alias '#components' for storefront-components pkg ([5ce8c61](https://github.com/ecomplus/storefront/commit/5ce8c61834f92d57b1ed713158262435da6b94ab))





## [5.7.4](https://github.com/ecomclub/storefront/compare/@ecomplus/storefront-framework@5.7.3...@ecomplus/storefront-framework@5.7.4) (2020-02-06)

**Note:** Version bump only for package @ecomplus/storefront-framework





## [5.7.3](https://github.com/ecomclub/storefront/compare/@ecomplus/storefront-framework@5.7.2...@ecomplus/storefront-framework@5.7.3) (2020-02-05)

**Note:** Version bump only for package @ecomplus/storefront-framework





## [5.7.2](https://github.com/ecomclub/storefront-framework/compare/@ecomplus/storefront-framework@5.7.1...@ecomplus/storefront-framework@5.7.2) (2020-02-04)


### Performance Improvements

* **webpack:** extract CSS only for SCSS entries (prevent multiple css) ([fbc1b94](https://github.com/ecomclub/storefront-framework/commit/fbc1b94e73cae9044c6e3b9265f2b9ac27d04174))





## [5.7.1](https://github.com/ecomclub/storefront-framework/compare/@ecomplus/storefront-framework@5.7.0...@ecomplus/storefront-framework@5.7.1) (2020-02-04)


### Bug Fixes

* **build:** copy entry files to reference filename (no hash) as fallback ([03184d6](https://github.com/ecomclub/storefront-framework/commit/03184d60df43a61b3a43d6b59321503e7d5e9d72))





# 5.7.0 (2020-02-04)


### Bug Fixes

* **webpack:** add deep node_modules path to scss includes for monorepo ([b03bca4](https://github.com/ecomclub/storefront-framework/commit/b03bca419dcd2e4a31406fdb5d4a2932a189ab24))
* **webpack:** use contenthash for chunks, ignore css order ([54fd9ae](https://github.com/ecomclub/storefront-framework/commit/54fd9ae650fe0d4bb9393ef392ffbf18401707e0))


### Features

* **long-term-cache:** add [contenthash] to default output filename ([5b68c70](https://github.com/ecomclub/storefront-framework/commit/5b68c70c5ac198affaa1c15aa3dd2a2d9da843e3))

# Legacy Change Log

## [2.14.0~5.6.0](/LEGACY_CHANGELOGS/storefront-framework/v2.14.0~v5.6.0.md)
