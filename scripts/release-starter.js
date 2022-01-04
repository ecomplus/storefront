#!/usr/bin/env node

/* eslint-disable no-useless-escape */

const path = require('path')
const { execSync } = require('child_process')
const recursiveCopy = require('../@ecomplus/storefront-template/scripts/lib/recursive-copy.js')
const { version } = require('../@ecomplus/storefront-template/package.json')

const dirPkgTemplate = path.join(__dirname, '../@ecomplus/storefront-template')
const dirPkgStarter = path.join(__dirname, '../@ecomplus/storefront-starter')
const dirGitStarter = path.join(dirPkgStarter, 'starter')
const dirGitStarterViews = path.join(dirPkgStarter, 'template/pages')

recursiveCopy(path.join(dirPkgTemplate, 'template/pages'), dirGitStarterViews)
recursiveCopy(path.join(dirPkgTemplate, 'content'), path.join(dirGitStarter, 'content'), false, true)

const commitCmd = 'git add . && ' +
  `git commit -m \"Update with @ecomplus/storefront-template v${version}\" && ` +
  'git push'

execSync(
  `cd ${dirGitStarterViews} && ${commitCmd} && ` +
  `cd ${dirGitStarter} && ${commitCmd}`,
  { stdio: [0, 1, 2] }
)
