/*!
 * @ecomplus/storefront-twbs
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import { name, version } from './../package.json'

import $ from '@ecomplus/storefront-twbs/src/$'
import animateCss from '@ecomplus/storefront-twbs/src/animate-css'
import '@ecomplus/storefront-twbs/src/bootstrap'
import '@ecomplus/storefront-twbs/src/fontawesome-icons'

const _self = name + '@' + version

export {
  _self,
  $,
  animateCss
}
