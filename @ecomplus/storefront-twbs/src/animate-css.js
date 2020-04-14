var animateCss = function ($el, animationName) {
  return new Promise(function (resolve) {
    function handleAnimationEnd () {
      $el.classList.remove('animated', animationName)
      resolve()
      clearTimeout(fallbackTimer)
      $el.removeEventListener('animationend', handleAnimationEnd)
    }

    $el.classList.add('animated', animationName)
    var fallbackTimer = setTimeout(handleAnimationEnd, $el.classList.contains('slower') ? 800 : 500)
    $el.addEventListener('animationend', handleAnimationEnd)
  })
}

if (typeof window === 'object') {
  window.animateCss = animateCss
}

export default animateCss
