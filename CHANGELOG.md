# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.3.0](https://github.com/ecomclub/storefront-app/compare/v1.2.0...v1.3.0) (2019-12-12)


### Features

* **update-global:** updating window.storefrontApp on App.vue ([9d37eae](https://github.com/ecomclub/storefront-app/commit/9d37eaea98d42418b67955f6f36931e550919080))

## [1.2.0](https://github.com/ecomclub/storefront-app/compare/v1.1.1...v1.2.0) (2019-12-11)


### Features

* **global:** setting router on window.storefrontApp ([c9340f5](https://github.com/ecomclub/storefront-app/commit/c9340f5f5e2e8d07203cf34ce8def023c08af8e8))

### [1.1.1](https://github.com/ecomclub/storefront-app/compare/v1.1.0...v1.1.1) (2019-12-09)


### Bug Fixes

* **vuex:** ensure amount.total is also fixed to 2 decimal ([a212b26](https://github.com/ecomclub/storefront-app/commit/a212b2658c1d5fb664824f163e983d12d765e384))

## [1.1.0](https://github.com/ecomclub/storefront-app/compare/v1.0.1...v1.1.0) (2019-12-09)


### Features

* **global:** setting up window.storefrontApp for payment clients ([3db4980](https://github.com/ecomclub/storefront-app/commit/3db498047101bf37eea7a01441fa62a5df610a40))


### Bug Fixes

* **amount:** amount getter with fixed money values (2 fixed numbers) ([0fc74e7](https://github.com/ecomclub/storefront-app/commit/0fc74e7456c3a6adcf22b5690976c17cfb10e6ab))

### [1.0.1](https://github.com/ecomclub/storefront-app/compare/v1.0.0...v1.0.1) (2019-12-08)


### Bug Fixes

* **shipping-line:** styles/text changes for shipping line component ([5e0ffc5](https://github.com/ecomclub/storefront-app/commit/5e0ffc555522146d5716a090bdffac56fd59b6c1))

## [1.0.0](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.33...v1.0.0) (2019-12-08)

## [1.0.0-beta.33](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.32...v1.0.0-beta.33) (2019-12-08)


### Features

* **order-info:** show transaction info properly ([0706569](https://github.com/ecomclub/storefront-app/commit/070656916a1ed7156336f857ae23f80fa2c333d4))
* **shipping-line:** setup ShippingLine component with delivery info ([2bdd691](https://github.com/ecomclub/storefront-app/commit/2bdd6916a2e21ba6d847efd7818a6186c99b9bd1))


### Bug Fixes

* **order:** also passing order object id with router param ([e70520c](https://github.com/ecomclub/storefront-app/commit/e70520cf915a535c67071a0c2109145b9a36c259))
* **order:** show order info only after load from passport ([7714e5b](https://github.com/ecomclub/storefront-app/commit/7714e5bd1727679f0afd34d6eb1937e65649e904))
* **orders-list:** auto updating account orders list ([085453b](https://github.com/ecomclub/storefront-app/commit/085453b65ca3a4f2715b5abbf0b7e5518198c346))
* **orders-list:** change open status color to info (blue) ([94dbdde](https://github.com/ecomclub/storefront-app/commit/94dbdde6839e0b05927b22c9a17bf8fc606e2539))
* **orders-list:** clear update interval before destroy ([82a8740](https://github.com/ecomclub/storefront-app/commit/82a8740758fe74a4d8d6b6e6f4235953048cd524))

## [1.0.0-beta.32](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2019-12-06)


### Features

* **discount:** showing icon for confirmed coupon, improve transitions ([602a9a0](https://github.com/ecomclub/storefront-app/commit/602a9a08b8ad4fc206ae1880a950b2d48beb568e))
* **order-info:** add summary to order info ([3716c92](https://github.com/ecomclub/storefront-app/commit/3716c92a1d13fd999437d9260002118b309145ac))
* **summary:** add buyer info to summary component ([01ada5f](https://github.com/ecomclub/storefront-app/commit/01ada5fdbca0f9dd9fa04d7c0cf2f6d999a984cc))
* **summary:** setup separated checkout summary component ([d363585](https://github.com/ecomclub/storefront-app/commit/d3635852ebc97758241b32fd121b812d18998d7e))


### Bug Fixes

* **discount:** fix handling applied coupon bool ([0d28837](https://github.com/ecomclub/storefront-app/commit/0d28837a31db330e24f9417be56821af017329d9))
* **order:** removing broken components, only order info yet ([ad1aa54](https://github.com/ecomclub/storefront-app/commit/ad1aa546c16a4b5647149b43c06fa23c09bcfb9e))

## [1.0.0-beta.31](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2019-12-05)


### Bug Fixes

* **cart:** removed updateAmout mutation (not needed) ([74d4787](https://github.com/ecomclub/storefront-app/commit/74d4787c60bdc862dfea7de0bfe75486f2993e93))
* **vuex:** fix amount object model (add subtotal) ([6e958e4](https://github.com/ecomclub/storefront-app/commit/6e958e445689cbb171703e49cffdafc7b567ab5d))
* **vuex:** fix update discount rule (total value) ([3e43024](https://github.com/ecomclub/storefront-app/commit/3e43024a339cc693779950f3ee0c125194646837))
* **vuex:** fix updating amount after selected payment ([439c716](https://github.com/ecomclub/storefront-app/commit/439c7167246841413035bffce64c7105fff7ca54))
* **vuex:** fixing checkout module (getters) ([3e621a4](https://github.com/ecomclub/storefront-app/commit/3e621a4a61ab90ec97fb284132cc208a7e2c76b1))

## [1.0.0-beta.30](https://github.com/ecomclub/storefront-app/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2019-12-04)


### Features

* **vuex:** storing/handling discount coupon and result rule ([e5febfc](https://github.com/ecomclub/storefront-app/commit/e5febfcd53769477600e101b7fde5e609888ba65))


### Bug Fixes

* **cart:** fix handling discount coupon ([2f8c5cc](https://github.com/ecomclub/storefront-app/commit/2f8c5ccccb78e162192ae79d40f0c34c1752d3e7))
* **cart:** fix used computed names ([91229bd](https://github.com/ecomclub/storefront-app/commit/91229bd4c32db69cf6b56f3383d68047b140da6a))
* **checkout:** fix handling discount coupon ([8a7b1ec](https://github.com/ecomclub/storefront-app/commit/8a7b1ecc4e0c59325fbfe20f1a36e8aa2f000321))
* **checkout:** fix used computed names ([457ea78](https://github.com/ecomclub/storefront-app/commit/457ea7867f468da5845a42de4c045f216787b853))
* **discount:** fix handling apply descount results, update events ([4096a0c](https://github.com/ecomclub/storefront-app/commit/4096a0ce5ea773f0f998a112e8c51be73e010c88))
* **discount:** stop changing amount object directly, emit discount value ([2d6c507](https://github.com/ecomclub/storefront-app/commit/2d6c507a3ecff3d0c8d3d316eecf5732287ce3e5))
* **views:** fix handling discount on cart/checkout with vuex ([585fbb3](https://github.com/ecomclub/storefront-app/commit/585fbb3c923110503ce91ea88ef99c6f73ffbae2))

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
