# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.9.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.8.3...@ecomplus/widget-tag-manager@1.9.0) (2023-01-20)

### Bug Fixes

- **widget-tag-manager:** also check button disabled right after stop propagation on product click ([a3cdb20](https://github.com/ecomplus/storefront/commit/a3cdb203d497e86f943e742510dbd8d3dd14f2e0))
- **widget-tag-manager:** skip (re)click if button disabled after click event sent ([fc5355d](https://github.com/ecomplus/storefront/commit/fc5355d6f100552cdbc7143d9051b6d35e2afe32))

### Features

- **renderer:** add partytown to run 3-party script in workers (perf optim) ([#853](https://github.com/ecomplus/storefront/issues/853)) ([1dc32b0](https://github.com/ecomplus/storefront/commit/1dc32b0a405ea3df8df8df8b7c1717490f565f61))
- **widget-tag-manager:** add "run on partytown" cms option ([dd787eb](https://github.com/ecomplus/storefront/commit/dd787eb8f882e7712e437e9e162c7848f6c61b0b))

## [1.8.3](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.8.2...@ecomplus/widget-tag-manager@1.8.3) (2023-01-20)

### Bug Fixes

- **widget-tag-manager:** prevent duplicated add to cart event on click ([f256e3e](https://github.com/ecomplus/storefront/commit/f256e3eb4afd0d127fb51d3e0c1f5ee4bed28e14))

## [1.8.2](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.8.1...@ecomplus/widget-tag-manager@1.8.2) (2023-01-11)

### Bug Fixes

- **widget-tag-manager:** click original event target after product click handler ([4d4ca2b](https://github.com/ecomplus/storefront/commit/4d4ca2bf5566bc66d52b34efbe0d26928df9b38f))

## [1.8.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.8.0...@ecomplus/widget-tag-manager@1.8.1) (2023-01-10)

### Bug Fixes

- **widget-tag-manager:** add click listener to `.product-item` el instead ([b3c9e17](https://github.com/ecomplus/storefront/commit/b3c9e1787a6f28b219e1af45e0810a3990b6bbab))

# [1.8.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.7.0...@ecomplus/widget-tag-manager@1.8.0) (2023-01-09)

### Features

- **widget-tag-manager:** add position to impressions, send click events ([45b4fd7](https://github.com/ecomplus/storefront/commit/45b4fd78fdbfca6b3efe48cd3b383ba7b24fed00))
- **widget-tag-manager:** add position to impressions, send click events ([6302729](https://github.com/ecomplus/storefront/commit/630272966def257063c591f3d45d376db1d207a4))

# [1.7.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.6.3...@ecomplus/widget-tag-manager@1.7.0) (2022-12-30)

### Features

- **widget-tag-manager:** sending more checkout (by step) events ([2e932e2](https://github.com/ecomplus/storefront/commit/2e932e28a5e04c93a3a51b6e1b8400b0e9301f4b))

## [1.6.3](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.6.2...@ecomplus/widget-tag-manager@1.6.3) (2022-12-29)

### Bug Fixes

- **widget-tag-manager:** clear ecommerce object and preset cart items on startup ([117ac57](https://github.com/ecomplus/storefront/commit/117ac57d8cc6c40525ab8e2166387c783b64a0a8))

## [1.6.2](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.6.1...@ecomplus/widget-tag-manager@1.6.2) (2022-05-11)

### Bug Fixes

- **widget-tag-manager:** save order id sent to prevent duplicated purchase ([dabbc5f](https://github.com/ecomplus/storefront/commit/dabbc5fd1e475db98e8a6e475a02fbecdf6ac181))

## [1.6.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.6.0...@ecomplus/widget-tag-manager@1.6.1) (2022-02-16)

### Bug Fixes

- **widget-tag-manager:** get amount for revenue from order router param ([#629](https://github.com/ecomplus/storefront/issues/629)) ([746cc6a](https://github.com/ecomplus/storefront/commit/746cc6a3b848f7339782c0b127230571e74338a6))

# [1.6.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.5.1...@ecomplus/widget-tag-manager@1.6.0) (2022-02-06)

### Features

- **template/cms:** using @ecomplus/storefront-cms in place of raw netlify cms ([#596](https://github.com/ecomplus/storefront/issues/596)) ([95c8d3a](https://github.com/ecomplus/storefront/commit/95c8d3ab3f73b0b1dff0a1f5f45b5abfb6dddafa)), closes [#issuecomment-1006566949](https://github.com/ecomplus/storefront/issues/issuecomment-1006566949) [#issuecomment-1003380562](https://github.com/ecomplus/storefront/issues/issuecomment-1003380562)

## [1.5.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.5.0...@ecomplus/widget-tag-manager@1.5.1) (2021-07-24)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

# [1.5.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.4.3...@ecomplus/widget-tag-manager@1.5.0) (2020-12-24)

### Features

- **ecc-impressions:** set default list name for categoires, brands and collections ([ef6d909](https://github.com/ecomplus/storefront/commit/ef6d909959ccf4781f6cf0b5455e7b738a9a2a14))

## [1.4.3](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.4.2...@ecomplus/widget-tag-manager@1.4.3) (2020-12-16)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## [1.4.2](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.4.1...@ecomplus/widget-tag-manager@1.4.2) (2020-12-15)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## [1.4.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.4.0...@ecomplus/widget-tag-manager@1.4.1) (2020-12-15)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

# [1.4.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.3.1...@ecomplus/widget-tag-manager@1.4.0) (2020-11-19)

### Features

- **gtm-ecc:** inform counpon if available ([6b20cde](https://github.com/ecomplus/storefront/commit/6b20cdec058896de80949d3a2e1b9994ae1f3079))

## [1.3.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.3.0...@ecomplus/widget-tag-manager@1.3.1) (2020-10-26)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

# [1.3.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.2.3...@ecomplus/widget-tag-manager@1.3.0) (2020-09-10)

### Features

- **eec-purchase:** add tax and shipping values to event data ([811129f](https://github.com/ecomplus/storefront/commit/811129f51ff5d3458d9bccf058fe3b88e654bab2))

## [1.2.3](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.2.2...@ecomplus/widget-tag-manager@1.2.3) (2020-06-30)

### Bug Fixes

- **purchase-events:** prevent duplicated spa (routes) events ([82d2760](https://github.com/ecomplus/storefront/commit/82d2760f9bbf7a91119efa9af456dc8aff455901))

## [1.2.2](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.2.1...@ecomplus/widget-tag-manager@1.2.2) (2020-05-26)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## [1.2.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.2.0...@ecomplus/widget-tag-manager@1.2.1) (2020-05-22)

### Bug Fixes

- **deps:** update @ecomplus/utils to v1.4.0 ([551e02e](https://github.com/ecomplus/storefront/commit/551e02e0e1e3bee6ce7002fd84d0c91f9cb8fb08))

# [1.2.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.1.9...@ecomplus/widget-tag-manager@1.2.0) (2020-04-16)

### Bug Fixes

- **deps:** update/fix pkg dependencies ([ee7edcb](https://github.com/ecomplus/storefront/commit/ee7edcbf60571060ea4c52461a36db470a2b5b6c))

### Features

- **cms:** setup widget-tag-manager config ([5960cc1](https://github.com/ecomplus/storefront/commit/5960cc192de6884b24c921b02c4bee55558d95ca))

## [1.1.9](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.1.8...@ecomplus/widget-tag-manager@1.1.9) (2020-04-03)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## [1.1.8](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.1.7...@ecomplus/widget-tag-manager@1.1.8) (2020-03-28)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## [1.1.7](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.1.6...@ecomplus/widget-tag-manager@1.1.7) (2020-02-27)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## [1.1.6](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-tag-manager@1.1.5...@ecomplus/widget-tag-manager@1.1.6) (2020-02-13)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## [1.1.5](https://github.com/ecomclub/storefront/compare/@ecomplus/widget-tag-manager@1.1.4...@ecomplus/widget-tag-manager@1.1.5) (2020-02-06)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## [1.1.4](https://github.com/ecomclub/storefront/compare/@ecomplus/widget-tag-manager@1.1.3...@ecomplus/widget-tag-manager@1.1.4) (2020-02-05)

**Note:** Version bump only for package @ecomplus/widget-tag-manager

## 1.1.3 (2020-02-04)

**Note:** Version bump only for package @ecomplus/widget-tag-manager
