export default ($el, animationName) => new Promise(resolve => {
  function handleAnimationEnd () {
    $el.classList.remove('animated', animationName)
    $el.removeEventListener('animationend', handleAnimationEnd)
    resolve()
  }

  $el.classList.add('animated', animationName)
  $el.addEventListener('animationend', handleAnimationEnd)
})
