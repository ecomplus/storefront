import { isSafari, isIOS, isIE, isMobile, isScreenXs } from './_env'
import { $ } from '@ecomplus/storefront-twbs'

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

const $pictures = $('.banner [data-height]')
if ($pictures.length) {
  const fixBannersHeight = () => {
    $pictures.each(function () {
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

const $timers = $('.timer')
if ($timers.length) {
  const formatTime = timeNumber => timeNumber.toString().padStart(2, '0')
  $timers.each(function () {
    const { end, maxHours } = $(this)[0].dataset
    const diffSeconds = Math.min(
      (new Date(end).getTime() - Date.now()) / 1000,
      maxHours * 3600
    )

    if (diffSeconds > 0) {
      let hours = Math.floor(diffSeconds / 3600)
      const hoursAsSeconds = hours * 3600
      let minutes = Math.floor((diffSeconds - hoursAsSeconds) / 60)
      let seconds = parseInt(diffSeconds - hoursAsSeconds - minutes * 60, 10)
      const $timerCount = $(this).find('.timer__count')

      const updateTimerCount = () => {
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          seconds = minutes = 59
        } else {
          return clearInterval(stopwatch)
        }
        $timerCount.text(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`)
      }
      const stopwatch = setInterval(updateTimerCount, 1000)
      updateTimerCount()
    }
  })
}

$('#go-to-top').on('click', function() {
  window.scroll({
    top: 0,     
    behavior: 'smooth'
  })
})
  
