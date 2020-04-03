# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-next.3](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-template@2.0.0-next.2...@ecomplus/storefront-template@2.0.0-next.3) (2020-04-03)


### Bug Fixes

* **cms:** minor pages config fixes ([ba10470](https://github.com/ecomplus/storefront/commit/ba10470e595b112a4dff2cdce7eea9e03b740009))
* **cms:** removing code in extrapage config ([#192](https://github.com/ecomplus/storefront/issues/192)) ([e0f5bf5](https://github.com/ecomplus/storefront/commit/e0f5bf5c66f61df57eb393c4bdb05e612aa35326))
* **deps:** update @ecomplus/passport-client to v1.0.7 ([b2c624d](https://github.com/ecomplus/storefront/commit/b2c624d1780a6920d8227aa1e0e693630bfd2a92))
* **ejs:** general first fixes for pages and sections ([d536326](https://github.com/ecomplus/storefront/commit/d536326af3f7ab5af5ed5cf27e34a78961f55b2b))
* **ejs:** product card and block predefined places for additional HTML ([cf0f3d5](https://github.com/ecomplus/storefront/commit/cf0f3d552f00c9318ff417d0517e107850f26e62))
* **ejs:** syntax fix on collection shelf section partial ([7ba499c](https://github.com/ecomplus/storefront/commit/7ba499c8943356937428bb4058ac7b0467fcba05))
* **js:** remove product.js entry, import ProductCard on widgets load ([d032bcd](https://github.com/ecomplus/storefront/commit/d032bcd31b2b48b9c9532115fa1c8ff1b12f3123))
* **scss:** pre-importing some component styles ([db0f56c](https://github.com/ecomplus/storefront/commit/db0f56c937384187b5c1eacc7ca70878de43fd1c))
* **styles:** fix some classes and scss with new sections approach ([1d5c706](https://github.com/ecomplus/storefront/commit/1d5c70645346593885051f53ffe77a33eaafc496))


### Code Refactoring

* **pages:** split views on sections, use sections on "all" pages ([3dab231](https://github.com/ecomplus/storefront/commit/3dab2317ded74309117a6c31b18cd4be53c08f91))


### Features

* **cms:** add custom html (with code widget) to sections ([feb03d6](https://github.com/ecomplus/storefront/commit/feb03d6a92ba7e0f3cc339aaedb29ed0e1602fdd))
* **cms:** handling "page builder" with sections for all pages ([2383ffb](https://github.com/ecomplus/storefront/commit/2383ffb07fc1a7415253ecf933cd444e04e66791))
* **cms:** supporting collection shelf items suffle (random) ([9fbe47e](https://github.com/ecomplus/storefront/commit/9fbe47e15822ed6a5a2d9c27eeac6b9c4ecd1d9a))
* **js:** additional entry for product page with TheProduct component ([d1fe978](https://github.com/ecomplus/storefront/commit/d1fe978a93d1ec3b9fc03a0ae3c64a4abf4fd6ad))
* **js:** sync import and set ProductCard globally ([1f9bbe7](https://github.com/ecomplus/storefront/commit/1f9bbe7c077ff8c1cdaa7711e5310297e671d101))


### BREAKING CHANGES

* **pages:** lot of ejs files removed or renamed

https://github.com/ecomplus/storefront/issues/190





# [2.0.0-next.2](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-template@2.0.0-next.1...@ecomplus/storefront-template@2.0.0-next.2) (2020-03-30)

**Note:** Version bump only for package @ecomplus/storefront-template





# [2.0.0-next.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-template@2.0.0-next.0...@ecomplus/storefront-template@2.0.0-next.1) (2020-03-28)


### Bug Fixes

* **cms:** fix handling custom identity provider from config backend ([ed52581](https://github.com/ecomplus/storefront/commit/ed52581f8c0f4576d2fa09bbb86177279db34774))
* **cms:** fix handling custom netlify cms config ([3a7c4f7](https://github.com/ecomplus/storefront/commit/3a7c4f78876484daaa8cf1e74a48f3bbc42b6b2e))
* **cms:** fix home content file path ([e87099b](https://github.com/ecomplus/storefront/commit/e87099bb694bc5dfebb06ffaaf5cc7c75183ea00))
* **cms:** supporting custom base dir for monorepo ([ab5a1ab](https://github.com/ecomplus/storefront/commit/ab5a1abeac96665954e97b05cad3f1ba5a8266fb))
* **deps:** fix pkg deps, update root @ecomplus/i18n to v1.5.0 ([89699e2](https://github.com/ecomplus/storefront/commit/89699e22bcb8ea1fa36e64babcf10f41f4e9805b))
* **deps:** update @ecomplus/i18n to ^1.7.0 ([8c2b1c7](https://github.com/ecomplus/storefront/commit/8c2b1c70e1fb131b69e38eb9893a46fc6b2157d5))
* **deps:** update \@ecomplus/utils to v1.3.4 ([5b3b40a](https://github.com/ecomplus/storefront/commit/5b3b40a8f9d0d5154512a2401fff333239aabc1a))
* **deps:** update all non-major dependencies ([#171](https://github.com/ecomplus/storefront/issues/171)) ([d94b3fe](https://github.com/ecomplus/storefront/commit/d94b3fec0726e5d92becd3dd53f3833c77bb03cc))
* **deps:** update to @ecomplus/client v2.0.4 ([48e2ff4](https://github.com/ecomplus/storefront/commit/48e2ff4e3688200cdf598c2eba592c99bb93ff19))


### Features

* **cms:** fetch custom config from /admin/config.json ([7def520](https://github.com/ecomplus/storefront/commit/7def5203ddac6be31df7dd5f486fef180e465d52))
* **cms:** hacks to support custom identity (selfhosted gotrue) ([82329e2](https://github.com/ecomplus/storefront/commit/82329e21d9ed306ec3faa1d23255426da41588bf))
* **js:** replacing webp img src on safari/ios, use jquery for utils ([4c0203d](https://github.com/ecomplus/storefront/commit/4c0203ddde58740b41882bdeca51e9974e1df8e7))





# [2.0.0-next.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-template@1.34.7...@ecomplus/storefront-template@2.0.0-next.0) (2020-02-27)

**Note:** Version bump only for package @ecomplus/storefront-template





# Legacy Change Log

## [0.0.2~1.34.8](/LEGACY_CHANGELOGS/storefront-template/v0.0.2~v1.34.8.md)
