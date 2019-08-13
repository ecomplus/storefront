import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import $ from 'cash-dom'
import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import ecomUtils from '@ecomplus/utils'
import ecomClient from '@ecomplus/client'

window._ = { cloneDeep, merge }
window.$ = $
window.Vue = Vue
window.ecomUtils = ecomUtils
window.ecomClient = ecomClient
