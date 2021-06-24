#!/usr/bin/env node

'use strict'

process.env.NODE_ENV = 'development'
process.env.STOREFRONT_FRAMEWORK = 'serve'

require('./../server')
