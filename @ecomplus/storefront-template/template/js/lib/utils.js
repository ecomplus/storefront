import { isSafari, isIOS, isIE, isMobile, isScreenXs } from './_env'
import $ from 'jquery'

if (isSafari || isIOS || isIE) {
  $('img').each(function () {
    const src = $(this).attr('src')
    if (src && src.endsWith('.webp')) {
      $(this).attr('src', src.replace('.webp', '.png'))
    }
  })
}

if (!isScreenXs) {
  $('.footer .collapse').collapse('show')
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

const $banners = $('.banner img[data-height]')
if ($banners.length) {
  const fixBannersHeight = () => {
    $banners.each(function () {
      const height = parseInt($(this).data('height'), 10)
      if (height > 0) {
        const width = parseInt($(this).data('width'), 10)
        if (width > 0) {
          const $parent = $(this).parent()
          $parent.css('min-height', $parent.innerWidth() * height / width)
        }
      }
    })
  }
  fixBannersHeight()
  $(window).resize(fixBannersHeight)
}
