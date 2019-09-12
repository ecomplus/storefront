export default options => {
  const $productBlock = document.getElementById('product')
  const context = window._context.body
  const moConfig = {
    childList: false,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  }

  if ($productBlock) {
    const ratingLink = () => {
      const $link = document.createElement('a')
      $link.className = 'trustvox-fluid-jump trustvox-widget-rating product-widget-rating'
      $link.id = 'trustvox-widget-rating'
      $link.href = '#_trustvox_widget'
      $link.title = 'Veja as opiniões de quem comprou esse produto!'

      const $shelfContainer = document.createElement('div')
      $shelfContainer.className = 'trustvox-shelf-container'
      $shelfContainer.setAttribute('data-trustvox-product-code', 'produto_teste_1234')
      $link.appendChild($shelfContainer)

      const $ratingClickHere = document.createElement('span')
      $ratingClickHere.className = 'rating-click-here'
      $link.appendChild($ratingClickHere)

      return $link
    }

    const $ratingProduct = ratingLink()
    $ratingProduct.style.display = 'none'
    document.body.appendChild($ratingProduct)
    let widgetIsRended = false

    let mo = null
    const $shelfProduct = $productBlock.parentElement
    for (let i = 0; i < $shelfProduct.childNodes.length; i++) {
      if ($shelfProduct.childNodes[i].id === 'product') {
        const callback = () => {
          for (let j = 0; j < $shelfProduct.childNodes[i].childNodes.length; j++) {
            const $productBlockNode = $shelfProduct.childNodes[i].childNodes[j]
            if ($productBlockNode.id === 'product-block') {
              const { toRender } = $productBlockNode.dataset
              if (!toRender) {
                const $productName = document.getElementsByClassName('ec-product__name')[0]
                if (!widgetIsRended && typeof $productName !== 'undefined') {
                  $productName.parentNode.insertBefore($ratingProduct, $productName.nextSibling)
                  $ratingProduct.style.display = 'inherit'
                  widgetIsRended = true
                }
              }
            }
          }
        }
        mo = new MutationObserver(callback)
        mo.observe($shelfProduct.childNodes[i], moConfig)
      }
    }

    let pictures = []

    context.pictures.forEach(picture => {
      if (picture.normal) {
        pictures.push(picture.normal.url)
      }
    })

    window._trustvox = window._trustvox || []
    window._trustvox.push(['_storeId', options.storeId])
    window._trustvox.push(['_productId', context.sku])
    window._trustvox.push(['_productName', context.name])
    window._trustvox.push(['_productPhotos', pictures])

    //
    const $trustvoxWidget = document.createElement('div')
    $trustvoxWidget.id = '_trustvox_widget'
    document.getElementById('product').appendChild($trustvoxWidget)

    // 
    const interval = setInterval(() => {
      if (widgetIsRended) {
        mo.disconnect()
        clearInterval(interval)
      }
    }, 1000)
  }
}
