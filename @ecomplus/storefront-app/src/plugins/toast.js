import { i19close, i19error, i19errorMsg } from '@ecomplus/i18n'
import { i18n } from '@ecomplus/utils'
import { $ } from '@ecomplus/storefront-twbs'
import Vue from 'vue'

const $toastDock = $('<div>', {
  style: 'position: absolute; top: 0; right: 0'
})

$('<aside>', {
  style: 'position: fixed; top: 15px; right: 15px; width: 100%; max-width: 300px; z-index: 3000'
})
  .append(
    $('<div>', {
      'aria-live': 'polite',
      'aria-atomic': 'true',
      style: 'position: relative; min-height: 200px'
    })
      .append($toastDock)
  )
  .appendTo('body')

Vue.prototype.$toast = ({ title, body, variant, delay } = {}) => {
  let icon
  switch (variant) {
    case 'success':
      icon = 'check-circle'
      break
    case 'info':
      icon = 'info-circle'
      break
    default:
      icon = 'exclamation-triangle'
  }

  const $toast = $('<div>', {
    class: 'toast',
    role: 'alert',
    'aria-live': 'assertive',
    'aria-atomic': 'true',
    'data-delay': delay || 7000
  })

  $toast[0].innerHTML = `
  <div class="toast-header" style="color: var(--${(variant || 'warning')})">
    <i class="fas fa-${icon} mr-2"></i>
    <strong class="mr-auto">
      ${(title || i18n(i19error))}
    </strong>
    <button
      type="button"
      class="ml-2 mb-1 close"
      data-dismiss="toast"
      aria-label="${i18n(i19close)}"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    ${(body || i18n(i19errorMsg))}
  </div>`

  $toast.appendTo($toastDock)
  $toast.toast('show')
}
