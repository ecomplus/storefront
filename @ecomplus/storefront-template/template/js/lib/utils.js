import { isSafari, isIOS, isIE, isMobile } from './_env'
import $ from 'jquery'

if (isSafari || isIOS || isIE) {
  $('img').each(function () {
    const src = $(this).attr('src')
    if (src && src.endsWith('.webp')) {
      $(this).attr('src', src.replace('.webp', '.png'))
    }
  })
}

$('.whatsapp-link').each(function () {
  const tel = $(this).data('tel').toString()
  if (tel) {
    let href = 'https://' + (isMobile ? 'api' : 'web') +
      '.whatsapp.com/send?phone=' +
      encodeURIComponent(tel.charAt(0) === '+' ? tel : `+55${tel}`)
    if ($(this).data('text')) {
      href += '&text=' + encodeURIComponent($(this).data('text'))
    }
    $(this).attr('href', href)
  }
})
