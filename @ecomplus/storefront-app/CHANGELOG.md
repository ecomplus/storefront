# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.215](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.214...@ecomplus/storefront-app@2.0.0-beta.215) (2025-02-12)

### Bug Fixes

- **components/discount-applier:** rounding amount values on apply discount request ([146c19f](https://github.com/ecomplus/storefront/commit/146c19f25c319806da77a3245baa365cc52ed65c))

# [2.0.0-beta.214](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.213...@ecomplus/storefront-app@2.0.0-beta.214) (2025-02-11)

### Bug Fixes

- **app/checkout:** round discount by payment gateway before applying ([00798a4](https://github.com/ecomplus/storefront/commit/00798a4e8ddfc73927f5ec38601cdac315e1e0e6))

### Features

- **app/checkout:** handling new prop `canPayAllInPoints` on checkout component ([2bbaf5b](https://github.com/ecomplus/storefront/commit/2bbaf5bf176232e36eb9ecb154c04a6edd2f6ba1))

# [2.0.0-beta.213](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.212...@ecomplus/storefront-app@2.0.0-beta.213) (2025-01-25)

### Bug Fixes

- **app/credit-card:** minor fix limiting holder name maxlength ([1d103cb](https://github.com/ecomplus/storefront/commit/1d103cb1165228e01b538a4860599e75f7d0a55b))

### Features

- **app/account:** start saving customer `group` and sending to checkout ([8fd21b4](https://github.com/ecomplus/storefront/commit/8fd21b4dbe4f021b2f0b8603461d703a357401cb))

# [2.0.0-beta.212](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.211...@ecomplus/storefront-app@2.0.0-beta.212) (2024-12-19)

### Bug Fixes

- **app/account:** delay 1s to redirect to external auth when unauthorizated ([bb3525a](https://github.com/ecomplus/storefront/commit/bb3525a5da5a6f276becb41dd4723a8005421284))
- **app/credit-card:** accept card holder name with frist word less than 3 chars ([c7f1db6](https://github.com/ecomplus/storefront/commit/c7f1db62a33c6dd47614bcf51d508e026e68cce1))

# [2.0.0-beta.211](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.210...@ecomplus/storefront-app@2.0.0-beta.211) (2024-11-29)

### Bug Fixes

- **app/order-info:** properly redirect to account page on "my account" summary button click ([176ba53](https://github.com/ecomplus/storefront/commit/176ba532e05905626e7aee318d64d05a18afd363))

# [2.0.0-beta.210](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.209...@ecomplus/storefront-app@2.0.0-beta.210) (2024-11-23)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.209](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.208...@ecomplus/storefront-app@2.0.0-beta.209) (2024-10-09)

### Bug Fixes

- **deps:** update `@ecomplus/client` to v2.4.0 ([55a6573](https://github.com/ecomplus/storefront/commit/55a657367540a2ae1c5867fd21d77fef0a097709))

### Features

- **app/cart:** handle optional url param `?cart_reset` together with `&cart_items` to replace cart ([f619947](https://github.com/ecomplus/storefront/commit/f619947520e186ff76ff556ef353482b436cb7c5))

# [2.0.0-beta.208](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.207...@ecomplus/storefront-app@2.0.0-beta.208) (2024-09-06)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.207](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.206...@ecomplus/storefront-app@2.0.0-beta.207) (2024-08-22)

### Bug Fixes

- **app/checkout:** passing selected payment gateway to discount applier on checkout ([8a00c11](https://github.com/ecomplus/storefront/commit/8a00c117c7f322d9c8ad308b573351568bd466f6))

# [2.0.0-beta.206](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.205...@ecomplus/storefront-app@2.0.0-beta.206) (2024-08-15)

### Reverts

- reverting bad commited wrong imports ([0f7c562](https://github.com/ecomplus/storefront/commit/0f7c562eb11a6a6cca05ac451a89cec7a2c3beaf))

# [2.0.0-beta.205](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.204...@ecomplus/storefront-app@2.0.0-beta.205) (2024-05-31)

### Bug Fixes

- **app/checkout:** show custom error message on card invalidation if returned by card hash rejection ([60fbe94](https://github.com/ecomplus/storefront/commit/60fbe94326e8fc43531d82c610e3f169bdff171e))

# [2.0.0-beta.204](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.203...@ecomplus/storefront-app@2.0.0-beta.204) (2024-05-30)

### Bug Fixes

- **app/checkout:** minor improving checkout secondary buttons ([1a55ea8](https://github.com/ecomplus/storefront/commit/1a55ea80ce156a65f0acc0749657137c266fcd1c))

# [2.0.0-beta.203](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.202...@ecomplus/storefront-app@2.0.0-beta.203) (2024-05-07)

### Bug Fixes

- **app/checkout:** prefer oauth-only signin even with external auth ([1af0789](https://github.com/ecomplus/storefront/commit/1af0789670ce9367217440cd74571870fffdaff1))

# [2.0.0-beta.202](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.201...@ecomplus/storefront-app@2.0.0-beta.202) (2024-05-02)

### Bug Fixes

- **app/checkout:** properly handle external auth sign in global functions ([62d2c1d](https://github.com/ecomplus/storefront/commit/62d2c1db81ccf58cda2145236bc715248698f192))

# [2.0.0-beta.201](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.200...@ecomplus/storefront-app@2.0.0-beta.201) (2024-05-02)

### Bug Fixes

- **app/checkout:** improving link to external auth with already set email ([b28fa04](https://github.com/ecomplus/storefront/commit/b28fa04a42d57c3f577c46837119762bae0910e7))

# [2.0.0-beta.200](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.199...@ecomplus/storefront-app@2.0.0-beta.200) (2024-04-25)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.199](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.198...@ecomplus/storefront-app@2.0.0-beta.199) (2024-04-16)

### Bug Fixes

- **app/account:** early redirect to external auth when unauthorized on account view ([7bae9b4](https://github.com/ecomplus/storefront/commit/7bae9b41b7a376ce7fa9d882fb2fd99a1640e351))

# [2.0.0-beta.198](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.197...@ecomplus/storefront-app@2.0.0-beta.198) (2024-04-10)

### Bug Fixes

- **app/checkout:** link external login when proper hash to directly return to checkout ([571fef3](https://github.com/ecomplus/storefront/commit/571fef3b62fb09a7a163257a36800cbd233daa15))

# [2.0.0-beta.197](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.196...@ecomplus/storefront-app@2.0.0-beta.197) (2024-03-28)

### Bug Fixes

- **app/summary:** better rendering masked customer phone number (level 1 sign in for v2) ([db66211](https://github.com/ecomplus/storefront/commit/db662110e46e8b128e2ef4663dc48a72da35f10d))

# [2.0.0-beta.196](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.195...@ecomplus/storefront-app@2.0.0-beta.196) (2024-03-27)

### Bug Fixes

- **app/checkout:** try to set account state without additional API request with unauthorized session ([df97dec](https://github.com/ecomplus/storefront/commit/df97dec61fa16115297bd1b7af2420c70cd07db9))

# [2.0.0-beta.195](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.194...@ecomplus/storefront-app@2.0.0-beta.195) (2024-03-23)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.194](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.193...@ecomplus/storefront-app@2.0.0-beta.194) (2024-03-23)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.193](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.192...@ecomplus/storefront-app@2.0.0-beta.193) (2024-03-23)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.192](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.191...@ecomplus/storefront-app@2.0.0-beta.192) (2024-03-22)

### Bug Fixes

- **deps:** update `@ecomplus/client` to v2.3.1 ([97fd92d](https://github.com/ecomplus/storefront/commit/97fd92d466fa380785fb1e78729bb4b4f0734b87))

# [2.0.0-beta.191](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.190...@ecomplus/storefront-app@2.0.0-beta.191) (2024-03-21)

### Bug Fixes

- **app/checkout:** addapting checkout for address/account with hudden fields ([ac4ebcd](https://github.com/ecomplus/storefront/commit/ac4ebcd483b1b1432c2d7b48625e7e62f9e64717))
- **app/checkout:** better handling external auth login block for level 1 (hidden fields) doc login ([0257206](https://github.com/ecomplus/storefront/commit/0257206eddac547c445c0a7905a6c7bb61bd1b68))

# [2.0.0-beta.190](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.189...@ecomplus/storefront-app@2.0.0-beta.190) (2023-11-29)

### Bug Fixes

- **deps:** update all non-major dependencies ([#974](https://github.com/ecomplus/storefront/issues/974)) ([bd92f9e](https://github.com/ecomplus/storefront/commit/bd92f9e9494827dc428d7e86bed2c59614947dab))

### Features

- **app/checkout:** saving order affiliate code from customer referral ([#969](https://github.com/ecomplus/storefront/issues/969)) ([4c35054](https://github.com/ecomplus/storefront/commit/4c350544113405f068d6539d2cdd74fd77eb9e89))

# [2.0.0-beta.189](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.188...@ecomplus/storefront-app@2.0.0-beta.189) (2023-11-17)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.188](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.187...@ecomplus/storefront-app@2.0.0-beta.188) (2023-11-07)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.187](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.186...@ecomplus/storefront-app@2.0.0-beta.187) (2023-11-06)

### Bug Fixes

- **app/checkout:** accept lp checkout without forced guest checkout ([75e69ae](https://github.com/ecomplus/storefront/commit/75e69ae0df393f25e5799d8fc09fe2d587965be7))
- **deps:** update `@ecomplus/passport-client` to v1.2.1 ([23181c8](https://github.com/ecomplus/storefront/commit/23181c85c136e9dd8d54add7cf43186f6811dab2))

# [2.0.0-beta.186](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.185...@ecomplus/storefront-app@2.0.0-beta.186) (2023-11-02)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.185](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.184...@ecomplus/storefront-app@2.0.0-beta.185) (2023-11-02)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.184](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.183...@ecomplus/storefront-app@2.0.0-beta.184) (2023-10-09)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.183](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.182...@ecomplus/storefront-app@2.0.0-beta.183) (2023-09-21)

### Features

- **app/checkout:** update <CreditCardForm> with new opt prop `isPayerDocRequired` ([f62d234](https://github.com/ecomplus/storefront/commit/f62d234c131566c3467b6bb2f31082d97d302988))

# [2.0.0-beta.182](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.181...@ecomplus/storefront-app@2.0.0-beta.182) (2023-09-06)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.181](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.180...@ecomplus/storefront-app@2.0.0-beta.181) (2023-08-24)

### Bug Fixes

- **app/checkout:** prevent saving uncompleted on confirmation route ([#943](https://github.com/ecomplus/storefront/issues/943)) ([d88825c](https://github.com/ecomplus/storefront/commit/d88825c921c1e8c97cc3085bb66a28d3c0ffc8c3))

# [2.0.0-beta.180](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.179...@ecomplus/storefront-app@2.0.0-beta.180) (2023-07-21)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.179](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.178...@ecomplus/storefront-app@2.0.0-beta.179) (2023-06-15)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.178](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.177...@ecomplus/storefront-app@2.0.0-beta.178) (2023-06-02)

### Bug Fixes

- **app/checkout:** send corporate name as transaction buyer fullname with juridical registry ([ae505b7](https://github.com/ecomplus/storefront/commit/ae505b7f9f186eb247cb2d1e238b6d41f468234a))

# [2.0.0-beta.177](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.176...@ecomplus/storefront-app@2.0.0-beta.177) (2023-05-31)

### Bug Fixes

- **app/account:** ensure patch customer fields set `false` ([8658a2f](https://github.com/ecomplus/storefront/commit/8658a2f814e474f25071f26b1d058f6be0f0096f))
- **app/order-info:** fixing payment expiration markup and styles ([e509c08](https://github.com/ecomplus/storefront/commit/e509c087a408de8b36b20fe436a75ccbb676a9d9))
- **app/summary:** prevent render error with undefined buyer name ([8693ab6](https://github.com/ecomplus/storefront/commit/8693ab6b193c91ea623f4841d65e5fd31afa3e22))

# [2.0.0-beta.176](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.175...@ecomplus/storefront-app@2.0.0-beta.176) (2023-05-20)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.175](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.174...@ecomplus/storefront-app@2.0.0-beta.175) (2023-05-16)

### Bug Fixes

- **app/order-info:** ensure buyer data shown on summary ([ede66de](https://github.com/ecomplus/storefront/commit/ede66de4b48fa3bbee1d187789875da2ab556df6))

# [2.0.0-beta.174](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.173...@ecomplus/storefront-app@2.0.0-beta.174) (2023-05-12)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.173](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.172...@ecomplus/storefront-app@2.0.0-beta.173) (2023-05-10)

### Features

- **app/order-info:** showing payment valid thru timer ([#900](https://github.com/ecomplus/storefront/issues/900)) ([d1d944c](https://github.com/ecomplus/storefront/commit/d1d944c3d81493541cc26037c7a1caf1c2c6466f))

# [2.0.0-beta.172](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.171...@ecomplus/storefront-app@2.0.0-beta.172) (2023-05-03)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.171](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.170...@ecomplus/storefront-app@2.0.0-beta.171) (2023-04-24)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.170](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.169...@ecomplus/storefront-app@2.0.0-beta.170) (2023-04-22)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.169](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.168...@ecomplus/storefront-app@2.0.0-beta.169) (2023-04-20)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.168](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.167...@ecomplus/storefront-app@2.0.0-beta.168) (2023-04-17)

### Features

- **app/checkout:** send customer `referral` to checkout if set on session ([3c4d3b6](https://github.com/ecomplus/storefront/commit/3c4d3b683c9d7f6bc47f920fc46bbdedf4d772af))

# [2.0.0-beta.167](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.166...@ecomplus/storefront-app@2.0.0-beta.167) (2023-04-11)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.166](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.165...@ecomplus/storefront-app@2.0.0-beta.166) (2023-04-11)

### Bug Fixes

- **app/checkout:** alert shipping error on checkout and update/filter service options ([1febe68](https://github.com/ecomplus/storefront/commit/1febe6897fa3c5fcd9647efd2f884612cb4918a5))

# [2.0.0-beta.165](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.164...@ecomplus/storefront-app@2.0.0-beta.165) (2023-03-24)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.164](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.163...@ecomplus/storefront-app@2.0.0-beta.164) (2023-03-07)

### Bug Fixes

- **app/checkout:** limit poits applier to half of amount total ([405309e](https://github.com/ecomplus/storefront/commit/405309e8d3a5ea4d6cf23e1967862337b64c6e4a))
- **app/order-info:** get correct financial status from payments history on many transactions ([941c5d8](https://github.com/ecomplus/storefront/commit/941c5d86ca2a7bbd8d1d75d1460a335d080d4ba3))

# [2.0.0-beta.163](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.162...@ecomplus/storefront-app@2.0.0-beta.163) (2023-02-23)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.162](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.161...@ecomplus/storefront-app@2.0.0-beta.162) (2023-02-09)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.161](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.160...@ecomplus/storefront-app@2.0.0-beta.161) (2023-02-04)

### Bug Fixes

- **app/order-info:** fix status entries order with different timezones ([4cb254a](https://github.com/ecomplus/storefront/commit/4cb254a995def7ac7176f2580da91c9828dffdf8))

### Features

- **app/order-info:** show invoice link when available ([#863](https://github.com/ecomplus/storefront/issues/863)) ([a5e4dc7](https://github.com/ecomplus/storefront/commit/a5e4dc7af4dde1fabe216e1c1fbd9256b17e5840))

# [2.0.0-beta.160](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.159...@ecomplus/storefront-app@2.0.0-beta.160) (2023-01-25)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.159](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.158...@ecomplus/storefront-app@2.0.0-beta.159) (2023-01-20)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.158](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.157...@ecomplus/storefront-app@2.0.0-beta.158) (2023-01-09)

### Bug Fixes

- **deps:** bump @ecomplus/passport-client and @ecomplus/shopping-cart ([3b60f09](https://github.com/ecomplus/storefront/commit/3b60f098f3fef0621fd045afea47ded663c69967))

# [2.0.0-beta.157](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.156...@ecomplus/storefront-app@2.0.0-beta.157) (2022-12-30)

### Features

- **app/checkout:** set `step` on url hash as router param for analytics tracking ([56c3270](https://github.com/ecomplus/storefront/commit/56c32700eee7c791537e92dff82855d15341f209))

# [2.0.0-beta.156](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.155...@ecomplus/storefront-app@2.0.0-beta.156) (2022-12-29)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.155](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.154...@ecomplus/storefront-app@2.0.0-beta.155) (2022-12-08)

### Bug Fixes

- **app/credit-card-form:** also accept (parse) date on format "mmYYYY" ([7e830aa](https://github.com/ecomplus/storefront/commit/7e830aa3ae823bc0ab0cbfde4655d30c584a5e19))

# [2.0.0-beta.154](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.153...@ecomplus/storefront-app@2.0.0-beta.154) (2022-12-07)

### Bug Fixes

- **app/credit-card-form:** fix input cursor when changing to formatted fields ([d0ee582](https://github.com/ecomplus/storefront/commit/d0ee582c3d4acb15e10f279de7e3bec4ddb4c88a))

# [2.0.0-beta.153](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.152...@ecomplus/storefront-app@2.0.0-beta.153) (2022-12-07)

### Bug Fixes

- **app/credit-card-form:** start card bin as normal input to prevent autocomplete errors ([3e89f9c](https://github.com/ecomplus/storefront/commit/3e89f9c10611ad0146d39c38686a4035a41c26bd))

# [2.0.0-beta.152](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.151...@ecomplus/storefront-app@2.0.0-beta.152) (2022-12-07)

### Bug Fixes

- **app/credit-card-form:** start exp as normal input to prevent autocomplete errors (duplicate) ([6b0ff3c](https://github.com/ecomplus/storefront/commit/6b0ff3c20efd96e33f43adeabd4d3c87147e39d3))

# [2.0.0-beta.151](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.150...@ecomplus/storefront-app@2.0.0-beta.151) (2022-12-07)

### Bug Fixes

- **app/credit-card-form:** start exp field as normal input to prevent autocomplete errors ([072e2e6](https://github.com/ecomplus/storefront/commit/072e2e6db82e41dac67ffde01fd010c1cee69b1c))

# [2.0.0-beta.150](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.149...@ecomplus/storefront-app@2.0.0-beta.150) (2022-12-06)

### Bug Fixes

- **app/credit-card-form:** prevent resenting `this.card.bin` data with same value ([27c0856](https://github.com/ecomplus/storefront/commit/27c08564eedc80e2f4de9f63e2371e0b7213787f))
- **app/order-info:** hide cancel button on new orders by default ([b574254](https://github.com/ecomplus/storefront/commit/b574254cfa97aef09f16413576beeb22be311068))

# [2.0.0-beta.149](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.148...@ecomplus/storefront-app@2.0.0-beta.149) (2022-12-05)

### Bug Fixes

- **app/credit-card-form:** add delay to load installments function ([3a7ce05](https://github.com/ecomplus/storefront/commit/3a7ce057c756b3a29e03cba17d7f0af7d3c4e6f8))

# [2.0.0-beta.148](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.147...@ecomplus/storefront-app@2.0.0-beta.148) (2022-12-02)

### Bug Fixes

- **app/orders-list:** better describing active/inactive subscription orders ([f14cb29](https://github.com/ecomplus/storefront/commit/f14cb2995103b78449174ebf2c9ffb7faf3e75ec))

### Features

- **app/order-info:** custom actions (btn) for recurrent order unsubscribe ([5b69790](https://github.com/ecomplus/storefront/commit/5b69790c11170422123d26dd8fc413bfa15a236f))

# [2.0.0-beta.147](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.146...@ecomplus/storefront-app@2.0.0-beta.147) (2022-11-10)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.146](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.145...@ecomplus/storefront-app@2.0.0-beta.146) (2022-11-04)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.145](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.144...@ecomplus/storefront-app@2.0.0-beta.145) (2022-11-01)

### Bug Fixes

- **app/credit-card-form:** try to fix gpay autocomplete loop with delay ([b3bd610](https://github.com/ecomplus/storefront/commit/b3bd610b4828f53bd0a651e2143b9688a7cb2fae))
- **app/payment-methods:** group recurrence payment with credit card only ([766ddf4](https://github.com/ecomplus/storefront/commit/766ddf4df2c8bfd6cd9a3bfcc132b6882f8aca56))
- **components/payment-methos:** pass item currency on list payments ([#802](https://github.com/ecomplus/storefront/issues/802)) ([37e9f2a](https://github.com/ecomplus/storefront/commit/37e9f2a0c981cbbf9d4fac38a883bd8fdbaa08cd))
- **deps:** update @ecomplus/shopping-cart to v2.5.8 ([e86a2b0](https://github.com/ecomplus/storefront/commit/e86a2b0259adbba56a1b7fc75099d7afcf5b9490))

### Features

- **app/checkout:** grouping recurrent payment gateway options [[#767](https://github.com/ecomplus/storefront/issues/767)] ([ad5681c](https://github.com/ecomplus/storefront/commit/ad5681c87f295750af2dafa5577f55df1187ef51))

# [2.0.0-beta.144](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.143...@ecomplus/storefront-app@2.0.0-beta.144) (2022-10-25)

### Bug Fixes

- **app/confirmation:** reset local customer object loyalty points afetr points checkout ([2b0ee42](https://github.com/ecomplus/storefront/commit/2b0ee42b7f678539d868bdbf9a919948f319d21c))
- **deps:** update all non-major dependencies ([#763](https://github.com/ecomplus/storefront/issues/763)) ([8d2d68d](https://github.com/ecomplus/storefront/commit/8d2d68de44c2323ec6e542333346b29cd1238ea9))

# [2.0.0-beta.143](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.142...@ecomplus/storefront-app@2.0.0-beta.143) (2022-09-15)

### Bug Fixes

- **app/checkout:** ensure update zip and calculate shipping runs after address change ([#784](https://github.com/ecomplus/storefront/issues/784)) ([ef4840c](https://github.com/ecomplus/storefront/commit/ef4840c0a54a6dc19586dc0410cf802b61dafec9))

# [2.0.0-beta.142](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.141...@ecomplus/storefront-app@2.0.0-beta.142) (2022-09-01)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.141](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.140...@ecomplus/storefront-app@2.0.0-beta.141) (2022-08-26)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.140](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.139...@ecomplus/storefront-app@2.0.0-beta.140) (2022-08-17)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.139](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.138...@ecomplus/storefront-app@2.0.0-beta.139) (2022-08-04)

### Bug Fixes

- **deps:** update @ecomplus/shopping-cart to v2.5.7 ([b60fb00](https://github.com/ecomplus/storefront/commit/b60fb00e2408864d40f3c46d861eaa0c6080496e))

# [2.0.0-beta.138](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.137...@ecomplus/storefront-app@2.0.0-beta.138) (2022-07-28)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.137](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.136...@ecomplus/storefront-app@2.0.0-beta.137) (2022-07-26)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.136](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.135...@ecomplus/storefront-app@2.0.0-beta.136) (2022-07-16)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.135](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.134...@ecomplus/storefront-app@2.0.0-beta.135) (2022-07-06)

### Bug Fixes

- **deps:** revert vue to 2.6.x ([555d642](https://github.com/ecomplus/storefront/commit/555d6421e977b2263bb446dba389a2ec20677594))

# [2.0.0-beta.134](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.133...@ecomplus/storefront-app@2.0.0-beta.134) (2022-07-04)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.133](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.132...@ecomplus/storefront-app@2.0.0-beta.133) (2022-06-03)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.132](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.131...@ecomplus/storefront-app@2.0.0-beta.132) (2022-05-25)

### Features

- **app/ec-summary:** show order amout balance if any ([7b9d4b8](https://github.com/ecomplus/storefront/commit/7b9d4b84f6d816b4cd46316c34c72e4ee77dd224))

# [2.0.0-beta.131](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.130...@ecomplus/storefront-app@2.0.0-beta.131) (2022-05-18)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.130](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.129...@ecomplus/storefront-app@2.0.0-beta.130) (2022-05-17)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.129](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.128...@ecomplus/storefront-app@2.0.0-beta.129) (2022-05-14)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.128](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.127...@ecomplus/storefront-app@2.0.0-beta.128) (2022-05-11)

### Bug Fixes

- **app/checkout:** should not overwrite variation quantity when zero ([4b69bb3](https://github.com/ecomplus/storefront/commit/4b69bb3bc5aa562a8bacb290d244d1e72762e306))

# [2.0.0-beta.127](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.126...@ecomplus/storefront-app@2.0.0-beta.127) (2022-05-06)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.126](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.125...@ecomplus/storefront-app@2.0.0-beta.126) (2022-04-21)

### Features

- **app/orders-list:** add pagination to account orders ([#683](https://github.com/ecomplus/storefront/issues/683)) ([38a40e4](https://github.com/ecomplus/storefront/commit/38a40e4025840e16737ecf2e82dcef5432d42d88))

### Performance Improvements

- **app/orders-list:** must re-use `APagination` from components lib ([c5d6cf6](https://github.com/ecomplus/storefront/commit/c5d6cf6cb9976a55965edf9c8cd884aade17d517))

# [2.0.0-beta.125](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.124...@ecomplus/storefront-app@2.0.0-beta.125) (2022-04-01)

### Bug Fixes

- **app/checkout:** double check items flags to prevent duplication errors ([bca57d9](https://github.com/ecomplus/storefront/commit/bca57d9fe5f22e1877816e2b2f33670df97ec281))
- **app/components:** remove useless console log from EcOrdersList component ([adf5152](https://github.com/ecomplus/storefront/commit/adf515233401ee227c04dcfcc892ad76b2994e37))
- **app/components:** pass query to ecOrdersList filter api request results ([666f9eb](https://github.com/ecomplus/storefront/commit/666f9eb974cd4225aa0f71c3ba2fee416a001c92))
- **deps:** update @ecomplus/shopping-cart to v2.5.6 and @ecomplus/i18n to v1.29.0 ([2c111ea](https://github.com/ecomplus/storefront/commit/2c111ea49757044cb54393bd331e616edda5169f))
- minor fixes ([70b43e3](https://github.com/ecomplus/storefront/commit/70b43e377bf52065589caa12a20076e4da3d98d9))
- rename subscriptions slot ([b149b52](https://github.com/ecomplus/storefront/commit/b149b52a0059e75ee5f2796eecc0753477fa4359))

### Features

- **account:** add tab o account to show recurrent orders ([2aeca12](https://github.com/ecomplus/storefront/commit/2aeca121eb538c991282bebd412bcb1726b8f233))
- **app/components:** new slot for recurrent orders on Account ([ad36760](https://github.com/ecomplus/storefront/commit/ad3676050428d6148110526769b22763d4c7d458))

# [2.0.0-beta.124](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.123...@ecomplus/storefront-app@2.0.0-beta.124) (2022-03-05)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.123](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.122...@ecomplus/storefront-app@2.0.0-beta.123) (2022-02-16)

### Bug Fixes

- **app/account:** prevent repeated route (same param) push ([4aeec10](https://github.com/ecomplus/storefront/commit/4aeec1085a20ea52e1838a154ea73e2653aba03b))

### Features

- **components/account:** add tab on account to show favorite products ([#628](https://github.com/ecomplus/storefront/issues/628)) ([9dc76d5](https://github.com/ecomplus/storefront/commit/9dc76d5e71ae462a7131d2f48c9fb240066005bd))

# [2.0.0-beta.122](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.121...@ecomplus/storefront-app@2.0.0-beta.122) (2022-02-06)

### Bug Fixes

- **deps:** update @ecomplus/i18n to v1.27.0 ([d83db09](https://github.com/ecomplus/storefront/commit/d83db098e43520fbf8cc2eaaf3b69de839eedc64))

# [2.0.0-beta.121](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.120...@ecomplus/storefront-app@2.0.0-beta.121) (2022-01-24)

### Bug Fixes

- **app/checkout:** must check item `available` while validating ([df95218](https://github.com/ecomplus/storefront/commit/df9521829bdaa3b38581742a1fa3f4f05a6be062))

# [2.0.0-beta.120](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.119...@ecomplus/storefront-app@2.0.0-beta.120) (2022-01-18)

### Bug Fixes

- **app/order-info:** remove no more available `.btn-info` variant ([07a708a](https://github.com/ecomplus/storefront/commit/07a708a61b9b405cff2a42d8c08e10030abf743f))

# [2.0.0-beta.119](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.118...@ecomplus/storefront-app@2.0.0-beta.119) (2022-01-11)

### Bug Fixes

- **deps:** update @ecomplus/i18n to v1.26.0 ([8df8b66](https://github.com/ecomplus/storefront/commit/8df8b662386a40f9ea7e3ecc1a34516409a53c2a))
- **icons:** update icon class names to `.i-*` ([0254be3](https://github.com/ecomplus/storefront/commit/0254be314abfe62627135480089b7788ced43d34))
- **icons:** update icon class names without `-alt` suffix ([0416133](https://github.com/ecomplus/storefront/commit/04161338d04562332a47ee64917624b3c6137fb1))

# [2.0.0-beta.118](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.117...@ecomplus/storefront-app@2.0.0-beta.118) (2022-01-04)

### Bug Fixes

- **app/checkout:** ensure shipping address is reactive to address selection ([8bad209](https://github.com/ecomplus/storefront/commit/8bad209c0923b4e999c78fb68bf8025e2fc85e66))
- **deps:** update @ecomplus/i18n to v1.25.0 ([ffe7a27](https://github.com/ecomplus/storefront/commit/ffe7a27a0d0ef5a5ce166c66062002c56d9f3068))

# [2.0.0-beta.117](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.116...@ecomplus/storefront-app@2.0.0-beta.117) (2021-12-31)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.116](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.115...@ecomplus/storefront-app@2.0.0-beta.116) (2021-12-29)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.115](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.114...@ecomplus/storefront-app@2.0.0-beta.115) (2021-12-06)

### Bug Fixes

- **app/credit-card-form:** loading spinner while card hash is being generated ([#568](https://github.com/ecomplus/storefront/issues/568)) ([27e07c5](https://github.com/ecomplus/storefront/commit/27e07c55dd21b05ece77f7d8a24130779740be88))

# [2.0.0-beta.114](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.113...@ecomplus/storefront-app@2.0.0-beta.114) (2021-11-17)

### Bug Fixes

- **app/checkout:** ensure discount is applied also when summary is not shown ([2b7e8e8](https://github.com/ecomplus/storefront/commit/2b7e8e8b9a36a3fedcaafefd14a79d29b0229c9a))

# [2.0.0-beta.113](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.112...@ecomplus/storefront-app@2.0.0-beta.113) (2021-11-09)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.112](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.111...@ecomplus/storefront-app@2.0.0-beta.112) (2021-11-09)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.111](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.110...@ecomplus/storefront-app@2.0.0-beta.111) (2021-10-25)

### Bug Fixes

- **deps:** update all non-major dependencies ([#550](https://github.com/ecomplus/storefront/issues/550)) ([433f9c5](https://github.com/ecomplus/storefront/commit/433f9c51d5bbc2701351be74e1b9289a1cb1a28c))

# [2.0.0-beta.110](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.109...@ecomplus/storefront-app@2.0.0-beta.110) (2021-10-05)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.109](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.108...@ecomplus/storefront-app@2.0.0-beta.109) (2021-10-05)

### Features

- **app/cart:** parse `cart_items` url params if set, then clear url query ([3db8038](https://github.com/ecomplus/storefront/commit/3db80381e9e492fd4afd24f8351af00587b41517))

# [2.0.0-beta.108](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.107...@ecomplus/storefront-app@2.0.0-beta.108) (2021-09-21)

### Bug Fixes

- **app/checkout:** hide checkout block on lp while cart empty (product with variations) ([1f8391a](https://github.com/ecomplus/storefront/commit/1f8391a3d4c14dbf14adc527b9e05cf38bcac303))

# [2.0.0-beta.107](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.106...@ecomplus/storefront-app@2.0.0-beta.107) (2021-09-17)

### Bug Fixes

- **app/order-info:** save up to 300 orders (last ones) on customer account data ([e470bfe](https://github.com/ecomplus/storefront/commit/e470bfe5d21a7cb36ee6a146e8677b6c32fb47a6))
- **app/orders-list:** prevent bump effect by properlly sorting and slicing full orders list ([b0b152c](https://github.com/ecomplus/storefront/commit/b0b152c0e2194aa761bd839d9117d161aefd2014))
- **app/sync-cart-to-api:** check cart item by sku or object id to update local cart ([26b91c2](https://github.com/ecomplus/storefront/commit/26b91c2e746a460b6d6623d9d13887f1eb9e54ec))
- **deps:** update @ecomplus/passport-client to v1.1.0 ([e43a2c0](https://github.com/ecomplus/storefront/commit/e43a2c09cb059ecb1a14b532ab5251be86739008))
- **deps:** update @ecomplus/passport-client to v1.1.1 ([b713159](https://github.com/ecomplus/storefront/commit/b7131596a14556ca53c4608a234ace3b12b39943))

### Performance Improvements

- **app/account:** prevent updating customer unnecessarily on preset ([cba90e5](https://github.com/ecomplus/storefront/commit/cba90e5ba3ac7f0d627d352757bf4c6c06287590))

# [2.0.0-beta.106](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.105...@ecomplus/storefront-app@2.0.0-beta.106) (2021-09-02)

### Bug Fixes

- **app/checkout:** dealing better whith address form and checkout steps ([9e5b07a](https://github.com/ecomplus/storefront/commit/9e5b07a7f2d39254b2c3f7060704d7915a18002d))

# [2.0.0-beta.105](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.104...@ecomplus/storefront-app@2.0.0-beta.105) (2021-08-19)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.104](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.103...@ecomplus/storefront-app@2.0.0-beta.104) (2021-08-17)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.103](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.102...@ecomplus/storefront-app@2.0.0-beta.103) (2021-08-03)

### Bug Fixes

- **app/checkout:** reset payment gateways list on key change (freight or subtotal) ([a4b562b](https://github.com/ecomplus/storefront/commit/a4b562bce2b29d8b12497caaa371b26ea8137464))

# [2.0.0-beta.102](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.101...@ecomplus/storefront-app@2.0.0-beta.102) (2021-08-02)

### Bug Fixes

- **app/checkout:** show product first on lp checkout ([83b726f](https://github.com/ecomplus/storefront/commit/83b726f9cc9e84b570640d8b022405d5be0754e2))

# [2.0.0-beta.101](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.100...@ecomplus/storefront-app@2.0.0-beta.101) (2021-07-30)

### Bug Fixes

- **app/checkout:** checkout form should be first at mobile view ([53ef127](https://github.com/ecomplus/storefront/commit/53ef127bea0aaee612553b553ee376fb3c4d1d68))
- **app/checkout:** fix (and show even on guest) account/address forms submit buttons ([8d58834](https://github.com/ecomplus/storefront/commit/8d58834029eaaada4ff765dbc38778690737f732))

# [2.0.0-beta.100](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.99...@ecomplus/storefront-app@2.0.0-beta.100) (2021-07-24)

### Bug Fixes

- **app/credit-card-form:** minor fix credit card doc number label ([c400bb7](https://github.com/ecomplus/storefront/commit/c400bb73209935b894cef9615c5646b7d0e6939f))

### Features

- **app/checkout:** handle guest and lp checkout ([1055234](https://github.com/ecomplus/storefront/commit/1055234a758c6e32938b19810669d591b33fed85))
- **app/checkout-view:** handle checkout mode from router params and setup lp checkout ([dc1353c](https://github.com/ecomplus/storefront/commit/dc1353c985ec63af94edd05e7ffe5b2e9edf843a))
- **app/router:** update chackout path and handle redirects for lp checkouts ([b41c44a](https://github.com/ecomplus/storefront/commit/b41c44a43f6abe5ac644c4c1b14cb325113afacb))

# [2.0.0-beta.99](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.98...@ecomplus/storefront-app@2.0.0-beta.99) (2021-07-08)

### Bug Fixes

- **app/credit-card-form:** prevent errors with installments function and incomplete bin ([e054f2b](https://github.com/ecomplus/storefront/commit/e054f2b1764bd57ee2c422363abb890bda7ac657))

# [2.0.0-beta.98](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.97...@ecomplus/storefront-app@2.0.0-beta.98) (2021-07-02)

### Features

- **app/order-info:** new card for order notes ([#487](https://github.com/ecomplus/storefront/issues/487)) ([77b791e](https://github.com/ecomplus/storefront/commit/77b791e59f2be092c83aecddcfa76fc7e74b6dd7))
- **app/payment-methods:** custom class name and data-layer for each gateway element ([ceeccbe](https://github.com/ecomplus/storefront/commit/ceeccbe474f4206388a17093b44cb5a9c16a142a))

# [2.0.0-beta.97](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.96...@ecomplus/storefront-app@2.0.0-beta.97) (2021-06-21)

### Bug Fixes

- **app/order-summary:** always use `APrices` for amount total ([75c8898](https://github.com/ecomplus/storefront/commit/75c8898b1ff5a3ac7eca678bc0aa479b0fd3d467))

### Features

- **app/payment-methods:** get default mocked payment gateways from `window.ecomPaymentGateways` ([f08d907](https://github.com/ecomplus/storefront/commit/f08d90760e21d842c75868fd175f021feba0e68b))
- **app/summary:** handle new `amountToPay` prop and `amount-custom` slot ([#476](https://github.com/ecomplus/storefront/issues/476)) ([404e5bd](https://github.com/ecomplus/storefront/commit/404e5bd26a351e0ae1f8b70cf3c81a892b3f3916))

# [2.0.0-beta.96](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.95...@ecomplus/storefront-app@2.0.0-beta.96) (2021-06-17)

### Features

- **app/summary:** show items customizations on checkout and order info ([#473](https://github.com/ecomplus/storefront/issues/473)) ([071bded](https://github.com/ecomplus/storefront/commit/071bded487dbf1e350b9710c45b166fc9035f193))

# [2.0.0-beta.95](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.94...@ecomplus/storefront-app@2.0.0-beta.95) (2021-06-11)

### Bug Fixes

- **app/payment-methods:** must handle js clients again when payment gateways already loaded (prop) ([8b64228](https://github.com/ecomplus/storefront/commit/8b642284020be01d8bdfa903a66faaceffedd2f5))
- **deps:** update all non-major dependencies ([#478](https://github.com/ecomplus/storefront/issues/478)) ([f3b5f96](https://github.com/ecomplus/storefront/commit/f3b5f96c6d863d446d806668c4fbab92e785cce2))

### Features

- **app/order-info:** show shipping address complement and near to if any ([2093645](https://github.com/ecomplus/storefront/commit/20936454430b29d04a1d233d9a5d057c4bbd186c))

# [2.0.0-beta.94](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.93...@ecomplus/storefront-app@2.0.0-beta.94) (2021-05-27)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.93](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.92...@ecomplus/storefront-app@2.0.0-beta.93) (2021-05-18)

### Bug Fixes

- **app/checkout:** set max points amount to subtotal - 5 ([d6d9817](https://github.com/ecomplus/storefront/commit/d6d9817be06ef39c38a65b1e6e2cbca1d156a095))
- **deps:** update @ecomplus/i18n to v1.21.0 ([a235058](https://github.com/ecomplus/storefront/commit/a2350580c50480e9caf74ac64dde14e4b618a057))

### Features

- **app/account:** showing customer active loyalty points ([7226598](https://github.com/ecomplus/storefront/commit/72265983e03a91a837aa4f409cccac5a6f68a87e))

# [2.0.0-beta.92](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.91...@ecomplus/storefront-app@2.0.0-beta.92) (2021-05-14)

### Bug Fixes

- **app/checkout:** make birth date optional to checkout ([#463](https://github.com/ecomplus/storefront/issues/463)) ([9244d8e](https://github.com/ecomplus/storefront/commit/9244d8e7f147eb702da6eac85ebad4104a025b8d))
- **app/payment-methods:** also use credit card form for some other payment methods with js client ([b1b33ea](https://github.com/ecomplus/storefront/commit/b1b33ea18e7cd9592a883f96c5f16461f0a139bd))

### Features

- **app/checkout:** handling loyalty points usage and multiple transactions ([7029131](https://github.com/ecomplus/storefront/commit/70291311af295adaa07cc085b922c6b832f4ad61))

# [2.0.0-beta.91](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.90...@ecomplus/storefront-app@2.0.0-beta.91) (2021-04-28)

### Bug Fixes

- **app/validate-cart-items:** prevent overwriting ([9b1fb13](https://github.com/ecomplus/storefront/commit/9b1fb132ed6d44aed521ecc8f188b2cbb0365b0d))

### Features

- **app/credit-card-form:** try to support credit card number input autocomplete ([#411](https://github.com/ecomplus/storefront/issues/411)) ([4e54c94](https://github.com/ecomplus/storefront/commit/4e54c9473dc065e463403aedc45ff85720480adb))

# [2.0.0-beta.90](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.89...@ecomplus/storefront-app@2.0.0-beta.90) (2021-03-29)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.89](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.88...@ecomplus/storefront-app@2.0.0-beta.89) (2021-03-12)

### Bug Fixes

- **checkout:** group items by product to perf and properlly check quantities ([#427](https://github.com/ecomplus/storefront/issues/427)) ([f8c6581](https://github.com/ecomplus/storefront/commit/f8c6581f28142c791feb9850d78794be5d8b7071))
- **deps:** update @ecomplus/client to v2.2.1 ([574f93f](https://github.com/ecomplus/storefront/commit/574f93fd027220bb64cad19443e38ce559c69e62))

# [2.0.0-beta.88](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.87...@ecomplus/storefront-app@2.0.0-beta.88) (2021-02-24)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.87](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.86...@ecomplus/storefront-app@2.0.0-beta.87) (2021-02-15)

### Bug Fixes

- **deps:** update all non-major dependencies ([#410](https://github.com/ecomplus/storefront/issues/410)) ([4f67629](https://github.com/ecomplus/storefront/commit/4f67629dbf9ee4aeb0e55cf5fd28adef0e166c92))
- **order-info:** check items stock to show reopen order option ([#326](https://github.com/ecomplus/storefront/issues/326)) ([640593e](https://github.com/ecomplus/storefront/commit/640593e80beb7fffc02eb4919b06cfb154759838))

# [2.0.0-beta.86](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.85...@ecomplus/storefront-app@2.0.0-beta.86) (2021-01-25)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.85](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.84...@ecomplus/storefront-app@2.0.0-beta.85) (2021-01-25)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.84](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.83...@ecomplus/storefront-app@2.0.0-beta.84) (2021-01-15)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.83](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.82...@ecomplus/storefront-app@2.0.0-beta.83) (2021-01-14)

### Bug Fixes

- **validate-cart-item:** fallback try to find variation by sku ([67a1814](https://github.com/ecomplus/storefront/commit/67a1814c57df9229a0a99c22eba3bef9aacdce53))
- **validate-cart-item:** fallback try to find variation by sku (and fix item variation id) ([572429d](https://github.com/ecomplus/storefront/commit/572429d0820c77dcaa728ac08148f2e1bdaac2e9))

# [2.0.0-beta.82](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.81...@ecomplus/storefront-app@2.0.0-beta.82) (2020-12-24)

### Bug Fixes

- **order-info:** check for 'pick up' to prevent showing shipping address ([#322](https://github.com/ecomplus/storefront/issues/322)) ([9a80e63](https://github.com/ecomplus/storefront/commit/9a80e634a3aa67d6317389b06bf6ffa008446b6e))
- **order-info:** properly handling banking billet or transaction code copy to clipboard ([fe9da46](https://github.com/ecomplus/storefront/commit/fe9da46203b722c644f0097ed73db6061ec0b6dc))

# [2.0.0-beta.81](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.80...@ecomplus/storefront-app@2.0.0-beta.81) (2020-12-17)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.80](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.79...@ecomplus/storefront-app@2.0.0-beta.80) (2020-12-16)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.79](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.78...@ecomplus/storefront-app@2.0.0-beta.79) (2020-12-15)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.78](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.77...@ecomplus/storefront-app@2.0.0-beta.78) (2020-12-15)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.77](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.76...@ecomplus/storefront-app@2.0.0-beta.77) (2020-12-15)

### Bug Fixes

- **order-info:** parse transaction notes html (gateway text/description) ([d895f11](https://github.com/ecomplus/storefront/commit/d895f11d037f47849f4788a2c2fc74b2b196e571))

# [2.0.0-beta.76](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.75...@ecomplus/storefront-app@2.0.0-beta.76) (2020-12-07)

### Bug Fixes

- **order-info:** prefer showing payment method name than label ([3ba5177](https://github.com/ecomplus/storefront/commit/3ba51775b46d8972fcaeab31cf418b6c0652d3aa))

### Features

- **payment-methods:** add 'defaultAppId' prop ([c444979](https://github.com/ecomplus/storefront/commit/c44497987a8c19dc8870c2668acaa9ef1d02c835)), closes [#379](https://github.com/ecomplus/storefront/issues/379)

# [2.0.0-beta.75](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.74...@ecomplus/storefront-app@2.0.0-beta.75) (2020-12-04)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.74](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.73...@ecomplus/storefront-app@2.0.0-beta.74) (2020-12-01)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.73](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.72...@ecomplus/storefront-app@2.0.0-beta.73) (2020-11-27)

### Bug Fixes

- **summary:** don't show items with 0 quantity ([d650524](https://github.com/ecomplus/storefront/commit/d6505240bc3a87fd4c4cc352da093220524d66c5))
- **summary:** set 'isAmountTotal' on prices (total) ([f21e591](https://github.com/ecomplus/storefront/commit/f21e591bf69b6198648b3afff9d7446f23b585d1))

# [2.0.0-beta.72](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.71...@ecomplus/storefront-app@2.0.0-beta.72) (2020-11-18)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.71](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.70...@ecomplus/storefront-app@2.0.0-beta.71) (2020-11-18)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.70](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.69...@ecomplus/storefront-app@2.0.0-beta.70) (2020-11-17)

### Bug Fixes

- **deps:** update @ecomplus/shopping-cart to v2.5.5 ([b2cf490](https://github.com/ecomplus/storefront/commit/b2cf490ee6fed76aa50a03a58680fa2ba6f912b0))

# [2.0.0-beta.69](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.68...@ecomplus/storefront-app@2.0.0-beta.69) (2020-11-17)

### Bug Fixes

- **checkout:** prevent crealing kit composition arrays ([9e042ca](https://github.com/ecomplus/storefront/commit/9e042ca03ee25611703457f3685285f790bc5096))
- **deps:** update @ecomplus/shopping-cart to v2.5.1 ([85259ac](https://github.com/ecomplus/storefront/commit/85259ac0e3e2d379b8dc5ab3c9ba712ba262d9ff))
- **deps:** update @ecomplus/shopping-cart to v2.5.4 ([36a58b1](https://github.com/ecomplus/storefront/commit/36a58b1d83f99f2367904b9101d3404f36e28203))

# [2.0.0-beta.68](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.67...@ecomplus/storefront-app@2.0.0-beta.68) (2020-11-12)

### Bug Fixes

- **deps:** update @ecomplus/shopping-cart to v2.4.0 ([1d1585f](https://github.com/ecomplus/storefront/commit/1d1585f1c0af11f9f06c72697bd8ed68e3449beb))
- **deps:** update @ecomplus/shopping-cart to v2.4.1 ([1ecbec0](https://github.com/ecomplus/storefront/commit/1ecbec0160acb81882e2ce96c06245c9601f7f58))
- **deps:** update @ecomplus/shopping-cart to v2.5.0 ([c851a30](https://github.com/ecomplus/storefront/commit/c851a306aaf54ec60a66453f11576ce70ee17b9c))
- **order-info:** explicitly set 'canSave' false on buy again add items ([2bc7ae8](https://github.com/ecomplus/storefront/commit/2bc7ae8e0b6e8e951c467cbfa5b76ce42304f181))
- **sync-cart-to-api:** preserve 'kit_product' item field ([a50f5c7](https://github.com/ecomplus/storefront/commit/a50f5c78282f706eaa63bcb8b9af25ac18312600))

### Features

- **checkout:** validate cart items with kit products ([fa3148e](https://github.com/ecomplus/storefront/commit/fa3148ed4fbc367b2e8d160d5f4049d679fe8f94))

# [2.0.0-beta.67](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.66...@ecomplus/storefront-app@2.0.0-beta.67) (2020-11-09)

### Bug Fixes

- **deps:** update all non-major dependencies ([#357](https://github.com/ecomplus/storefront/issues/357)) ([63ed559](https://github.com/ecomplus/storefront/commit/63ed559c2d93c1aa133a786bb67bbc46358afd7c))

# [2.0.0-beta.66](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.65...@ecomplus/storefront-app@2.0.0-beta.66) (2020-11-05)

### Bug Fixes

- **order-info:** show transaction notes on warning alert ([1e21c89](https://github.com/ecomplus/storefront/commit/1e21c89d08ed444612ea8ccf8ee34884086e3f7e))
- **order-info:** show transaction notes on warning alert (typo) ([bb114b4](https://github.com/ecomplus/storefront/commit/bb114b4012fd37f100a59c2ab18e69ed5ff6c580))

# [2.0.0-beta.65](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.64...@ecomplus/storefront-app@2.0.0-beta.65) (2020-11-03)

### Bug Fixes

- **deps:** update all non-major dependencies ([#344](https://github.com/ecomplus/storefront/issues/344)) ([ae49403](https://github.com/ecomplus/storefront/commit/ae4940343a6c656efef8f7536e16b5f88e3f48dd))

# [2.0.0-beta.64](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.63...@ecomplus/storefront-app@2.0.0-beta.64) (2020-10-26)

### Bug Fixes

- **checkout:** fix items final price after fetch ([bea5305](https://github.com/ecomplus/storefront/commit/bea53053dce5b537ef19b0e9d5d5aac9124c3ad2))
- **deps:** update @ecomplus/shopping-cart to v2.3.0 ([a4e3066](https://github.com/ecomplus/storefront/commit/a4e3066a5d89869a1632b6e564eaef4a9198915f))
- **deps:** update @ecomplus/shopping-cart to v2.3.1 ([c13312d](https://github.com/ecomplus/storefront/commit/c13312da1e7d675e3ad3b79dd4c5f38c899373ba))

# [2.0.0-beta.63](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.62...@ecomplus/storefront-app@2.0.0-beta.63) (2020-10-14)

### Bug Fixes

- **deps:** update all non-major dependencies ([#332](https://github.com/ecomplus/storefront/issues/332)) ([b8c0abc](https://github.com/ecomplus/storefront/commit/b8c0abc6937636157df27287ea2478374fa842ad))

# [2.0.0-beta.62](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.61...@ecomplus/storefront-app@2.0.0-beta.62) (2020-10-06)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.61](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.60...@ecomplus/storefront-app@2.0.0-beta.61) (2020-10-02)

### Bug Fixes

- **deps:** update @ecomplus/shopping-cart to v2.2.0 ([920c4b6](https://github.com/ecomplus/storefront/commit/920c4b6664b53036af34337a103be2e10c7909ff))

# [2.0.0-beta.60](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.59...@ecomplus/storefront-app@2.0.0-beta.60) (2020-09-14)

### Bug Fixes

- **deps:** update @ecomplus/i18n to v1.16.1 ([71b8a37](https://github.com/ecomplus/storefront/commit/71b8a37d146b17dce9a8337ac376cb08a73c4bac))

# [2.0.0-beta.59](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.58...@ecomplus/storefront-app@2.0.0-beta.59) (2020-09-11)

### Bug Fixes

- **deps:** update @ecomplus/i18n to v1.16.0 ([89b42f2](https://github.com/ecomplus/storefront/commit/89b42f26b8cda4ab40bbd2762d5329f95deb970d))

# [2.0.0-beta.58](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.57...@ecomplus/storefront-app@2.0.0-beta.58) (2020-09-11)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.57](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.56...@ecomplus/storefront-app@2.0.0-beta.57) (2020-09-10)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.56](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.55...@ecomplus/storefront-app@2.0.0-beta.56) (2020-09-10)

### Bug Fixes

- **deps:** update @ecomplus/i18n to v1.15.0 ([47dec6e](https://github.com/ecomplus/storefront/commit/47dec6eeda2c8078a06f35cb726c49837315a28a))
- **i18n:** importing new releases words from @ecomplus/i18n ([343fe92](https://github.com/ecomplus/storefront/commit/343fe927069e1ba4f45ef60f3bdceb42f6f18e32))

# [2.0.0-beta.55](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.54...@ecomplus/storefront-app@2.0.0-beta.55) (2020-08-27)

### Bug Fixes

- **deps:** fix vue to v2.6.12 ([0ab8ac5](https://github.com/ecomplus/storefront/commit/0ab8ac597c80643d0232c3808c9bfaffb7ad92e0))

# [2.0.0-beta.54](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.53...@ecomplus/storefront-app@2.0.0-beta.54) (2020-08-27)

### Features

- **sync-cart:** once cart created, delay and save permalink ([e9b953c](https://github.com/ecomplus/storefront/commit/e9b953cfc5e63d6b0256a1d8ea8c61040d28f702))

# [2.0.0-beta.53](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.52...@ecomplus/storefront-app@2.0.0-beta.53) (2020-08-20)

### Bug Fixes

- **cart:** fix checking cart items available quantity ([4d37360](https://github.com/ecomplus/storefront/commit/4d373604dceebf54a6eddff9766291c7ff88a7b1))
- **cart:** prevent duplicating items quantity on cart after sync ([cd50c00](https://github.com/ecomplus/storefront/commit/cd50c00824162643e4c950e946d908d619338464))
- **checkout:** fix handling optional product 'min_quantity' ([c8cc625](https://github.com/ecomplus/storefront/commit/c8cc62576ae783011458e76913f97d1f47b2b625))
- **checkout:** watch 'customer.main_email' to update local 'customerEmail' ([7a40447](https://github.com/ecomplus/storefront/commit/7a40447916713fdb59baed7ac7ea7934e45ae652))

### Performance Improvements

- **product-data:** unset/delete inventory_records and price_change_records when not needed ([d7c6777](https://github.com/ecomplus/storefront/commit/d7c6777573faafd5890ac8c4eae1f6ac68e413aa))

# [2.0.0-beta.52](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.51...@ecomplus/storefront-app@2.0.0-beta.52) (2020-08-19)

### Bug Fixes

- **deps:** update @ecomplus/shoppint-cart to ^2.1.7 ([beb198b](https://github.com/ecomplus/storefront/commit/beb198be29a4f689450cf0d2743b6ebcafce5a23))
- **payment-methods:** fix watching amount changes to refetch list payments ([f0db919](https://github.com/ecomplus/storefront/commit/f0db91982927048a3614c3a9dad110736dbcfb43))

# [2.0.0-beta.51](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.50...@ecomplus/storefront-app@2.0.0-beta.51) (2020-08-17)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.50](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.49...@ecomplus/storefront-app@2.0.0-beta.50) (2020-08-14)

### Bug Fixes

- **payment-methods:** skip customer (optional) on body when retrying ([c19241e](https://github.com/ecomplus/storefront/commit/c19241e0521b0b9c73f100671190c3064c358ce0))

# [2.0.0-beta.49](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.48...@ecomplus/storefront-app@2.0.0-beta.49) (2020-08-12)

### Bug Fixes

- **deps:** update @ecomplus/shopping-cart to ^2.1.6 ([499004b](https://github.com/ecomplus/storefront/commit/499004bbb1442b5852f5b2099711340064f8d863))
- **payment-methods:** retry fetching payments list, message when any option ([1a01868](https://github.com/ecomplus/storefront/commit/1a0186867d2174ba935067e8015a7eddedb5d245))

# [2.0.0-beta.48](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.47...@ecomplus/storefront-app@2.0.0-beta.48) (2020-08-11)

### Reverts

- **checkout:** set manually only ([fa22933](https://github.com/ecomplus/storefront/commit/fa229333a42c0e26e5c9796601cd31fbb6f26e99))

# [2.0.0-beta.47](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.46...@ecomplus/storefront-app@2.0.0-beta.47) (2020-08-11)

### Bug Fixes

- **checkout:** ensure `editAccount` is set when account form is shown ([38642ae](https://github.com/ecomplus/storefront/commit/38642ae1c809d34cdde2eee02831126233f52dc9))

# [2.0.0-beta.46](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.45...@ecomplus/storefront-app@2.0.0-beta.46) (2020-08-10)

### Bug Fixes

- **checkout:** try fixing checkout account -> steps flux with $nextTick ([a41ddd9](https://github.com/ecomplus/storefront/commit/a41ddd99bb4583a980905d4f5abb96717f35ec9b))

# [2.0.0-beta.45](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.44...@ecomplus/storefront-app@2.0.0-beta.45) (2020-08-07)

### Bug Fixes

- **checkout:** do not skip shipping step on mobile devices ([78f6660](https://github.com/ecomplus/storefront/commit/78f666022b3a0a2f91c5eadd934ac3328f6e7e37))
- **checkout:** go to top on step change with vue $nextTick ([c631342](https://github.com/ecomplus/storefront/commit/c631342db06ef61299d6df4ca3e57be590abebd2))
- **deps:** update dependency card-validator to v8 ([#277](https://github.com/ecomplus/storefront/issues/277)) ([3bd3a35](https://github.com/ecomplus/storefront/commit/3bd3a3580b14b8560172ef28f122bcd7eae1f0be))

# [2.0.0-beta.44](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.43...@ecomplus/storefront-app@2.0.0-beta.44) (2020-08-04)

### Features

- **checkout:** add optional field for order notes (textarea) ([d519e1c](https://github.com/ecomplus/storefront/commit/d519e1c2dc36775d9f42994cbcc1cb193b945823))

# [2.0.0-beta.43](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.42...@ecomplus/storefront-app@2.0.0-beta.43) (2020-07-29)

### Bug Fixes

- **deps:** update @ecomplus/client to ^2.1.0 ([95139fe](https://github.com/ecomplus/storefront/commit/95139fef754897d7618f5d81fed00493f93eae17))

# [2.0.0-beta.42](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.41...@ecomplus/storefront-app@2.0.0-beta.42) (2020-07-23)

### Bug Fixes

- **payment-methods:** prevent reloading list when payment selected ([2baf1ec](https://github.com/ecomplus/storefront/commit/2baf1ec84bf9078234462b323fd91024a44cb6e7))

### Features

- **order-info:** add buy again button ([#260](https://github.com/ecomplus/storefront/issues/260)) ([91744b9](https://github.com/ecomplus/storefront/commit/91744b9b436ce0b756c90cdc58097ae23afca864))

# [2.0.0-beta.41](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.40...@ecomplus/storefront-app@2.0.0-beta.41) (2020-07-20)

### Bug Fixes

- **payment-methods:** ensure payments list is refreshed when amount total is changed ([223461e](https://github.com/ecomplus/storefront/commit/223461e99416c1aeba994210885245afc500305a))

# [2.0.0-beta.40](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.39...@ecomplus/storefront-app@2.0.0-beta.40) (2020-07-17)

### Bug Fixes

- **credit-card-form:** fix importar 'card-validator' v9 ([5853913](https://github.com/ecomplus/storefront/commit/5853913a0f5eaad360ec7d5e08665dfbd60650cf))

# [2.0.0-beta.39](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.38...@ecomplus/storefront-app@2.0.0-beta.39) (2020-07-17)

### Bug Fixes

- **deps:** update @ecomplus/i18n to v1.14.0 ([ea9f37c](https://github.com/ecomplus/storefront/commit/ea9f37c80401653eee18c7c9c2b384935c1ed298))
- **deps:** update dependency card-validator to v7 ([#266](https://github.com/ecomplus/storefront/issues/266)) ([8976a7b](https://github.com/ecomplus/storefront/commit/8976a7b932b6a11ab0411f9f5bc873b40f770a23))
- **deps:** update dependency credit-card-type to v9 ([#267](https://github.com/ecomplus/storefront/issues/267)) ([e749ba0](https://github.com/ecomplus/storefront/commit/e749ba022db99702650029279be0f96c78f3152f))

# [2.0.0-beta.38](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.37...@ecomplus/storefront-app@2.0.0-beta.38) (2020-07-03)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.37](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.36...@ecomplus/storefront-app@2.0.0-beta.37) (2020-07-03)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.36](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.35...@ecomplus/storefront-app@2.0.0-beta.36) (2020-07-03)

### Bug Fixes

- **orders-list:** ensure customer orders is fully filled ([1d89e31](https://github.com/ecomplus/storefront/commit/1d89e31c0684e0e984ce879cf8675dfe62dd75d6))

### Features

- **account-form:** create new AccountForm component ([#261](https://github.com/ecomplus/storefront/issues/261)) ([0b1e319](https://github.com/ecomplus/storefront/commit/0b1e31960ce020fd4d1a267ce78dab9b911635b5))

# [2.0.0-beta.35](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.34...@ecomplus/storefront-app@2.0.0-beta.35) (2020-07-02)

### Bug Fixes

- **deps:** fix @ecomplus/shopping-cart to v2.1.5 ([9d5d68c](https://github.com/ecomplus/storefront/commit/9d5d68c2218226d5984f648fb7f6914c93e4ec20))
- **fetch-cart-items:** check item min/max quantity ([b89a797](https://github.com/ecomplus/storefront/commit/b89a797f7636627eb7c0f764cb19aef829481351))

# [2.0.0-beta.34](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.33...@ecomplus/storefront-app@2.0.0-beta.34) (2020-06-30)

### Bug Fixes

- **account-form:** check manually invalidated fields on submit ([e693a42](https://github.com/ecomplus/storefront/commit/e693a42b406b1ba7d1fbc5a38843ba1ab70e9f0c))
- **checkout:** prevent proceed to payment whitout second step enabled ([f28fe81](https://github.com/ecomplus/storefront/commit/f28fe811a4c58f601f500452f1120708400510cd))
- **deps:** update @ecomplus/shopping-cart to v2.1.2 ([d4fb6b0](https://github.com/ecomplus/storefront/commit/d4fb6b032b82519f7e3b433fd6faad3715746fbf))
- **deps:** update @ecomplus/shopping-cart to v2.1.3 ([0a71d3b](https://github.com/ecomplus/storefront/commit/0a71d3b161b8f2b4258ec72df0772a5ac9e8b3c0))
- **vuex:** prevent editing original item \_id on fetch ([25a7b6a](https://github.com/ecomplus/storefront/commit/25a7b6afa8f45efa3c2055ffa1b64525a4b827ea))

### Features

- **account-addresses:** add new AccountAddresses component :tada: ([#256](https://github.com/ecomplus/storefront/issues/256)) ([a37811e](https://github.com/ecomplus/storefront/commit/a37811e58cb810d1295cccba4606a8f536131b7b))

# [2.0.0-beta.33](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.32...@ecomplus/storefront-app@2.0.0-beta.33) (2020-06-25)

### Features

- **the-cart:** add TheCart component ([#248](https://github.com/ecomplus/storefront/issues/248)) ([2116548](https://github.com/ecomplus/storefront/commit/2116548faad452acfd2f08786bb68e4645bc1d26)), closes [#182](https://github.com/ecomplus/storefront/issues/182)

# [2.0.0-beta.32](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.31...@ecomplus/storefront-app@2.0.0-beta.32) (2020-06-21)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.31](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.30...@ecomplus/storefront-app@2.0.0-beta.31) (2020-06-21)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.30](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.29...@ecomplus/storefront-app@2.0.0-beta.30) (2020-06-19)

### Features

- **confirmation:** add 'number' and 'json' optional route params ([58292a7](https://github.com/ecomplus/storefront/commit/58292a7b9ec2e4f834def746e5437e327351a51e))

# [2.0.0-beta.29](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.28...@ecomplus/storefront-app@2.0.0-beta.29) (2020-06-18)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.28](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.27...@ecomplus/storefront-app@2.0.0-beta.28) (2020-06-18)

### Bug Fixes

- **deps:** update all non-major dependencies ([#251](https://github.com/ecomplus/storefront/issues/251)) ([d08be72](https://github.com/ecomplus/storefront/commit/d08be7258f1f0d55f2d6b6b53fd3f5fb1b6a4bbe))

# [2.0.0-beta.27](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.26...@ecomplus/storefront-app@2.0.0-beta.27) (2020-06-11)

### Bug Fixes

- **cart:** fix controller for discount applier (enable without zip code) ([3114412](https://github.com/ecomplus/storefront/commit/311441221f8ef0205f0fdb7cbef461a55a3eff72))

# [2.0.0-beta.26](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.25...@ecomplus/storefront-app@2.0.0-beta.26) (2020-06-10)

### Bug Fixes

- **cart:** fix handling freebie items on cart changes ([41e8dc0](https://github.com/ecomplus/storefront/commit/41e8dc05fbdf87d37e254dc1e86f31b915c8f065))
- **deps:** update @ecomplus/i18n to v1.12.0 ([eadefea](https://github.com/ecomplus/storefront/commit/eadefea96ee224f0d403686b3c8ff6ca574a6b50))
- **i18n:** update (import) some new words ([e55bbfd](https://github.com/ecomplus/storefront/commit/e55bbfd321b6808970bdf81e2a19ec95c72e1a9f))

# [2.0.0-beta.25](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.24...@ecomplus/storefront-app@2.0.0-beta.25) (2020-06-06)

### Bug Fixes

- **checkout:** unselect payment gateway on checkout destroy ([8903a49](https://github.com/ecomplus/storefront/commit/8903a49c7b15925d1b14cdedf0fc0c0677a3c626))
- **summary:** add key (\_id) to items list ([45b7cdf](https://github.com/ecomplus/storefront/commit/45b7cdf8772418a90178b55903c70c4a7959b9ac))
- **summary:** prettier freebie items marks on list ([8f54a8d](https://github.com/ecomplus/storefront/commit/8f54a8dd9d291db06de923b60fa646b7ea173050))

### Features

- **checkout:** check freebie items and mark on summary ([5157495](https://github.com/ecomplus/storefront/commit/51574952104aa9c168bef1a321b0df93e644c5b6))

### Performance Improvements

- **cart/checkout:** fix handling discount/shipping steps ([c4341d2](https://github.com/ecomplus/storefront/commit/c4341d20aa07b6a9e9ececf2e7acf096de679338))

# [2.0.0-beta.24](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.23...@ecomplus/storefront-app@2.0.0-beta.24) (2020-06-03)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.23](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.22...@ecomplus/storefront-app@2.0.0-beta.23) (2020-06-03)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.22](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.21...@ecomplus/storefront-app@2.0.0-beta.22) (2020-06-02)

### Bug Fixes

- **cart:** minor spacing fix for mobile view ([4675a62](https://github.com/ecomplus/storefront/commit/4675a629dd9ba12065177bae665c2002a10fae78))

# [2.0.0-beta.21](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.20...@ecomplus/storefront-app@2.0.0-beta.21) (2020-06-02)

### Features

- **cart/checkout:** handle recommended products ([344a06d](https://github.com/ecomplus/storefront/commit/344a06d3cd8b8fe5eb3e7fad7446a985b603346b))

# [2.0.0-beta.20](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.19...@ecomplus/storefront-app@2.0.0-beta.20) (2020-05-28)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.19](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.18...@ecomplus/storefront-app@2.0.0-beta.19) (2020-05-28)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.18](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.17...@ecomplus/storefront-app@2.0.0-beta.18) (2020-05-28)

### Bug Fixes

- **back-shopping:** 'continue shopping' button on quickview and cart page ([#241](https://github.com/ecomplus/storefront/issues/241)) ([47f1064](https://github.com/ecomplus/storefront/commit/47f1064b1640cfb95f486c6c6b9b8dd31decf321))
- **deps:** update @ecomplus/i18n to v1.11.1 ([0d3a041](https://github.com/ecomplus/storefront/commit/0d3a041e4985555482ca5c3965149d28b439fbbf))

# [2.0.0-beta.17](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.16...@ecomplus/storefront-app@2.0.0-beta.17) (2020-05-26)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.16](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.15...@ecomplus/storefront-app@2.0.0-beta.16) (2020-05-26)

### Bug Fixes

- **credit-card:** fix cvv input form (not number, may have left 0) ([8aacbb2](https://github.com/ecomplus/storefront/commit/8aacbb20f183855c1989585bd7ee412c700b52e6))

# [2.0.0-beta.15](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.14...@ecomplus/storefront-app@2.0.0-beta.15) (2020-05-24)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.14](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.13...@ecomplus/storefront-app@2.0.0-beta.14) (2020-05-22)

### Bug Fixes

- **deps:** update @ecomplus/i18n to v1.11.0 ([07414f3](https://github.com/ecomplus/storefront/commit/07414f3d9e16238b87653df5bac1a601c7c25421))
- **deps:** update @ecomplus/utils to v1.4.0 ([551e02e](https://github.com/ecomplus/storefront/commit/551e02e0e1e3bee6ce7002fd84d0c91f9cb8fb08))

# [2.0.0-beta.13](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.12...@ecomplus/storefront-app@2.0.0-beta.13) (2020-05-22)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.12](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.11...@ecomplus/storefront-app@2.0.0-beta.12) (2020-05-21)

### Bug Fixes

- **addesses:** check address properties to select ([430c7c5](https://github.com/ecomplus/storefront/commit/430c7c54a84a59b918a4d7bed0ec726e00d8b541))
- **deps:** update @ecomplus/passport-client to v1.0.10 ([ff72116](https://github.com/ecomplus/storefront/commit/ff721164afc001d02431601bd083c3beb417fada))

# [2.0.0-beta.11](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.10...@ecomplus/storefront-app@2.0.0-beta.11) (2020-05-16)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.10](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.9...@ecomplus/storefront-app@2.0.0-beta.10) (2020-05-16)

### Bug Fixes

- **checkout:** check shipping address required fields ([c4372b6](https://github.com/ecomplus/storefront/commit/c4372b6f6c195739cce75cf355fde94502c2298b))
- **deps:** update @ecomplus/i18n to v1.10.1 ([143d40a](https://github.com/ecomplus/storefront/commit/143d40a4d2cc407882dc30caba67fddb4cc71373))
- **summary:** ensure discount is not duplicated on APrices ([7fc2732](https://github.com/ecomplus/storefront/commit/7fc27325c7aa521cb1443f68466b3c56de2ac0fd))

# [2.0.0-beta.9](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.8...@ecomplus/storefront-app@2.0.0-beta.9) (2020-05-14)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.8](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.7...@ecomplus/storefront-app@2.0.0-beta.8) (2020-05-12)

### Bug Fixes

- **address-form:** using @ecomplus/storefront-components AddressForm ([41ae215](https://github.com/ecomplus/storefront/commit/41ae2158a447e490fc0f1df6d8f339f93f794a31))
- **deps:** update all non-major dependencies ([#220](https://github.com/ecomplus/storefront/issues/220)) ([86646fc](https://github.com/ecomplus/storefront/commit/86646fcf9658d42f21f14ef7a683ee1ab289601b))
- **orders-list:** show financial status for 'open' orders ([#223](https://github.com/ecomplus/storefront/issues/223)) ([e9177f8](https://github.com/ecomplus/storefront/commit/e9177f8d9e732b9a9be9c70d89d2017a76ca56a2))

### Features

- **checkout:** add proceed to payment button on shipping step ready ([8ac438c](https://github.com/ecomplus/storefront/commit/8ac438cabb8073316994041f35736bc9c35895e2))
- **checkout:** smooth scroll on step change ([0111c5a](https://github.com/ecomplus/storefront/commit/0111c5ab98ee4b9a5658a27a5f51a61116cb2c86))

# [2.0.0-beta.7](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.6...@ecomplus/storefront-app@2.0.0-beta.7) (2020-05-08)

### Bug Fixes

- **summary:** installments/discount options while payment not selected ([0f4b110](https://github.com/ecomplus/storefront/commit/0f4b110528343f9aecaef1a07b69d0c196290516))

# [2.0.0-beta.6](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.5...@ecomplus/storefront-app@2.0.0-beta.6) (2020-05-05)

### Bug Fixes

- **checkout:** pass base modules payload to discount applier component ([07159bf](https://github.com/ecomplus/storefront/commit/07159bfcabc95db3bc30f82e18c1b2b1bc40160e))
- **credit-card-form:** set installment after updating installments list ([ac2d27f](https://github.com/ecomplus/storefront/commit/ac2d27fa4c15769ba150f991b48e2fd0f66ecf8b))
- **deps:** update @ecomplus/i18n to v1.9.0 ([534a235](https://github.com/ecomplus/storefront/commit/534a23571d6d054a9f8186fb0d9e069dac78836f))
- **summary:** using ALink/APicture to propperly handle product picture ([e68fbab](https://github.com/ecomplus/storefront/commit/e68fbab158920392ae45fbb2983bc50b009e0347))

# [2.0.0-beta.5](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.4...@ecomplus/storefront-app@2.0.0-beta.5) (2020-05-03)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.4](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.3...@ecomplus/storefront-app@2.0.0-beta.4) (2020-05-01)

### Bug Fixes

- **toast:** handle aside z-index properly ([5b05279](https://github.com/ecomplus/storefront/commit/5b052796c229359e901457070038ff3ca63a2848))

# [2.0.0-beta.3](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.2...@ecomplus/storefront-app@2.0.0-beta.3) (2020-05-01)

### Bug Fixes

- **checkout:** fix toast provider from vue prototype ([b2ae286](https://github.com/ecomplus/storefront/commit/b2ae286b8ab73fbf0a3aaef0759b63f6e129c5fd))
- **credit-card-form:** fix using toast, component api and template ([876779a](https://github.com/ecomplus/storefront/commit/876779ac8816417129d22c502a956be83c216a9c))
- **payment-methods:** fix using toast, component api and template ([d8406b2](https://github.com/ecomplus/storefront/commit/d8406b2935dab503ad1c838116c2a8815891b892))

### Features

- **order-info:** fix using toast, properly show shipping info ([465995b](https://github.com/ecomplus/storefront/commit/465995bcb3ef1e0e30796db5ea26242286d4e879))
- **toast:** add toast handler as vue plugin (prototype) ([cb4fea0](https://github.com/ecomplus/storefront/commit/cb4fea0bb7a1e402c6776ac546aa5f3a2d90f64a))

# [2.0.0-beta.2](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.1...@ecomplus/storefront-app@2.0.0-beta.2) (2020-04-23)

### Bug Fixes

- **credit-card:** fix updating installment list, add transition ([5125b5f](https://github.com/ecomplus/storefront/commit/5125b5ff27b5ce758dda136b722dd670c292802c))
- **deps:** update @ecomplus/i18n to v1.8.0 ([63140b8](https://github.com/ecomplus/storefront/commit/63140b837537442f92532ae98a8e14caa55edc55))
- **transitions:** fixing app and checkout views transitions ([ea9876c](https://github.com/ecomplus/storefront/commit/ea9876c852e39652369b99783a08ce0497b52c06))
- remove bootstrap vue at all, updates with storefront-components ([ca82c42](https://github.com/ecomplus/storefront/commit/ca82c420fb4542e3eebd4cb4cee74ed3009f0218))
- **credit-card:** fix handling loading installments state ([6a926d8](https://github.com/ecomplus/storefront/commit/6a926d8f6587c85df2312f0c98a2bc07dc8bd676))
- **deps:** add bootstrap-vue ([1fb803e](https://github.com/ecomplus/storefront/commit/1fb803ed39bcf093c36d52089a7fd940c7ad05f9))
- **deps:** update @ecomplus/i18n to 1.7.1 ([6a55c90](https://github.com/ecomplus/storefront/commit/6a55c90b370ae5e872ee96c0763febc94462484d))
- **vuex:** retry fetch customer (async first access) ([ce9e7b3](https://github.com/ecomplus/storefront/commit/ce9e7b34538589a8193f6254c65ef05881949428))

### Features

- **credit-card:** handling 'cc_installments' (if any) on payment client ([9d35716](https://github.com/ecomplus/storefront/commit/9d3571678a37bf527ca204506bd1c5c1146c6c01))

### Performance Improvements

- **components:** not using vue2-transitions anymore ([20dd3a9](https://github.com/ecomplus/storefront/commit/20dd3a93e6b1a24efa80c4b5ed87e8fbc401f551))

# [2.0.0-beta.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-beta.0...@ecomplus/storefront-app@2.0.0-beta.1) (2020-04-16)

**Note:** Version bump only for package @ecomplus/storefront-app

# [2.0.0-beta.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-next.2...@ecomplus/storefront-app@2.0.0-beta.0) (2020-04-16)

### Bug Fixes

- **components:** importing from @ecomplus/storefront-components ([60698dc](https://github.com/ecomplus/storefront/commit/60698dcb6e6c9779d713f4e1d1cd2a1c93ca7887))
- **deps:** update all non-major dependencies ([#196](https://github.com/ecomplus/storefront/issues/196)) ([9a9c188](https://github.com/ecomplus/storefront/commit/9a9c18889a091c40064441e3079a9ed6d8905589))
- **deps:** update deps, add @ecomplus/storefront-components ([8a3f46d](https://github.com/ecomplus/storefront/commit/8a3f46de33eb248e2a735b6741ea39c3abbb5dd3))

### Features

- **discount:** send items to apply discount module to support kits ([3c63104](https://github.com/ecomplus/storefront/commit/3c631042aabed58abc22c9db527b6441d6838f3a))

# [2.0.0-next.2](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-next.1...@ecomplus/storefront-app@2.0.0-next.2) (2020-04-03)

### Bug Fixes

- **deps:** update @ecomplus/passport-client to v1.0.7 ([b2c624d](https://github.com/ecomplus/storefront/commit/b2c624d1780a6920d8227aa1e0e693630bfd2a92))

# [2.0.0-next.1](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@2.0.0-next.0...@ecomplus/storefront-app@2.0.0-next.1) (2020-03-28)

### Bug Fixes

- **deps:** fix pkg deps, update root @ecomplus/i18n to v1.5.0 ([89699e2](https://github.com/ecomplus/storefront/commit/89699e22bcb8ea1fa36e64babcf10f41f4e9805b))
- **deps:** update @ecomplus/i18n to ^1.7.0 ([8c2b1c7](https://github.com/ecomplus/storefront/commit/8c2b1c70e1fb131b69e38eb9893a46fc6b2157d5))
- **deps:** update \@ecomplus/utils to v1.3.4 ([5b3b40a](https://github.com/ecomplus/storefront/commit/5b3b40a8f9d0d5154512a2401fff333239aabc1a))
- **deps:** update all non-major dependencies ([#171](https://github.com/ecomplus/storefront/issues/171)) ([d94b3fe](https://github.com/ecomplus/storefront/commit/d94b3fec0726e5d92becd3dd53f3833c77bb03cc))
- **deps:** update all non-major dependencies ([#178](https://github.com/ecomplus/storefront/issues/178)) ([2ba92fe](https://github.com/ecomplus/storefront/commit/2ba92fec7418d65aba7e2f9f57de8c24f32d8af0))
- **deps:** update to @ecomplus/client v2.0.4 ([48e2ff4](https://github.com/ecomplus/storefront/commit/48e2ff4e3688200cdf598c2eba592c99bb93ff19))
- **summary-item:** force image size (for chrome) ([472f652](https://github.com/ecomplus/storefront/commit/472f6529cc87780f1857e0052b4c03dafd69da64))

# [2.0.0-next.0](https://github.com/ecomplus/storefront/compare/@ecomplus/storefront-app@1.11.7...@ecomplus/storefront-app@2.0.0-next.0) (2020-02-27)

**Note:** Version bump only for package @ecomplus/storefront-app

# Legacy Change Log

## [0.15.0~1.12.0](/LEGACY_CHANGELOGS/storefront-app/v0.15.0~v1.12.0.md)
