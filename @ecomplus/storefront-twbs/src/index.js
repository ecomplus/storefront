import { version } from './../package.json'

import './fontawesome-icons'

import {
  Collapse,
  Dropdown,
  Modal,
  Tooltip
} from 'bootstrap.native'

import Vue from 'vue'

import PortalVue from 'portal-vue'

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
  window.Modal = Modal
  window.Tooltip = Tooltip
  window.__storefront_twbs = {}
}

export { version }
