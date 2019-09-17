// declare some BootstrapVue components on global Vue instance
// https://bootstrap-vue.js.org/docs/

import { version } from './../package.json'

import PortalVue from 'portal-vue'
import Vue from 'vue'

import {
  Collapse,
  Dropdown,
  Tooltip
} from 'bootstrap.native'

import {
  AlertPlugin,
  CollapsePlugin,
  DropdownPlugin,
  PaginationPlugin,
  PopoverPlugin,
  ModalPlugin,
  TabsPlugin,
  ToastPlugin,
  VBPopoverPlugin,
  VBTooltipPlugin
} from 'bootstrap-vue'

Vue.use(PortalVue)

Vue.use(AlertPlugin)
Vue.use(CollapsePlugin)
Vue.use(DropdownPlugin)
Vue.use(PaginationPlugin)
Vue.use(PopoverPlugin)
Vue.use(ModalPlugin)
Vue.use(TabsPlugin)
Vue.use(ToastPlugin)
Vue.use(VBPopoverPlugin)
Vue.use(VBTooltipPlugin)

if (typeof window === 'object') {
  window.Vue = Vue
  window.Collapse = Collapse
  window.Dropdown = Dropdown
  window.Tooltip = Tooltip
  window.__storefront_twbs = {}
}

export { version }
