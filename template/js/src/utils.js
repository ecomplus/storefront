import { IS_MOBILE } from './lib/env'
import $ from './lib/$'
// import lozad from 'lozad'
// import Glide from '@glidejs/glide'

const $wpLinks = $('.whatsapp-link')
for (let i = 0; i < $wpLinks.length; i++) {
  const $link = $wpLinks[i]
  const tel = $link.dataset.tel
  if (tel) {
    let href = 'https://' + (IS_MOBILE ? 'api' : 'web') +
      '.whatsapp.com/send?phone=' + encodeURIComponent(tel)
    if ($link.dataset.text) {
      href += '&text=' + encodeURIComponent($link.dataset.text)
    }
    $link.setAttribute('href', href)
  }
}
