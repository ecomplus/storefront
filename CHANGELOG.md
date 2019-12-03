# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0-beta.29](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2019-12-03)


### Features

* **checkout:** add discount form (coupon) to checkout component ([ac014c3](https://github.com/ecomclub/storefront-app/commit/ac014c39294018b801005afc07e5f039b8a13af5))
* **discount:** setting up EcDiscount component (coupon, apply discount) ([29785fb](https://github.com/ecomclub/storefront-app/commit/29785fbda0161ac26ae1189b7470cfaeb13608df))


### Bug Fixes

* **cart:** recieve and update entire amount object ([58f96a4](https://github.com/ecomclub/storefront-app/commit/58f96a4057d9cb2db16eb8795c0b32492a6bb445))
* **checkout:** recieve and update entire amount object ([8e0b489](https://github.com/ecomclub/storefront-app/commit/8e0b48900fc8874a1e471b9b1173ba4eefbd5979))
* **discounts:** add feedback alert/toast ([2666ba9](https://github.com/ecomclub/storefront-app/commit/2666ba957e3522333a23734f22bd9c4902e273ea))
* **discounts:** fix emited amount object (update) ([77a979b](https://github.com/ecomclub/storefront-app/commit/77a979b5dc1626fe74459919ef23f414b7c42bde))
* **discounts:** importing all used words from i18n ([514ec6c](https://github.com/ecomclub/storefront-app/commit/514ec6c93bde98cff15d59301a9363f08419ff8f))

## [1.0.0-beta.28](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2019-12-02)

## [1.0.0-beta.27](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2019-12-02)


### Bug Fixes

* **shopping-cart:** update using ecomCart v1 ([a571bbb](https://github.com/ecomclub/storefront-app/commit/a571bbb06b81efc89fa5400dc821abf535cf8c14))

## [1.0.0-beta.26](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.25...v1.0.0-beta.26) (2019-11-26)


### Bug Fixes

* **address-form:** enable street and borough fields when empty ([29ff4b1](https://github.com/ecomclub/storefront-app/commit/29ff4b1e15bdf0e445c67c525c189a2d66930875))
* **cart-subtotal:** fix updating vuex amount on cart view ([2b2dbe8](https://github.com/ecomclub/storefront-app/commit/2b2dbe8f083770c10613b868e7f870b062ba5515))
* **transitions:** fix declaring transitions on App.vue for routes ([d274d34](https://github.com/ecomclub/storefront-app/commit/d274d349803ddae3f7b3497cc10ff2c4d5ad0b50))

## [1.0.0-beta.25](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.24...v1.0.0-beta.25) (2019-11-14)


### Bug Fixes

* **account-form:** display name fixed on form submit ([062e5b0](https://github.com/ecomclub/storefront-app/commit/062e5b0))

## [1.0.0-beta.24](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.23...v1.0.0-beta.24) (2019-11-14)


### Bug Fixes

* **account-form:** set customer display name with given name if not set ([409ea63](https://github.com/ecomclub/storefront-app/commit/409ea63))

## [1.0.0-beta.23](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.22...v1.0.0-beta.23) (2019-11-14)


### Bug Fixes

* **confirmation:** update order state on confirmation view (setOrders) ([f34be46](https://github.com/ecomclub/storefront-app/commit/f34be46))
* **order-info:** fix mergin fetched order data to local order ([e523c59](https://github.com/ecomclub/storefront-app/commit/e523c59))
* **order-info:** remove saveCustomerOrder (should be done by checkout ?) ([ceab91b](https://github.com/ecomclub/storefront-app/commit/ceab91b))


### Features

* **order-info:** save/update order on customer api document ([e20c4fe](https://github.com/ecomclub/storefront-app/commit/e20c4fe))

## [1.0.0-beta.22](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.21...v1.0.0-beta.22) (2019-11-13)


### Bug Fixes

* **confirmation:** update order state on confirmation view ([f0f258c](https://github.com/ecomclub/storefront-app/commit/f0f258c))

## [1.0.0-beta.21](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.20...v1.0.0-beta.21) (2019-11-05)


### Bug Fixes

* **account:** do not accept guest login on account component ([e20db01](https://github.com/ecomclub/storefront-app/commit/e20db01))
* **account:** ecomPassport is required and must be preseted ([3b963a8](https://github.com/ecomclub/storefront-app/commit/3b963a8))
* **account:** handle show orders following route param ([f533af3](https://github.com/ecomclub/storefront-app/commit/f533af3))
* **account:** handle show orders following route param (js) ([78e0441](https://github.com/ecomclub/storefront-app/commit/78e0441))
* **account:** preset ecomPassport and pass as prop ([7eb5b24](https://github.com/ecomclub/storefront-app/commit/7eb5b24))
* **account:** show loading spinner while updating customer ([6359a8a](https://github.com/ecomclub/storefront-app/commit/6359a8a))
* **account-form:** watch customer prop to update local customer ([9bee4a8](https://github.com/ecomclub/storefront-app/commit/9bee4a8))
* **addresses:** unset new addresses when list is loaded (reactive) ([dab7074](https://github.com/ecomclub/storefront-app/commit/dab7074))
* **i18n:** update dictionary, convention fixes ([d83c80f](https://github.com/ecomclub/storefront-app/commit/d83c80f))
* **order-info:** fix handling orderBody/localOrder ([f5c115f](https://github.com/ecomclub/storefront-app/commit/f5c115f))
* **orders-list:** stop using route from component (be context less) ([d318d12](https://github.com/ecomclub/storefront-app/commit/d318d12))
* **orders-list:** stop using vue router on component src ([225df3f](https://github.com/ecomclub/storefront-app/commit/225df3f))
* **routes:** loading specific view for orders ([718c287](https://github.com/ecomclub/storefront-app/commit/718c287))


### Features

* **account:** add and sync showOrders prop on account component ([790f921](https://github.com/ecomclub/storefront-app/commit/790f921))
* **account:** emit viewOrder event (from orders list) ([afce312](https://github.com/ecomclub/storefront-app/commit/afce312))
* **account:** handle viewOrders event and push route ([bfd1246](https://github.com/ecomclub/storefront-app/commit/bfd1246))
* **account:** setup EcAccount component and /account route ([#35](https://github.com/ecomclub/storefront-app/issues/35)) ([367cb4e](https://github.com/ecomclub/storefront-app/commit/367cb4e))
* **identify:** add 'acceptGuest' prop to prevent guest login ([2f24621](https://github.com/ecomclub/storefront-app/commit/2f24621))
* **order:** functional order component ([e29138e](https://github.com/ecomclub/storefront-app/commit/e29138e))
* **order:** setup specific order view ([0e7c34c](https://github.com/ecomclub/storefront-app/commit/0e7c34c))
* **order-info:** minor edit, add link to account orders ([01c2a49](https://github.com/ecomclub/storefront-app/commit/01c2a49))
* **orders-list:** basic functional orders list component ([381975f](https://github.com/ecomclub/storefront-app/commit/381975f))

## [1.0.0-beta.20](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.19...v1.0.0-beta.20) (2019-10-22)


### Bug Fixes

* **payments:** handle js client transaction promise reject ([ad9edbd](https://github.com/ecomclub/storefront-app/commit/ad9edbd))

## [1.0.0-beta.19](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.18...v1.0.0-beta.19) (2019-10-22)


### Bug Fixes

* **input-phone:** import br format with named import (fix include err) ([8932e2a](https://github.com/ecomclub/storefront-app/commit/8932e2a))
* **list-payments:** remove empty customer props (prevent 400 error) ([5b3be13](https://github.com/ecomclub/storefront-app/commit/5b3be13))


### Features

* **payment-client:** explose _checkout with amount, items and customer ([f55a5ef](https://github.com/ecomclub/storefront-app/commit/f55a5ef))

## [1.0.0-beta.18](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.17...v1.0.0-beta.18) (2019-10-17)


### Bug Fixes

* **input-phone:** import br format on main ([57fd25a](https://github.com/ecomclub/storefront-app/commit/57fd25a))

## [1.0.0-beta.17](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2019-10-17)


### Bug Fixes

* **input-phone:** import br format before cleave component ([c1cbd12](https://github.com/ecomclub/storefront-app/commit/c1cbd12))

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
