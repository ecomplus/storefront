# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0-beta.16](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2019-10-17)


### Bug Fixes

* **payment:** ensure container html is updated when amoutn changes ([0c2031a](https://github.com/ecomclub/storefront-app/commit/0c2031a))
* **payment-client:** repeat onload expression when it has container html ([4649d05](https://github.com/ecomclub/storefront-app/commit/4649d05))


### Features

* **payment-clients:** set global _amount object before onload exp ([e397a6b](https://github.com/ecomclub/storefront-app/commit/e397a6b))

## [1.0.0-beta.15](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2019-10-15)


### Bug Fixes

* **account:** logout after fetch customer 401 error ([bd34d3a](https://github.com/ecomclub/storefront-app/commit/bd34d3a))
* **payment-client:** resolve promise after onload expression ([1d49c7b](https://github.com/ecomclub/storefront-app/commit/1d49c7b))
* **payments:** fix handling gateways js clients ([99a08b5](https://github.com/ecomclub/storefront-app/commit/99a08b5))
* **payments:** fix handling js client transaction promise ([b7822c8](https://github.com/ecomclub/storefront-app/commit/b7822c8))

## [1.0.0-beta.14](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2019-10-14)


### Bug Fixes

* **addresses:** start selecting address by zip code (if set) ([ba8baaf](https://github.com/ecomclub/storefront-app/commit/ba8baaf))


### Features

* **lib:** add load payment client script (function) ([079b794](https://github.com/ecomclub/storefront-app/commit/079b794))
* **payments:** preload clients, treat transaction promise ([711e0bb](https://github.com/ecomclub/storefront-app/commit/711e0bb))

## [1.0.0-beta.13](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2019-10-11)


### Features

* **confirmation:** handle new order confirmation with EcOrderInfo ([a753cfb](https://github.com/ecomclub/storefront-app/commit/a753cfb))
* **confirmation:** states and handlers for confirmation view ([61a585f](https://github.com/ecomclub/storefront-app/commit/61a585f))

## [1.0.0-beta.12](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2019-10-09)


### Features

* **confirmation:** add confirmation route, move to it after checkout ([bb7cd96](https://github.com/ecomclub/storefront-app/commit/bb7cd96))
* **order:** setup EcOrderInfo component with order refresh service ([6cc3288](https://github.com/ecomclub/storefront-app/commit/6cc3288))

## [1.0.0-beta.11](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2019-10-09)


### Bug Fixes

* **address:** fixes for addresses list and form ([d9a6dfd](https://github.com/ecomclub/storefront-app/commit/d9a6dfd))
* **checkout:** update checkout emitted event, minor edit styles ([73190cb](https://github.com/ecomclub/storefront-app/commit/73190cb))
* **credit-card:** update emited event, send transaction object as value ([e8348fe](https://github.com/ecomclub/storefront-app/commit/e8348fe))


### Features

* **state:** send checkout to modules api ([841a237](https://github.com/ecomclub/storefront-app/commit/841a237))

## [1.0.0-beta.10](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2019-10-09)


### Features

* **checkout:** setup checkout summary and fix steps mobile view ([e0836d9](https://github.com/ecomclub/storefront-app/commit/e0836d9))

## [1.0.0-beta.9](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2019-10-08)


### Bug Fixes

* **checkout:** fixes for checkout/payment components ([61403d6](https://github.com/ecomclub/storefront-app/commit/61403d6))

## [1.0.0-beta.8](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2019-10-08)


### Bug Fixes

* **addresses:** start emitting select address ([2b3c9ba](https://github.com/ecomclub/storefront-app/commit/2b3c9ba))


### Features

* **credit-card:** finish handling credit card form ([c1b17fd](https://github.com/ecomclub/storefront-app/commit/c1b17fd))

## [1.0.0-beta.7](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2019-10-04)


### Features

* **payment:** fixes for payment list, start credit card form ([c1867e4](https://github.com/ecomclub/storefront-app/commit/c1867e4))
* **payment:** start listing and selecting payment method (EcPayment) ([bc31907](https://github.com/ecomclub/storefront-app/commit/bc31907))

## [1.0.0-beta.6](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2019-10-03)


### Bug Fixes

* **address-form:** set random object id by default ([a122459](https://github.com/ecomclub/storefront-app/commit/a122459))


### Features

* **account:** set only used customer fields, add saveCustomer action ([6bfb2f7](https://github.com/ecomclub/storefront-app/commit/6bfb2f7))
* **checkout:** save customer on data edited ([c16f65b](https://github.com/ecomclub/storefront-app/commit/c16f65b))

## [1.0.0-beta.5](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2019-10-02)


### Bug Fixes

* **account-form:** minor markup fixes ([5745e7f](https://github.com/ecomclub/storefront-app/commit/5745e7f))
* **cart:** edit 'shippingService' event name ([ae62eda](https://github.com/ecomclub/storefront-app/commit/ae62eda))
* **identify:** alert when doc number does not match with email ([7f09cee](https://github.com/ecomclub/storefront-app/commit/7f09cee))
* **identify:** fix handling events and doc number val ([ce157d2](https://github.com/ecomclub/storefront-app/commit/ce157d2))
* **internals:** inputs for zip code and doc number components ([0891d4a](https://github.com/ecomclub/storefront-app/commit/0891d4a))


### Features

* **account-form:** setup EcAccountForm for customer registration ([a00b4f0](https://github.com/ecomclub/storefront-app/commit/a00b4f0))
* **address-form:** setup address form component ([b1a0e42](https://github.com/ecomclub/storefront-app/commit/b1a0e42))
* **addresses:** edit and remove addresses ([f5e3988](https://github.com/ecomclub/storefront-app/commit/f5e3988))
* **app:** page transitions ([d1f005a](https://github.com/ecomclub/storefront-app/commit/d1f005a))

## [1.0.0-beta.4](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2019-09-26)


### Bug Fixes

* **identify:** add customerEmail sync prop and handle login loading ([a917507](https://github.com/ecomclub/storefront-app/commit/a917507))


### Features

* **identify:** handle second login step with doc number ([af0b1a0](https://github.com/ecomclub/storefront-app/commit/af0b1a0))

## [1.0.0-beta.3](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2019-09-25)

## [1.0.0-beta.2](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2019-09-25)


### Bug Fixes

* **identify:** emit login on created if already logged ([7d02e02](https://github.com/ecomclub/storefront-app/commit/7d02e02))


### Features

* **cart-items:** fetch cart items to update data ([88dd7c2](https://github.com/ecomclub/storefront-app/commit/88dd7c2))
* **i18n:** setup dictionary ([f1307b0](https://github.com/ecomclub/storefront-app/commit/f1307b0))
* **identify:** setup EcIdentify component ([00fcfd2](https://github.com/ecomclub/storefront-app/commit/00fcfd2))
* **vuex:** setup checkout module ([cbf77ef](https://github.com/ecomclub/storefront-app/commit/cbf77ef))

## [1.0.0-beta.1](https://github.com/ecomclub/storefront-app/compare/v1.0.0-alpha.6...v1.0.0-beta.1) (2019-09-24)


### Features

* **cart:** finish EcCart component ([dcfda52](https://github.com/ecomclub/storefront-app/commit/dcfda52))
* **cart:** setting up EcCart component ([118713d](https://github.com/ecomclub/storefront-app/commit/118713d))
* **router:** fix app routes ([bc6e32e](https://github.com/ecomclub/storefront-app/commit/bc6e32e))
* **setup:** add loading component and setup vuex store with shop ([5b30648](https://github.com/ecomclub/storefront-app/commit/5b30648))
* **title:** switch page title by route ([8f9afdd](https://github.com/ecomclub/storefront-app/commit/8f9afdd))

## [1.0.0-alpha.6](https://github.com/ecomclub/storefront-app/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2019-09-20)

## [1.0.0-alpha.5](https://github.com/ecomclub/storefront-app/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2019-09-20)

## [1.0.0-alpha.4](https://github.com/ecomclub/storefront-app/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2019-09-20)

## [1.0.0-alpha.3](https://github.com/ecomclub/storefront-app/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2019-09-20)

## [1.0.0-alpha.2](https://github.com/ecomclub/storefront-app/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2019-09-19)

## [1.0.0-alpha.1](https://github.com/ecomclub/storefront-app/compare/v0.15.4...v1.0.0-alpha.1) (2019-09-19)

### [0.15.4](https://github.com/ecomclub/storefront-app/compare/v0.15.3...v0.15.4) (2019-08-01)



### [0.15.3](https://github.com/ecomclub/storefront-app/compare/v0.15.1...v0.15.3) (2019-08-01)


### Bug Fixes

* **credit-card:** notify invalid when can't generate card hash ([d359faf](https://github.com/ecomclub/storefront-app/commit/d359faf))



### [0.15.1](https://github.com/ecomclub/storefront-app/compare/v0.15.0...v0.15.1) (2019-07-17)



## [0.15.0](https://github.com/ecomclub/storefront-app/compare/v0.10.0...v0.15.0) (2019-07-17)


### Bug Fixes

* **checkout:** add transaction to order object before confirmation ([bc8d0c8](https://github.com/ecomclub/storefront-app/commit/bc8d0c8))
* **order:** preseting current order body before load ([a8b2484](https://github.com/ecomclub/storefront-app/commit/a8b2484))
* **transaction:** prevent fatal error with undefined 'orderTransaction' ([36e3731](https://github.com/ecomclub/storefront-app/commit/36e3731))
* fix shipping service element bg colors ([4ce4d7d](https://github.com/ecomclub/storefront-app/commit/4ce4d7d))
* fix tabs nav scroll ([0d0e7e4](https://github.com/ecomclub/storefront-app/commit/0d0e7e4))
* fix tabs nav scroll ([ad9f907](https://github.com/ecomclub/storefront-app/commit/ad9f907))
* resolving lib assets output paths ([9760b16](https://github.com/ecomclub/storefront-app/commit/9760b16))
* try to setup consts (config) with document metadata ([a3e6b3d](https://github.com/ecomclub/storefront-app/commit/a3e6b3d))
* update some scss variables (new el theme chalk version) ([92261f3](https://github.com/ecomclub/storefront-app/commit/92261f3))


### Build System

* handle build to use as lib ([d646b39](https://github.com/ecomclub/storefront-app/commit/d646b39))


### Features

* try to get store ids from env vars ([795413b](https://github.com/ecomclub/storefront-app/commit/795413b))
* try to setup consts (config) with document metadata ([9ee7e48](https://github.com/ecomclub/storefront-app/commit/9ee7e48))
