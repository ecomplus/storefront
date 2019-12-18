const previewCarousel = vDoc => {
  // fix product related
  const $caroulse = vDoc.querySelectorAll('.products-carousel ul')
  if ($caroulse.length) {
    for (let k = 0; k < $caroulse.length; k++) {
      const $ul = $caroulse[k]
      $ul.classList.add(...['glide__slides', 'products-carousel__list'])
      const $glide = vDoc.querySelectorAll('.products-carousel .glide')
      if ($glide.length) {
        $glide[k].classList.add(...['glide--ltr', 'glide--slider', 'glide--swipeable'])
      }
      const childrens = $ul.children
      for (let i = 0; i < childrens.length; i++) {
        const child = childrens[i]
        child.style.width = '270px'
        child.style.marginRight = '5px'
        const $elImg = child.querySelectorAll('img')
        if ($elImg.length) {
          $elImg[0].classList.add('show')
          $elImg[0].setAttribute('src', $elImg[0].dataset.src)
          $elImg[0].setAttribute('data-loaded', true)
        }

        const $cardInfo = child.querySelectorAll('.product-card__info')[0]
        if ($cardInfo) {
          $cardInfo.parentNode.removeChild($cardInfo)
        }
      }
    }
  }
}

export default previewCarousel
