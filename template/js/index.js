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

// async load base components
import('./app')
