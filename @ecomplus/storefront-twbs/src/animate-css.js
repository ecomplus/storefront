var animateCss = function ($el, animationName) {
  return new Promise(function (resolve) {
    function handleAnimationEnd () {
      $el.classList.remove('animated', animationName)
      $el.removeEventListener('animationend', handleAnimationEnd)
      resolve()
    }

    $el.classList.add('animated', animationName)
    $el.addEventListener('animationend', handleAnimationEnd)
  })
}

window.animateCss = animateCss

export default animateCss
