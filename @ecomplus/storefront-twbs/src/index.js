/*!
 * @ecomplus/storefront-twbs
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import { name, version } from './../package.json'

import animateCss from './animate-css'
import Collapse from 'bootstrap/js/dist/collapse'
import './bootstrap'

const _self = name + '@' + version

export * from './_env'

export {
  _self,
  animateCss,
  Collapse
}
