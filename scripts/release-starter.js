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

const parseCommitCmd = commitMsg => `git diff-index --quiet HEAD || (git commit -m \"${commitMsg}\" && git push)`

;[dirGitStarter, dirGitStarterViews].forEach(cwd => {
  execSync(`git add . && ${parseCommitCmd(`Update with @ecomplus/storefront-template v${version}`)}`, { cwd })
})

execSync(
  'git submodule update --remote --merge && ' +
  'git add @ecomplus/storefront-starter && ' +
  parseCommitCmd('chore(starter): update submodules'),
  { cwd: path.resolve(__dirname, '..') }
)
