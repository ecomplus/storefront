# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.6.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.6.0...@ecomplus/widget-fb-pixel@1.6.1) (2023-05-11)

### Reverts

- **cms:** hide partytown option on all widgets for now ([a1fa355](https://github.com/ecomplus/storefront/commit/a1fa355bc29e5cc37b663907f0cfdbc76df472b8))

# [1.6.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.5.4...@ecomplus/widget-fb-pixel@1.6.0) (2023-02-09)

### Bug Fixes

- **widget-fb-pixel:** send purchase with `external_id` ([#869](https://github.com/ecomplus/storefront/issues/869)) ([28aed86](https://github.com/ecomplus/storefront/commit/28aed8638f2a67169efac33533336282f928f3eb))

### Features

- **widget-fb-pixel:** add partytown support with reverse proxy ([#862](https://github.com/ecomplus/storefront/issues/862)) ([6a86941](https://github.com/ecomplus/storefront/commit/6a869415402352aa02e7d9f4c5f56c7493f4efc2))

## [1.5.4](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.5.3...@ecomplus/widget-fb-pixel@1.5.4) (2023-01-25)

### Bug Fixes

- **widget-fb-pixel:** prevent duplicated pixel due to noscript fallback ([#858](https://github.com/ecomplus/storefront/issues/858)) ([3dfa78d](https://github.com/ecomplus/storefront/commit/3dfa78dfa052100dd8e6c6ed495686d4d8d454cf))

## [1.5.3](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.5.2...@ecomplus/widget-fb-pixel@1.5.3) (2022-10-25)

### Bug Fixes

- **widget-fb-pixel:** set order metafield even with pixel purchase disabled ([9bf994d](https://github.com/ecomplus/storefront/commit/9bf994d199b73be8f8ec7fa66a53d1552c2dfc6e))

## [1.5.2](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.5.1...@ecomplus/widget-fb-pixel@1.5.2) (2022-09-27)

### Bug Fixes

- **widget-fb-pixel:** only emit purchase with order data set ([#787](https://github.com/ecomplus/storefront/issues/787)) ([1eda601](https://github.com/ecomplus/storefront/commit/1eda6016c5cf559a4b551e77c4bc696fda1c79b6))

## [1.5.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.5.0...@ecomplus/widget-fb-pixel@1.5.1) (2022-05-11)

### Bug Fixes

- **widget-fb-pixel:** save order id sent to prevent duplicated purchase ([2b7a09f](https://github.com/ecomplus/storefront/commit/2b7a09fec064b1848bbc9fa833339990544f37ff))

# [1.5.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.4.1...@ecomplus/widget-fb-pixel@1.5.0) (2022-04-21)

### Bug Fixes

- **widget-fb-pixel:** fix handling json order param for amount ([89cfba1](https://github.com/ecomplus/storefront/commit/89cfba1608106f8140b1a127a020a755e2c3c2b1))
- **widget-fb-pixel:** send `eventID` to prevent duplicated entries with conversions api ([a67d313](https://github.com/ecomplus/storefront/commit/a67d31393abc4cca864cd46c2cbc3a2ba03dc6fb))

### Features

- **widget-fb-pixel:** add metafieldto order with info for fb conversions api app ([523c631](https://github.com/ecomplus/storefront/commit/523c6317474c2f4dd183e28436d637eb26f79263))

## [1.4.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.4.0...@ecomplus/widget-fb-pixel@1.4.1) (2022-02-16)

### Bug Fixes

- **widget-fb-pixel:** get amount for value from order router param ([#630](https://github.com/ecomplus/storefront/issues/630)) ([baf6ed2](https://github.com/ecomplus/storefront/commit/baf6ed2d1de61963dd3a5d645d040ccd5ef1738e))

# [1.4.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.3.1...@ecomplus/widget-fb-pixel@1.4.0) (2022-02-06)

### Features

- **template/cms:** using @ecomplus/storefront-cms in place of raw netlify cms ([#596](https://github.com/ecomplus/storefront/issues/596)) ([95c8d3a](https://github.com/ecomplus/storefront/commit/95c8d3ab3f73b0b1dff0a1f5f45b5abfb6dddafa)), closes [#issuecomment-1006566949](https://github.com/ecomplus/storefront/issues/issuecomment-1006566949) [#issuecomment-1003380562](https://github.com/ecomplus/storefront/issues/issuecomment-1003380562)

## [1.3.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.3.0...@ecomplus/widget-fb-pixel@1.3.1) (2021-07-24)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

# [1.3.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.2.4...@ecomplus/widget-fb-pixel@1.3.0) (2021-07-08)

### Features

- **widget-fb-pixel/cms:** handle new `disablePurchase` config option (for Conversions API) [[#495](https://github.com/ecomplus/storefront/issues/495)] ([0d484e7](https://github.com/ecomplus/storefront/commit/0d484e7f214261b1eeff830542fea744ee229fdf))

## [1.2.4](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.2.3...@ecomplus/widget-fb-pixel@1.2.4) (2020-12-16)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.2.3](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.2.2...@ecomplus/widget-fb-pixel@1.2.3) (2020-12-15)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.2.2](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.2.1...@ecomplus/widget-fb-pixel@1.2.2) (2020-12-15)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.2.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.2.0...@ecomplus/widget-fb-pixel@1.2.1) (2020-10-26)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

# [1.2.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.1.3...@ecomplus/widget-fb-pixel@1.2.0) (2020-08-07)

### Features

- **fb-pixel:** track default event 'InitiateCheckout' ([f0d4540](https://github.com/ecomplus/storefront/commit/f0d45408c8d3e1530a80eed1f9fb60e34fdf7ad6))

## [1.1.3](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.1.2...@ecomplus/widget-fb-pixel@1.1.3) (2020-06-30)

### Bug Fixes

- **purchase-events:** prevent duplicated spa (routes) events ([d3f366f](https://github.com/ecomplus/storefront/commit/d3f366f431e18b8b75468a0ded6f8b102ab7ceb6))

## [1.1.2](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.1.1...@ecomplus/widget-fb-pixel@1.1.2) (2020-05-26)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.1.1](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.1.0...@ecomplus/widget-fb-pixel@1.1.1) (2020-05-22)

### Bug Fixes

- **deps:** update @ecomplus/utils to v1.4.0 ([551e02e](https://github.com/ecomplus/storefront/commit/551e02e0e1e3bee6ce7002fd84d0c91f9cb8fb08))

# [1.1.0](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.0.7...@ecomplus/widget-fb-pixel@1.1.0) (2020-04-16)

### Bug Fixes

- **deps:** update/fix pkg dependencies ([5ba51e1](https://github.com/ecomplus/storefront/commit/5ba51e1b89b8647d510a560192a3bfee8f103cc1))

### Features

- **cms:** setup widget-fb-pixel config ([408f5f7](https://github.com/ecomplus/storefront/commit/408f5f77f6431d124f0e5f960b521e36e0130516))

## [1.0.7](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.0.6...@ecomplus/widget-fb-pixel@1.0.7) (2020-04-03)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.0.6](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.0.5...@ecomplus/widget-fb-pixel@1.0.6) (2020-03-28)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.0.5](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.0.4...@ecomplus/widget-fb-pixel@1.0.5) (2020-02-27)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.0.4](https://github.com/ecomplus/storefront/compare/@ecomplus/widget-fb-pixel@1.0.3...@ecomplus/widget-fb-pixel@1.0.4) (2020-02-13)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.0.3](https://github.com/ecomclub/storefront/compare/@ecomplus/widget-fb-pixel@1.0.2...@ecomplus/widget-fb-pixel@1.0.3) (2020-02-06)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## [1.0.2](https://github.com/ecomclub/storefront/compare/@ecomplus/widget-fb-pixel@1.0.1...@ecomplus/widget-fb-pixel@1.0.2) (2020-02-05)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel

## 1.0.1 (2020-02-04)

**Note:** Version bump only for package @ecomplus/widget-fb-pixel
