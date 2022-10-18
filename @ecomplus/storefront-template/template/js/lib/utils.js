import {
  isSafari,
  isSafariNew,
  isIOS,
  isIE,
  isMobile,
  isScreenXs,
  Collapse
} from '@ecomplus/storefront-twbs'

if ((isSafari || isIOS || isIE) && !isSafariNew) {
  document.getElementsByTagName('img').forEach(function ($img) {
    const src = $img.getAttribute('src')
    if (src && src.endsWith('.webp')) {
      $img.setAttribute('src', src.replace('.webp', '.png'))
    }
  })
}

if (!isScreenXs) {
  const $collapseEls = document.querySelectorAll('.footer .collapse')
  if ($collapseEls && $collapseEls.length) {
    $collapseEls.forEach($collapse => new Collapse($collapse).show())
  }
}

document.querySelectorAll('.whatsapp-link').forEach(function ($wppLink) {
  const tel = $wppLink.dataset.tel.toString()
  if (tel) {
    let href = 'https://' + (isMobile ? 'api' : 'web') +
      '.whatsapp.com/send?phone=' +
      encodeURIComponent(tel.charAt(0) === '+' ? tel : `+55${tel}`)
    if ($wppLink.dataset.text) {
      href += '&text=' + encodeURIComponent($wppLink.dataset.text)
    }
    $wppLink.setAttribute('href', href)
  }
})

const $pictures = document.querySelectorAll('.banner [data-height]')
if ($pictures.length) {
  const fixBannersHeight = () => {
    $pictures.forEeach(function ($picture) {
      const height = parseInt($picture.dataset.height, 10)
      if (height > 0) {
        const width = parseInt($picture.dataset.width, 10)
        if (width > 0) {
          const $parent = $picture.parentElement
          $parent.style.minHeight = `${($parent.clientWidth * height / width)}px`
        }
      }
    })
  }
  fixBannersHeight()
  window.addEventListener('resize', fixBannersHeight)
}

const $timers = document.querySelectorAll('.timer')
if ($timers.length) {
  const formatTime = timeNumber => timeNumber.toString().padStart(2, '0')
  $timers.forEach(function ($timer) {
    const { end, maxHours } = $timer[0].dataset
    const diffSeconds = Math.min(
      (new Date(end).getTime() - Date.now()) / 1000,
      maxHours * 3600
    )

    if (diffSeconds > 0) {
      let hours = Math.floor(diffSeconds / 3600)
      const hoursAsSeconds = hours * 3600
      let minutes = Math.floor((diffSeconds - hoursAsSeconds) / 60)
      let seconds = parseInt(diffSeconds - hoursAsSeconds - minutes * 60, 10)
      const $timerCount = $timer.querySelector('.timer__count')

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
        $timerCount.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
      }
      const stopwatch = setInterval(updateTimerCount, 1000)
      updateTimerCount()
    }
  })
}

const $goToTop = document.getElementById('go-to-top')

if ($goToTop) {
  $goToTop.addEventListener('click', () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  })
}
