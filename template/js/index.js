import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import EventEmitter from 'eventemitter3'
import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import ecomUtils from '@ecomplus/utils'
import ecomClient from '@ecomplus/client'

window._ = { cloneDeep, merge }
window.EventEmitter = EventEmitter
window.Vue = Vue
window.ecomUtils = ecomUtils
window.ecomClient = ecomClient

import('./src/icons')
import('./src/navbar')
