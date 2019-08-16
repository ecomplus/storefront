// declare some BootstrapVue components on global Vue instance
// https://bootstrap-vue.js.org/docs/

import 'bootstrap.native'

import Vue from 'vue'

import {
  AlertPlugin,
  CollapsePlugin,
  DropdownPlugin,
  PaginationPlugin,
  ModalPlugin,
  TabsPlugin,
  ToastPlugin,
  VBPopoverPlugin,
  VBTooltipPlugin
} from 'bootstrap-vue'

Vue.use(AlertPlugin)
Vue.use(CollapsePlugin)
Vue.use(DropdownPlugin)
Vue.use(PaginationPlugin)
Vue.use(ModalPlugin)
Vue.use(TabsPlugin)
Vue.use(ToastPlugin)
Vue.use(VBPopoverPlugin)
Vue.use(VBTooltipPlugin)

export {
  Vue
}
