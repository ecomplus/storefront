import { i19close, i19error, i19errorMsg } from '@ecomplus/i18n'
import { i18n } from '@ecomplus/utils'
import { Toast } from '@ecomplus/storefront-twbs'
import Vue from 'vue'

const $toastDock = document.createElement('div')
$toastDock.setAttribute('style', 'position: absolute; top: 0; right: 0')

const $toastAside = document.createAttribute('aside')
$toastAside.setAttribute('style', 'position: fixed; top: 15px; right: 15px; width: 100%; max-width: 300px; z-index: -1')

$toastAside.innerHTML = '<div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px"></div>'
$toastAside.appendChild($toastDock)
document.body.appendChild($toastAside)

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

  const $toast = document.createElement('div')
  $toast.setAttribute('class', 'toast')
  $toast.setAttribute('role', 'alert')
  $toast.setAttribute('aria-live', 'assertive')
  $toast.setAttribute('aria-atomic', 'true')
  $toast.setAttribute('data-delay', `${(delay || 7000)}`)

  $toast.innerHTML = `
  <div class="toast-header" style="color: var(--${(variant || 'warning')})">
    <i class="i-${icon} mr-2"></i>
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

  $toastDock.appendChild($toast)
  $toast.addEventListener('show.bs.toast', () => {
    $toastAside.style.zIndex = '3000'
  })
  $toast.addEventListener('hidden.bs.toast', () => {
    if ($toastDock.children().length <= 1) {
      $toastAside.style.zIndex = '-1'
    }
  })
  new Toast($toast).show()
}
