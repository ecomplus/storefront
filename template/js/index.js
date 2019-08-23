import { version } from './../../package.json'

import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import EventEmitter from 'eventemitter3'
import Vue from 'vue'
import lozad from 'lozad'
import Glide from '@glidejs/glide'
import '@ecomplus/storefront-twbs'
import ecomUtils from '@ecomplus/utils'
import ecomClient from '@ecomplus/client'
import $ from './src/lib/$'
import $overlay from './src/lib/$overlay'

// expose some libs and utils on global scope
window._ = { cloneDeep, merge }
window.EventEmitter = EventEmitter
window.Vue = Vue
window.lozad = lozad
window.Glide = Glide
window.ecomUtils = ecomUtils
window.ecomClient = ecomClient
window.$ = $
window.$overlay = $overlay

// setting global E-Com Plus config
const { _settings } = window
const { _config } = ecomUtils
;[
  'store_id',
  'lang',
  'currency',
  'currency_symbol',
  'country_code'
].forEach(prop => {
  _config.set(prop, _settings[prop])
})

// async load components
import('./app')

export { version }
